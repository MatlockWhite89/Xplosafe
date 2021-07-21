import {Component, OnDestroy, OnInit} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {concat, merge, Subject, Subscription} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BadgeService } from '../../../services/badge.service';
import { GridService } from '../../../services/agGrid.service';
import DateTimeFormat = Intl.DateTimeFormat;
import { Badge } from '../../../database/Models/database.model.badge';
import { ModalWindowService } from '../../../services/modal-window.service';
import {UserService} from '../../../services/user.service';
import {concatAll, debounceTime, distinctUntilChanged, mergeAll, switchMap} from 'rxjs/operators';
import {SelectedCompound} from '../badge-add/token-values/token-values.component';
import {ReportService} from '../../../services/report.service';

@Component({
  selector: 'app-badge-turn-in',
  templateUrl: './badge-turn-in.component.html',
  styleUrls: ['./badge-turn-in.component.css'],
})
export class BadgeTurnInComponent implements OnInit, OnDestroy {
  badgeInformation = new FormGroup({
    badgeSerialNumber: new FormControl(),
    activatedTime: new FormControl(''),
    turnedInTime: new FormControl(''),
    duration: new FormControl(''),
    tempFahrenheit: new FormControl(''),
    tempCelsius: new FormControl(''),
    vaporsExposed: new FormControl(''),
    humidity: new FormControl(''),
    notes: new FormControl(''),
  });

  // Form Values
  turnedInTime: DateTimeFormat;
  activatedTime: DateTimeFormat;
  badgeSerialNumber: string;
  badge: Badge;

  badges: any;
  selected: SelectedCompound[];
  error: string = null;
  subscriptions: Subscription;
  constantSubscriptions: Subscription;
  userRole: number;
  temperatureFahrenheit: string;
  temperatureCelsius: string;
  vaporsExposed: string;
  relativeHumidity: string;
  notes: string;

  searchLike: string;
  results: any;
  private analyteSearch = new Subject();

  constructor(
    private http: HttpClient,
    private badgeService: BadgeService,
    private gridService: GridService,
    private modalService: ModalWindowService,
    private userService: UserService,
    private reportService: ReportService
  ) {
    this.userRole = this.userService.getActiveUser().role;
    if (this.userRole === 1){
      this.gridService.setGridType(9);
    }
    else {
      this.gridService.setGridType(11);
    }

    this.selected = [];
    this.subscriptions = new Subscription();
    this.constantSubscriptions = new Subscription();
  }

  // Show the Selected Badge based on grid selection.
  showSelectedBadgeData(): void {
    const data = this.gridService.getSelectedRow() as Badge;
    if (!data) { return; }
    if (data.turned_in_time) { this.badgeInformation.controls.turnedInTime.setValue(data.turned_in_time.toString().replace(' ', 'T')); }
    if (data.activated_time) { this.badgeInformation.controls.activatedTime.setValue(data.activated_time.toString().replace(' ', 'T')); }
    if (data.temperature_fahrenheit) { this.badgeInformation.controls.tempFahrenheit.setValue(data.temperature_fahrenheit); }
    if (data.temperature_celsius) { this.badgeInformation.controls.tempCelsius.setValue(data.temperature_celsius); }
    if (data.notes) { this.badgeInformation.controls.notes.setValue(data.notes); }
    if (data.relative_humidity) { this.badgeInformation.controls.humidity.setValue(data.relative_humidity); }
    if (data.badge_serial_number) {
      this.badgeInformation.controls.badgeSerialNumber.setValue(data.badge_serial_number);
      this.getSpecifiedBadge();
    }
  }

