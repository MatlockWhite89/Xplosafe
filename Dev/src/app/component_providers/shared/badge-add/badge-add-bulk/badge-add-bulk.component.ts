import {Component, OnInit, OnDestroy} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {concat, Subscription} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BadgeService } from '../../../../services/badge.service';
import { GridService } from '../../../../services/agGrid.service';
import { ModalWindowService } from '../../../../services/modal-window.service';
import {Token} from '../token-values/token-values.component';
import {mergeAll} from 'rxjs/operators';

@Component({
  selector: 'app-badge-add-bulk',
  templateUrl: './badge-add-bulk.component.html',
  styleUrls: ['./badge-add-bulk.component.css'],
})
export class BadgeAddBulkComponent implements OnInit, OnDestroy {
  badgeInformation = new FormGroup({
    badgeSerialNumberFirst: new FormControl(),
    badgeSerialNumberSecond: new FormControl(),
    badgeSerialNumberThird: new FormControl(),
    batchGroup: new FormControl(''),
    numberOfTokens: new FormControl(''),
    numberOfBadges: new FormControl(''),
    expirationDate: new FormControl(''),
  });

  // Form Values
  expirationDate: Date;
  batchGroup: string;
  badgeSerialNumber: string;
  numberOfTokens: number;
  numberOfBadges: number;
  bsnFirstPart: number;
  bsnSecondPart: number;
  bsnThirdPart: number;
  tokens: Token[];
  displayTokens: boolean;

  subscriptions: Subscription;
  constantSubscriptions: Subscription;

  yearMilliSecondsValue = (1000 * 60 * 60 * 24 * 365);

  constructor(
    private http: HttpClient,
    private badgeService: BadgeService,
    private gridService: GridService,
    private modalService: ModalWindowService
  ) {
    this.subscriptions = new Subscription();
    this.constantSubscriptions = new Subscription();

    this.tokens = [];
    this.displayTokens = false;

    this.determineDefaultDisplays();
    // Set the grid to display badges
    this.gridService.setGridType(1);
  }

  // Makes the default badge serial number based on the current julian date.
  determineDefaultDisplays(): void {
    const str = new Date(Date.now()).toLocaleString();
    const day = Number(str.split('/')[1]);
    const month = Number(str.split('/')[0]);
    const year = Number(str.split('/')[2].slice(0, 4));
    let numOfDays = 0;
    switch (month){
      case 0:
        numOfDays = 0;
        break;
      case 1:
        numOfDays = 31;
        break;
      case 2:
        numOfDays = 59;
        break;
      case 3:
        numOfDays = 90;
        break;
      case 4:
        numOfDays = 120;
        break;
      case 5:
        numOfDays = 151;
        break;
      case 6:
        numOfDays = 181;
        break;
      case 7:
        numOfDays = 212;
        break;
      case 8:
        numOfDays = 243;
        break;
      case 9:
        numOfDays = 273;
        break;
      case 10:
        numOfDays = 304;
        break;
      case 11:
        numOfDays = 334;
        break;
    }

    const years = year.toString().charAt(year.toString().length - 1);
    const totalDays = day + numOfDays;
    let s = '';
    if (totalDays < 10){
      s = '00' + totalDays;
    }
    else if (totalDays < 100){
      s = '0' + totalDays;
    }
    else {
      s = totalDays.toString();
    }

    const secondPlaceHolder = years + s;
    this.badgeInformation.controls.badgeSerialNumberFirst.setValue(Number(1));
    this.badgeInformation.controls.badgeSerialNumberSecond.setValue(Number(secondPlaceHolder));
    this.badgeInformation.controls.badgeSerialNumberThird.setValue(Number(1));
  }

