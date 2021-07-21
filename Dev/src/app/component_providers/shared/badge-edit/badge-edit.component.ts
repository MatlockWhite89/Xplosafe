import {Component, OnInit, OnDestroy} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BadgeService } from '../../../services/badge.service';
import { GridService } from '../../../services/agGrid.service';
import DateTimeFormat = Intl.DateTimeFormat;
import { Badge } from '../../../database/Models/database.model.badge';
import {ModalWindowService} from '../../../services/modal-window.service';

@Component({
  selector: 'app-badge-edit',
  templateUrl: './badge-edit.component.html',
  styleUrls: ['./badge-edit.component.css'],
})
export class BadgeEditComponent implements OnInit, OnDestroy {
  badgeInformation = new FormGroup({
    badgeSerialNumber: new FormControl(),
    assignedUser: new FormControl(''),
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
  activatedTime: DateTimeFormat;
  turnedInTime: DateTimeFormat;
  selectedUser: string;
  badgeSerialNumber: string;
  dataId: number;
  badgeStatus: number;
  badgeId: number;
  temperatureFahrenheit: string;
  temperatureCelsius: string;
  vaporsExposed: string;
  relativeHumidity: string;
  notes: string;

  users: any = null;
  subscriptions: Subscription;
  constantSubscriptions: Subscription;

  constructor(
    private http: HttpClient,
    private badgeService: BadgeService,
    private gridService: GridService,
    private modalService: ModalWindowService
  ) {
    this.badgeService.getUserList();
    this.subscriptions = new Subscription();
    this.constantSubscriptions = new Subscription();
    this.badgeStatus = null;

    // Set the grid to display badges
    this.gridService.setGridType(8);
  }

  // Set the fields based on AgGrid selection.
  showSelectedBadgeData(): void {
    const data = this.gridService.getSelectedRow() as Badge;
    if (!data) { return; }
    if (data.activated_time) { this.badgeInformation.controls.activatedTime.setValue(data.activated_time.toString().replace(' ', 'T')); }
    if (data.turned_in_time) { this.badgeInformation.controls.turnedInTime.setValue(data.turned_in_time.toString().replace(' ', 'T')); }
    if (data.activated_time && data.turned_in_time){
      this.determineTime();
    }
    if (data.assigned_user) { this.badgeInformation.controls.assignedUser.setValue(data.assigned_user); }
    if (data.badge_status) { this.badgeStatus = data.badge_status; }
    if (data.temperature_fahrenheit) { this.badgeInformation.controls.tempFahrenheit.setValue(data.temperature_fahrenheit); }
    if (data.temperature_celsius) { this.badgeInformation.controls.tempCelsius.setValue(data.temperature_celsius); }
    if (data.notes) { this.badgeInformation.controls.notes.setValue(data.notes); }
    if (data.vapors_exposed) { this.badgeInformation.controls.vaporsExposed.setValue(data.vapors_exposed); }
    if (data.relative_humidity) { this.badgeInformation.controls.humidity.setValue(data.relative_humidity); }
    if (data.id) { this.badgeId = data.id; }
    if (data.badge_serial_number) {
      this.badgeInformation.controls.badgeSerialNumber.setValue( data.badge_serial_number);
    }
  }

  // Checks the Badge data to make sure it has been filled out properly before adding to DB.
  checkBadgeData(): void {
    this.activatedTime = this.badgeInformation.controls.activatedTime.value;
    this.turnedInTime = this.badgeInformation.controls.turnedInTime.value;
    this.selectedUser = this.badgeInformation.controls.assignedUser.value;
    this.badgeSerialNumber = this.badgeInformation.controls.badgeSerialNumber.value;
    this.temperatureFahrenheit = this.badgeInformation.controls.tempFahrenheit.value;
    this.temperatureCelsius = this.badgeInformation.controls.tempCelsius.value;
    this.notes = this.badgeInformation.controls.notes.value;
    this.vaporsExposed = this.badgeInformation.controls.vaporsExposed.value;
    this.relativeHumidity = this.badgeInformation.controls.humidity.value;

    if (this.selectedUser === 'null') { this.selectedUser = null; }
    if (this.badgeInformation.controls.activatedTime.value === '') { this.activatedTime = null; }
    if (this.badgeInformation.controls.turnedInTime.value === '') { this.turnedInTime = null; }
    if (!this.badgeSerialNumber || this.badgeSerialNumber === '') {
      this.modalService.setModalContext('Improper Format for the Badge Data');
      return;
    }

    if (this.determineBadgeStatus())
    {
      this.editBadge();
    }
  }

  determineBadgeStatus(): boolean {
    if (!this.badgeStatus){
      const selectedBadge = this.gridService.getRows().some(x => x.badge_serial_number === this.badgeSerialNumber)[0];
      if (!selectedBadge){
        return false;
      }
      this.badgeStatus = selectedBadge.badge_status;
    }

    if (this.badgeStatus === 1 || this.badgeStatus === 2 || this.badgeStatus === 4 || !this.badgeStatus || this.badgeStatus === 7) {
      if (this.activatedTime && this.turnedInTime) {
        this.badgeStatus = 4;
      } else if (this.activatedTime && !this.turnedInTime && this.badgeStatus === 7) {
        this.badgeStatus = 2;
      } else if (!this.activatedTime && !this.turnedInTime && this.selectedUser) {
        this.badgeStatus = 7;
      } else if (!this.activatedTime && !this.turnedInTime && !this.selectedUser) {
        this.badgeStatus = 1;
      } else {
        this.modalService.setModalContext('Could not update badge, check your inputs and try again.');
        return false;
      }
    }

    return true;
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

  // Performs the auto Calculations for the duration based on times.
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

  // Add the Badge to the DB.
  editBadge(): void {
    const activatedT = this.formatDate(this.activatedTime);
    const turnedIn = this.formatDate(this.turnedInTime);
    this.badgeService.editBadgeData(
      this.badgeSerialNumber,
      this.selectedUser,
      this.badgeStatus,
      activatedT,
      turnedIn,
      this.temperatureCelsius,
      this.temperatureFahrenheit,
      this.relativeHumidity,
      this.vaporsExposed,
      this.notes,
      this.badgeId,
    ).subscribe(
      (value) => {},
      (err) => { console.log(err); },
      () => { this.resetValues(); });
  }

  // Reset Display input values.
  resetValues(): void {
    this.modalService.setModalContext(
      'Badge ' + this.badgeSerialNumber + ' has been updated in the database'
    );
    this.badgeInformation.reset();
    this.badgeStatus = null;
    this.resetSubscriptions();
    this.gridService.setGridType(8);
  }

  // Format the Date for DB compliance
  formatDate(time: DateTimeFormat): string {
    if (time === null) {
      return null;
    }

    const newTime = time + '';
    const parsedTime = newTime.slice(0, 16).replace('T', ' ') + ':00';
    console.log('The New Formatted Time is: ' + parsedTime);
    return parsedTime;
  }

  // Create subscriptions that the component will need.
  ngOnInit(): void {
    this.constantSubscriptions.add(this.gridService.rowSelected.subscribe((value) => {
      if (value) {
        this.showSelectedBadgeData();
      } else {
        this.badgeInformation.reset();
      }
    }));
    this.subscriptions.add(this.gridService.subordinatesResponse().subscribe((value) => {
      this.users = value;
      this.badgeInformation.controls.assignedUser.setValue(this.users);
    }));
  }

  // Unsubscribe from all nonConstantSubscriptions.
  resetSubscriptions(): void {
    this.subscriptions.unsubscribe();
  }

  // Unsubscribe from all subscriptions.
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.constantSubscriptions.unsubscribe();
  }
}