  // Search Observer for the Analyte Search Method.
  private setupSearchResultObserver(): void {
    this.analyteSearch
      .pipe(
        debounceTime(250),
        distinctUntilChanged(),
        switchMap((analyteLike: string) => {
          this.results = [];
          return merge(
            this.reportService.getAnalytesByName(analyteLike),
            this.reportService.getAnalytesByCasNumber(analyteLike)
          );
        }),
        concatAll()
      )
      .subscribe({
        next: (value: { a_name: string; a_cas: string }) => {
          this.results.push(value);
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {},
      });
  }

  // Add the Analyte Selection to the List of Analytes
  addToSelected(option: { a_name: string; a_cas: string }): void {
    this.searchLike = '';
    this.analyteSearch.next(this.searchLike);
    const temp = new SelectedCompound();
    temp.analyteName = option.a_name;
    temp.casNumber = option.a_cas;
    this.selected.push(temp);
  }

  // Remove the given Analyte from the Selected Analytes array.
  removeSelectedAnalyte(casNumber: string): void {
    const selectedValue = this.selected.find(x => x.casNumber === casNumber);
    const index = this.selected.indexOf(selectedValue);
    this.selected.splice(index, 1);
  }

  // Find the Given Analyte
  search(): void {
    this.analyteSearch.next(this.searchLike);
  }

  // Iterate over the Tokens and update those values in the DB.
  updateTokenValues(badgeSerialNumber: string): void {
    const tokenType = 'OSU-6';
    const arr = [];
    for (let token = 1; token <= this.badge.number_of_tokens; token++) {
      for (const target of this.selected) {
        arr.push(this.badgeService.addTargetAnalyte(
          badgeSerialNumber,
          token.toString(),
          target.casNumber,
          target.analyteName,
          tokenType));
      }
    }
    const concatenatedObs = concat(arr).pipe(mergeAll());
    concatenatedObs.subscribe(
      (value) => {},
      (err) => { console.log(err); },
      () => {
        this.updateDropDown();
      });
  }

  // Sets the fahrenheit temperature values based on user input of tempCelsius.
  temperatureCelsiusCalculations(): void {
    this.temperatureCelsius = this.badgeInformation.controls.tempCelsius.value;
    this.temperatureFahrenheit = this.badgeInformation.controls.tempFahrenheit.value;
    if (this.temperatureCelsius && this.temperatureCelsius !== '') {
      let newTemp = ((Number(this.temperatureCelsius) * 9 / 5) + 32);
      newTemp = Math.round(newTemp * 10) / 10;
      if (this.temperatureFahrenheit !== newTemp.toString()){
        this.badgeInformation.controls.tempFahrenheit.setValue(newTemp.toString());
      }
    }
    else{
      this.temperatureFahrenheit = '';
      this.badgeInformation.controls.tempFahrenheit.setValue('');
    }
  }

  // Sets the celsius temperature values based on user input of tempFahrenheit.
  temperatureFahrenheitCalculations(): void {
    this.temperatureCelsius = this.badgeInformation.controls.tempCelsius.value;
    this.temperatureFahrenheit = this.badgeInformation.controls.tempFahrenheit.value;
    if (this.temperatureFahrenheit && this.temperatureFahrenheit !== '') {
      let newTemp = (Number(this.temperatureFahrenheit) - 32) * 5 / 9;
      newTemp = Math.round(newTemp * 10) / 10;
      if (this.temperatureCelsius !== newTemp.toString()){
        this.badgeInformation.controls.tempCelsius.setValue(newTemp.toString());
      }
    }
    else{
      this.temperatureCelsius = '';
      this.badgeInformation.controls.tempCelsius.setValue('');
    }
  }

  // Get the Badge value.
  getSpecifiedBadge(): void {
    const bsn = this.badgeInformation.controls.badgeSerialNumber.value;
    if (bsn && bsn !== '' && (!this.badge || this.badge.badge_serial_number !== bsn)){
      this.badgeService.getBadge(bsn).subscribe(
        (value) => { this.badge = value[0]; },
        (err) => { console.log(err); },
        () => {});
    }
  }

  // Ensure the input fields are appropriate.
  checkBadgeData(): void {
    this.turnedInTime = this.badgeInformation.controls.turnedInTime.value;
    this.activatedTime = this.badgeInformation.controls.activatedTime.value;
    this.badgeSerialNumber = this.badgeInformation.controls.badgeSerialNumber.value;
    this.notes = this.badgeInformation.controls.notes.value;
    this.temperatureCelsius = this.badgeInformation.controls.tempCelsius.value;
    this.temperatureFahrenheit = this.badgeInformation.controls.tempFahrenheit.value;
    this.relativeHumidity = this.badgeInformation.controls.humidity.value;

    if (this.badgeSerialNumber === '' || !this.turnedInTime || !this.activatedTime) {
      this.modalService.setModalContext(
        'Improper Format for the Badge Data, Please ensure fields are properly filled out'
      );
      return;
    }

    this.updateBadge();
  }

  // Performs the auto Calculations for the duration.
  determineTime(): void {
    const aT = new Date(this.badgeInformation.controls.activatedTime.value).valueOf();
    const tT = new Date(this.badgeInformation.controls.turnedInTime.value).valueOf();

    if (aT && tT){
      if (aT > tT){
        this.modalService.setModalContext('Activated Time cannot occur after the Turned in Time');
        this.badgeInformation.controls.turnedInTime.setValue(null);
      }
      else {
        const newDuration = (tT - aT) / 60000;
        this.badgeInformation.controls.duration.setValue(Math.round(newDuration));
      }
    }
  }

  // Performs the auto Calculations for the times based on the current selected time and duration.
  durationChange(): void {
    const aT = new Date(this.badgeInformation.controls.activatedTime.value).valueOf();
    const tT = new Date(this.badgeInformation.controls.turnedInTime.value).valueOf();
    const d = this.badgeInformation.controls.duration.value;

    if (d < 0){
      this.modalService.setModalContext('Duration cannot be negative');
      this.badgeInformation.controls.duration.setValue(null);
    }
    else if (!tT && !aT){
      return;
    }
    else if (!tT){
      // calculate Turned in Time.
      const newDuration = d * 60000;
      const time = aT + newDuration;
      const nonFormattedDate = new Date(time);
      const formattedDate = this.createDateTime(nonFormattedDate);
      this.badgeInformation.controls.turnedInTime.setValue(formattedDate);
    }
    else if (!aT){
      // calculate activatedTime.
      const newDuration = d * 60000;
      const time = tT - newDuration;
      const nonFormattedDate = new Date(time);
      const formattedDate = this.createDateTime(nonFormattedDate);
      this.badgeInformation.controls.activatedTime.setValue(formattedDate);
    }
    else {
      // both tT and aT are present set time based on duration + activatedTime.
      const newDuration = d * 60000;
      const time = aT + newDuration;
      const nonFormattedDate = new Date(time);
      const formattedDate = this.createDateTime(nonFormattedDate);
      this.badgeInformation.controls.turnedInTime.setValue(formattedDate);
    }
  }

  // Create the DateTime.
  createDateTime(date: Date): string
  {
    // yyyy-MM-ddThh:mm" followed by optional ":ss" or ":ss.SSS
    const year = date.getFullYear();
    let m = date.getMonth();
    const d = date.getDate();
    const hrs = date.getHours();
    const min = date.getMinutes();
    m += 1;
    let month = m.toString();
    let day = d.toString();
    let hour = hrs.toString();
    let minutes = min.toString();
    if (month.length < 2) { month = '0' + month; }
    if (day.length < 2) { day = '0' + day; }
    if (hour.length < 2) { hour = '0' + hour; }
    if (minutes.length < 2) { minutes = '0' + minutes; }
    const newDate = year + '-' + month + '-' + day + 'T' + hour + ':' + minutes;
    return newDate;
  }

  // Update badge
  updateBadge(): void {
    console.log('Ready To Issue Badge Data to Database!');
    const turnedInT = this.formatDate(this.turnedInTime);
    const activatedT = this.formatDate(this.activatedTime);
    this.badgeService.turnInBadgeData(
      this.badgeSerialNumber,
      activatedT,
      turnedInT,
      this.temperatureCelsius,
      this.temperatureFahrenheit,
      this.vaporsExposed,
      this.relativeHumidity,
      this.notes).subscribe(
        (val) => {},
        (err) => {
          console.log(err);
          this.badgeService.handleError(err);
          },
        () => {
          if (this.selected.length > 0){
            this.updateTokenValues(this.badge.badge_serial_number);
          }
          else{
            this.updateDropDown();
          }
        }
      );
  }

  // Update the dropDown then resetValues.
  updateDropDown(): void {
    if (this.userRole === 1){
      this.badgeService.getWearerBadgeList(2).subscribe((value) => {
        this.badges = value;
        this.badgeInformation.controls.badgeSerialNumber.setValue(this.badges);
        this.resetValues();
      });
    }
    else {
      this.badgeService.getSubordinantBadgeList(2).subscribe(
        (value1) => {
          this.badges = value1;
          this.badgeInformation.controls.badgeSerialNumber.setValue(this.badges);
          this.resetValues();
        },
        (err) => { this.badgeService.handleError(err); },
        () => {});
    }
  }
  // Reset all input values.
  resetValues(): void {
    this.modalService.setModalContext(
      'Badge ' + this.badgeSerialNumber + ' has been updated in the database'
    );
    this.badgeInformation.reset();
    if (this.userRole === 1){
      this.gridService.setGridType(9);
    }
    else {
      this.gridService.setGridType(11);
    }

    this.badge = null;
    this.selected = [];
    this.resetSubscriptions();
  }

  // Formats the date string for DB.
  formatDate(time: DateTimeFormat): string {
    if (time === null) {
      return null;
    }

    const newTime = time + '';
    const parsedTime = newTime.slice(0, 16).replace('T', ' ') + ':00';
    console.log('The New Formatted Time is: ' + parsedTime);
    return parsedTime;
  }

  // Subscriptions used by component.
  ngOnInit(): void {
    this.setupSearchResultObserver();
    this.constantSubscriptions.add(this.gridService.rowSelected.subscribe((value) => {
      if (value) {
        this.showSelectedBadgeData();
      } else {
        this.badgeInformation.reset();
      }
    }));

    if (this.userRole === 1){
      this.subscriptions.add(this.badgeService.getWearerBadgeList(2).subscribe((value) => {
        this.badges = value;
        this.badgeInformation.controls.badgeSerialNumber.setValue(this.badges);
      }));
    }
    else {
      this.subscriptions.add(this.badgeService.getSubordinantBadgeList(2).subscribe((value) => {
        this.badges = value;
        this.badgeInformation.controls.badgeSerialNumber.setValue(this.badges);
      }));
    }
  }

  // Reset all local non constant subscriptions.
  resetSubscriptions(): void{
    this.subscriptions.unsubscribe();
  }

  // Reset all subscriptions when component is destroyed.
  ngOnDestroy(): void {
    this.resetSubscriptions();
    this.constantSubscriptions.unsubscribe();
  }
}