  // Checks the Badge data to make sure it has been filled out properly before adding to DB.
  checkBadgeData(): void {
    this.expirationDate = new Date(Date.now() + this.yearMilliSecondsValue);
    this.batchGroup = this.badgeInformation.controls.batchGroup.value;
    this.numberOfTokens = this.badgeInformation.controls.numberOfTokens.value;
    this.numberOfBadges = this.badgeInformation.controls.numberOfBadges.value;
    this.bsnFirstPart = this.badgeInformation.controls.badgeSerialNumberFirst.value;
    this.bsnSecondPart = this.badgeInformation.controls.badgeSerialNumberSecond.value;
    this.bsnThirdPart = this.badgeInformation.controls.badgeSerialNumberThird.value;

    this.badgeSerialNumber = this.bsnFirstPart + '-' + this.bsnSecondPart + '-';

    if (!this.numberOfBadges || this.numberOfBadges < 1) {
      this.modalService.setModalContext('No badges were added, Ensure that the appropriate fields have been filled out.');
      return;
    }

    if (
      this.badgeSerialNumber === '' ||
      this.numberOfTokens < 1 ||
      !this.batchGroup || this.batchGroup === ''
    ) {
      this.modalService.setModalContext('Improper Format for the Badge Data');
      return;
    }

    this.addBadge();
  }

  // Displays the number of token parameters based on the number input.
  displayTokenParameters(): void {
    this.numberOfTokens = this.badgeInformation.controls.numberOfTokens.value;
    this.tokens = [];
    for (let i = 1; i <= this.numberOfTokens; i++) {
      const a = new Token(undefined);
      a.token_id = i;
      this.tokens.push(a);
    }

    this.displayTokens = true;
  }

  evaluateBadgeSSN(value: number): string {
    let result = '';
    const num = Number(this.bsnThirdPart) + value;
    if (num < 10){
      result = this.badgeSerialNumber + '00' + num.toString();
    }
    else if (num < 100){
      result = this.badgeSerialNumber + '0' + num.toString();
    }
    else {
      result = this.badgeSerialNumber + num.toString();
    }

    return result;
  }

  // Add the Badge to the DB.
  addBadge(): void {
    for (let i = 0; i < this.numberOfBadges; i++) {
      const badgeSerialNum = this.evaluateBadgeSSN(i);
      if (!badgeSerialNum || badgeSerialNum === ''){
        continue;
      }

      // const s1 = this.expirationDate.toISOString();
      const s1 = this.badgeInformation.controls.expirationDate.value;
      const expiration = this.formatDate(s1);
      this.badgeService.addBadgeData(
        badgeSerialNum,
        null,
        null,
        null,
        null,
        null,
        this.batchGroup,
        this.numberOfTokens,
        expiration,
      ).subscribe((value) => {
        if (this.numberOfBadges > 1) {
          this.modalService.setModalContext(
            this.numberOfBadges + ' badges have been added to the database ranging from BSN' +
            this.badgeSerialNumber + this.bsnThirdPart + ' To BSN: ' +
            this.badgeSerialNumber + (this.bsnThirdPart + this.numberOfBadges - 1));
        }
        else {
          this.modalService.setModalContext('Badge ' + this.badgeSerialNumber + this.bsnThirdPart + ' has been added to the database');
        }
      },
        (err) => { console.log(err); },
        () => { this.updateTokenValues(badgeSerialNum); });
    }

    this.resetValues();
  }

  // Iterate over the Tokens and update those values in the DB.
  updateTokenValues(badgeSerialNumber: string): void {
    console.log(this.tokens);
    const arr = [];
    for (const token of this.tokens) {
      arr.push(this.badgeService.updateToken(token.state, token.type, badgeSerialNumber, token.tokenId.toString()));

      for (const target of token.targetAnalytes) {
        arr.push(this.badgeService.addTargetAnalyte(
          badgeSerialNumber,
          token.tokenId.toString(),
          target.casNumber,
          target.analyteName,
          token.token_type));
      }
    }

    const concatenatedObs = concat(arr).pipe(mergeAll());
    concatenatedObs.subscribe(
      (value) => {},
      (err) => { console.log(err); },
      () => {
        this.resetValues();
      });
  }

  handleStateUpdate(event: string): void {
    switch (event){
      case ('MODIFIED'):
        break;
    }
  }

  // Reset Display input values.
  resetValues(): void {
    this.badgeInformation.reset();
    this.resetSubscriptions();
    this.gridService.setGridType(1);
    // this.tokens = [];
    this.displayTokens = false;
    this.determineDefaultDisplays();
  }

  // Format the Date for DB compliance
  formatDate(time: string): string {
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
  }

  // Unsubscribe from all nonConstantSubscriptions.
  resetSubscriptions(): void{
    this.subscriptions.unsubscribe();
  }

  // Unsubscribe from all subscriptions.
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.constantSubscriptions.unsubscribe();
  }
}
