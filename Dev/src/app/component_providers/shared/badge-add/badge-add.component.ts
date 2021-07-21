import {Component, OnInit, OnDestroy} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {concat, Subscription} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BadgeService } from '../../../services/badge.service';
import { GridService } from '../../../services/agGrid.service';
import DateTimeFormat = Intl.DateTimeFormat;
import { Badge } from '../../../database/Models/database.model.badge';
import { ModalWindowService } from '../../../services/modal-window.service';
import {TokenState} from '../../../database/Models/database.model.tokenState';
import {AnalyzedTokenResponseData} from '../../../database/Models/database.model.analyzedToken';
import {Token} from './token-values/token-values.component';
import {mergeAll} from 'rxjs/operators';

@Component({
  selector: 'app-badge-add',
  templateUrl: './badge-add.component.html',
  styleUrls: ['./badge-add.component.css'],
})

export class BadgeAddComponent implements OnInit, OnDestroy {
  badgeInformation = new FormGroup({
    badgeSerialNumber: new FormControl(),
    batchGroup: new FormControl(''),
    expirationDate: new FormControl(''),
    numberOfTokens: new FormControl(''),
  });

  // Form Values
  expirationDate: DateTimeFormat;
  batchGroup: string;
  badgeSerialNumber: string;
  numberOfTokens: number;
  displayTokens: boolean;
  tokens: Token[];

  subscriptions: Subscription;
  constantSubscriptions: Subscription;

  constructor(
    private http: HttpClient,
    private badgeService: BadgeService,
    private gridService: GridService,
    private modalService: ModalWindowService
  ) {
    this.subscriptions = new Subscription();
    this.constantSubscriptions = new Subscription();

    // Set the grid to display badges
    this.gridService.setGridType(1);
    this.tokens = [];
    this.displayTokens = false;
  }

  // Set the fields based on AgGrid selection.
  showSelectedBadgeData(): void {
    const data = this.gridService.getSelectedRow() as Badge;
    if (!data) { return; }
    if (data.batch_group) { this.badgeInformation.controls.batchGroup.setValue(data.batch_group); }
    if (data.badge_serial_number) {
      this.badgeInformation.controls.badgeSerialNumber.setValue( data.badge_serial_number);
    }
    if (data.number_of_tokens) {
      this.badgeInformation.controls.numberOfTokens.setValue(data.number_of_tokens.valueOf());
      this.displayTokenParameters();
    }
    if (data.expiration_date) {
      this.badgeInformation.controls.expirationDate.setValue(data.expiration_date.valueOf());
    }
  }

  // Displays the number of token parameters based on the number input.
  displayTokenParameters(): void {
    this.numberOfTokens = this.badgeInformation.controls.numberOfTokens.value;
    this.badgeSerialNumber = this.badgeInformation.controls.badgeSerialNumber.value;
    this.tokens = [];
    for (let i = 1; i <= this.numberOfTokens; i++) {
      const a = new Token(undefined);
      a.token_id = i;
      a.badgeSerialNumber = this.badgeSerialNumber;
      this.tokens.push(a);
    }

    console.log(this.tokens);
    this.displayTokens = true;
  }

  handleStateUpdate(event: string): void {
    switch (event){
      case ('MODIFIED'):
        break;
    }
  }

  // Checks the Badge data to make sure it has been filled out properly before adding to DB.
  checkBadgeData(): void {
    this.expirationDate = this.badgeInformation.controls.expirationDate.value;
    this.batchGroup = this.badgeInformation.controls.batchGroup.value;
    this.badgeSerialNumber = this.badgeInformation.controls.badgeSerialNumber.value;
    this.numberOfTokens = this.badgeInformation.controls.numberOfTokens.value;

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

  // Add the Badge to the DB.
  addBadge(): void {
    const expiration = this.formatDate(this.expirationDate);
    this.badgeService.addBadgeData(
      this.badgeSerialNumber,
      null,
      null,
      null,
      null,
      null,
      this.batchGroup,
      this.numberOfTokens,
      expiration
    ).subscribe(
      (value) => {
      },
      (err) => { console.log(err); },
      () => {
        this.updateTokenValues();
      });
  }

  // Iterate over the Tokens and update those values in the DB.
  updateTokenValues(): void {
    console.log(this.tokens);
    const arr = [];
    for (const token of this.tokens){
      arr.push(this.badgeService.updateToken(token.state, token.type, token.badgeSerialNumber, token.tokenId.toString()));

      for (const target of token.targetAnalytes){
        arr.push(this.badgeService.addTargetAnalyte(
          token.badgeSerialNumber,
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

  // Reset Display input values.
  resetValues(): void {
    this.modalService.setModalContext(
      'Badge ' + this.badgeSerialNumber + ' has been added to the database'
    );
    this.badgeInformation.reset();
    this.resetSubscriptions();
    this.gridService.setGridType(1);
    this.tokens = [];
    this.displayTokens = false;
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
