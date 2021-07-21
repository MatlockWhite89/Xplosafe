import {Component, OnInit, OnDestroy, Input, Output, EventEmitter} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {merge, Subject, Subscription} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import DateTimeFormat = Intl.DateTimeFormat;
import { TokenState } from '../../../../database/Models/database.model.tokenState';
import { BadgeService } from '../../../../services/badge.service';
import { TokenType } from '../../../../database/Models/database.mode.tokenType';
import {concatAll, debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {ReportService} from '../../../../services/report.service';
import {castNumber} from '@amcharts/amcharts4/core';

export class Token {
  // tslint:disable:variable-name
  tokenId: number;
  badgeSerialNumber: string;
  state: string;
  type: string;
  targetAnalytes: SelectedCompound[];
  newlyCreated: boolean;
  edited: boolean;

  // tslint:enable:variable-name
  constructor(temp: any | undefined) {
    // tslint:disable:no-console
    this.tokenId = temp?.id;
    this.type = temp?.type ?? 'OSU-6';
    this.state = temp?.state ?? 'Active';
    this.targetAnalytes = temp?.targetAnalytes ?? [];
  }

  // Gets or Sets the Badge Serial Number.
  get badge_serial_number(): string { return this.badgeSerialNumber; }
  set badge_serial_number(value: string) { this.badgeSerialNumber = value; }

  // Gets or Sets the Token Id.
  get token_id(): number { return this.tokenId; }
  set token_id(value: number) { this.tokenId = value; }

  // Gets or Sets the token State.
  get token_state(): string { return this.state; }
  set token_state(value: string) {
    this.edited = this.edited || value !== this.state;
    this.state = value;
  }

  // Gets or Sets the Token Type.
  get token_type(): string { return this.type; }
  set token_type(value: string) {
    this.edited = this.edited || value !== this.type;
    this.type = value;
  }

  // Gets or Sets the Target Analytes.
  get target_analytes(): SelectedCompound[] { return this.targetAnalytes; }
  set target_analytes(value: SelectedCompound[]){
    this.edited = this.edited || value !== this.targetAnalytes;
    this.targetAnalytes = value;
  }
}

export class SelectedCompound {
  // tslint:disable:variable-name
  casNumber?: string;
  analyteName?: string;

  // tslint:enable:variable-name
  constructor() {
    this.casNumber = null;
    this.analyteName = null;
  }

  // Gets or Sets the Cas Number.
  get cas_number(): string { return this.casNumber; }
  set cas_number(value: string) { this.casNumber = value; }

  // Gets or Sets the Analyte Name.
  get analyte_name(): string { return this.analyteName; }
  set analyte_name(value: string) { this.analyteName = value; }
}

@Component({
  selector: 'app-token-values',
  templateUrl: './token-values.component.html',
  styleUrls: ['./token-values.component.css'],
})
export class TokenValuesComponent implements OnInit, OnDestroy {
  @Input() token: Token;
  @Output() type: EventEmitter<string> = new EventEmitter();
  @Output() state: EventEmitter<string> = new EventEmitter();
  @Output() targetAnalytes: EventEmitter<string[]> = new EventEmitter();
  tokenInformation = new FormGroup({
    tokenId: new FormControl(),
    badgeSerialNumber: new FormControl(),
    tokenType: new FormControl(),
    tokenState: new FormControl(''),
    targetAnalyte: new FormControl(''),
  });

  // Form Values
  expirationDate: DateTimeFormat;
  tokenStates: TokenState[];
  tokenTypes: TokenType[];
  tokenBlank: boolean;
  selected: SelectedCompound[];

  subscriptions: Subscription;
  constantSubscriptions: Subscription;

  private analyteSearch = new Subject();
  searchLike: string;
  results: any;

  constructor(
    private http: HttpClient,
    private badgeService: BadgeService,
    private reportService: ReportService,
  ) {
    this.subscriptions = new Subscription();
    this.constantSubscriptions = new Subscription();

    this.tokenStates = [];
    this.tokenTypes = [];
    this.results = [];
    this.selected = [];
    this.tokenBlank = false;
  }

  // Create subscriptions that the component will need.
  ngOnInit(): void {
    this.setupSearchResultObserver();
    this.badgeService.getTokenStates().subscribe((value) => {
      if (value){
        this.tokenStates = value;
        this.tokenInformation.controls.tokenState.setValue(this.tokenStates[0]);
      }
    });
    this.badgeService.getTokenTypes().subscribe((value) => {
      if (value){
        this.tokenTypes = value;
        this.tokenInformation.controls.tokenType.setValue(this.tokenTypes[0]);
      }
    });

    this.tokenInformation.controls.tokenId.setValue(this.token.token_id);
    this.tokenInformation.controls.badgeSerialNumber.setValue(this.token.badge_serial_number);
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
          this.state.emit('ERROR');
        },
        complete: () => {
          /*console.debug('Analyte Search completing...')*/
        },
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
    this.token.targetAnalytes.push(temp);
  }

  // Remove the given Analyte from the Selected Analytes array.
  removeSelectedAnalyte(casNumber: string): void {
    const selectedValue = this.selected.find(x => x.casNumber === casNumber);
    const index = this.selected.indexOf(selectedValue);
    this.selected.splice(index, 1);

    const target = this.token.targetAnalytes.find(x => x.casNumber === casNumber);
    const targetIndex = this.token.targetAnalytes.indexOf(target);
    this.selected.splice(targetIndex, 1);
  }

  // Determine if this token is a blank token.
  determineIfBlank(): void {
    this.token.token_state = this.tokenInformation.controls.tokenState.value;
    if (this.token.token_state === 'Blank'){
      this.tokenBlank = true;
    }
    else {
      this.tokenBlank = false;
    }
  }

  changeTokenType(): void {
    this.token.token_type = this.tokenInformation.controls.tokenType.value;
  }

  // Find the Given Analyte
  search(): void {
    this.analyteSearch.next(this.searchLike);
  }

  // Unsubscribe from all subscriptions.
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.constantSubscriptions.unsubscribe();
  }
}
