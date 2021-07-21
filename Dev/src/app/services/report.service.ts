import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { EMPTY, Observable, of } from 'rxjs';
import { UserService } from './user.service';
import { FormArray, FormControl } from '@angular/forms';
import { LoginService } from './login.service';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';
import { RequestedCompound } from '../component_providers/shared/upload-report/token-report/analysis-results/analysis-results.component';
import {
  AnalysisType,
  BadgeAnalysis,
  StateOptionStrings,
  TokenAnalysis,
} from '../component_providers/shared/Enums/analysis-state.enum';
import { TargetAnalyteResponse } from '../database/Models/database.mode.targetAnalyte';

/*
 * Used by the UploadReport component for representing badge level reporting.
 * */
export class BadgeReportForm {
  // tslint:disable:variable-name
  private _name = new FormControl();
  private _tokenReports = new FormArray([]);
  private _damaged = new FormControl();
  private _damagedComments = new FormControl();
  private _currentState: BadgeAnalysis = {
    type: AnalysisType.BadgeAnalysis,
    state: 'DEFAULT',
  };
  // tslint:enable:variable-name

  /*
   * Returns the appropriate Bootstrap class for the current state of the badge analysis.
   * */
  getClassForCurrentState(): string {
    switch (this._currentState.state) {
      case 'DEFAULT':
        return 'panel-default';
      case 'MODIFIED':
        return 'panel-warning';
      case 'PARTIAL_COMPLETION':
        return 'panel-info';
      case 'DAMAGED':
      case 'ERROR':
        return 'panel-danger';
      case 'COMPLETED':
        return 'panel-success';
      default:
        return 'panel-default';
    }
  }

  // Sets the current state of the badge analysis.
  setStateValue(value: StateOptionStrings): void {
    this._currentState.state = value;
  }

  // Gets the named stored for this badge analysis.
  get name(): string {
    return this._name.value;
  }

  // Sets the named stored for this badge analysis.
  set name(newName: string) {
    this._name.setValue(newName);
  }

  // Gets the token reports as an array from this badge analysis.
  get tokenReports(): TokenReportForm[] {
    return this._tokenReports.value as TokenReportForm[];
  }

  // Adds a token report to this badge analysis's token reports.
  addToTokenReports(tokenReportForm: TokenReportForm): void {
    this._tokenReports.push(new FormControl(tokenReportForm));
  }

  // Gets whether or not the badge is damaged for this badge analysis.
  get damaged(): boolean {
    return this._damaged.value;
  }

  // Sets whether or not the badge is damaged for this badge analysis.
  set damaged(state: boolean) {
    this._damaged.setValue(state);
  }

  // Gets the comments for this badge analysis.
  get damagedComments(): string {
    return this._damagedComments.value;
  }

  // Sets the comments for this badge analysis.
  set damagedComments(newComments: string) {
    this._damagedComments.setValue(newComments);
  }

  // Handles the states emitted from the token reports of this badge analysis. These may or may not affect the state of this badge analysis.
  handleStateChange($event: string): void {
    switch ($event) {
      case 'DEFAULT':
        this.setStateValue($event);
        break;
      case 'MODIFIED':
        this.setStateValue($event);
        break;
      case 'PARTIAL_COMPLETION':
        if (this._currentState.state !== 'MODIFIED') {
          this.setStateValue($event);
        } else {
          // tslint:disable-next-line:no-console
          console.debug('Current badge\'s state supersedes it\'s token\'s state.');
        }
        break;
      case 'DAMAGED':
      case 'ERROR':
        // tslint:disable-next-line:no-console
        console.debug('Setting badge state to ', $event);
        this.setStateValue($event);
        break;
      case 'QUARANTINED':
        console.log('Setting Badge State Value to QUARANTINED');
        this.setStateValue($event);
        break;
      case 'COMPLETED':
        if (this.tokenReports.every((x) => x.getStateValue() === 'COMPLETED')) {
          this.setStateValue($event);
        } else {
          this.setStateValue('PARTIAL_COMPLETION');
        }
        break;
    }
  }
}

/*
 * Used by the UploadReport component for representing token level reporting.
 * */
export class TokenReportForm {
  // tslint:disable:variable-name
  private _badge_serial_number = new FormControl();
  private _tube_number = new FormControl();
  private _raw_data = new FormControl();
  private _raw_data_id = new FormControl();
  private _comments = new FormControl();
  private _original_filename = new FormControl();
  private _raw_comments = new FormControl();
  private _date_last_updated = new FormControl();
  private _data_table_id = new FormControl();
  private _token_state = new FormControl();
  private _currentState: TokenAnalysis = {
    type: AnalysisType.TokenAnalysis,
    state: 'DEFAULT',
  };
  // tslint:enable:variable-name

  // Gets the badge serial number of this token analysis.
  get badge_serial_number(): string {
    return this._badge_serial_number.value;
  }

  // Sets the badge serial number of this token analysis.
  set badge_serial_number(serialNum: string) {
    this._badge_serial_number.setValue(serialNum);
  }

  // Gets the token state of this token analysis.
  get token_state(): string {
    return this._token_state.value;
  }

  // Sets the token state of this token analysis.
  set token_state(state: string) {
    this._token_state.setValue(state);
  }

  // Gets the data table id of this token analysis.
  get data_table_id(): number {
    return this._data_table_id.value;
  }

  // Sets the data table id of this token analysis.
  set data_table_id(val: number) {
    this._data_table_id.setValue(val);
  }
  // Gets the token id or tube number this token analysis.
  get tube_number(): number {
    return this._tube_number.value;
  }

  // Sets the token id or tube number this token analysis.
  set tube_number(num) {
    this._tube_number.setValue(num);
  }

  // Gets the Multer generated name for the file uploaded for this token analysis.
  get raw_data(): string {
    return this._raw_data.value;
  }

  // Sets the Multer generated name for the file uploaded for this token analysis.
  set raw_data(data: string) {
    this._raw_data.setValue(data);
  }

  // Gets the raw data table id for the file uploaded for this token analysis.
  get raw_data_id(): number {
    return this._raw_data_id.value;
  }

  // Sets the raw data table id for the file uploaded for this token analysis.
  set raw_data_id(data: number) {
    this._raw_data_id.setValue(data);
  }

  // Gets the analyzed comments for this token analysis.
  get comments(): string {
    return this._comments.value;
  }

  // Sets the analyzed comments for this token analysis.
  set comments(text: string) {
    this._comments.setValue(text);
  }

  // Gets the filename for this token analysis.
  get original_filename(): string {
    return this._original_filename.value;
  }

  // Sets the filename for this token analysis.
  set original_filename(text: string) {
    this._original_filename.setValue(text);
  }

  // Gets the raw or damaged comments for this token analysis.
  get raw_comments(): string {
    return this._raw_comments.value;
  }

  // Sets the raw or damaged comments for this token analysis.
  set raw_comments(text: string) {
    this._raw_comments.setValue(text);
  }

  // Gets the date last updated for this token analysis.
  get date_last_updated(): string {
    return this._date_last_updated.value;
  }

  // Sets the date last updated for this token analysis.
  set date_last_updated(text: string) {
    this._date_last_updated.setValue(text);
  }

  // Gets the current state of this token analysis.
  getStateValue(): string {
    return this._currentState.state;
  }

  // Sets the current state of this token analysis.
  setStateValue(value: StateOptionStrings): void {
    this._currentState.state = value;
  }

  // Gets the Class correlating with the current state.
  getClassForCurrentState(): string {
    switch (this._currentState.state) {
      case 'DEFAULT':
        return 'panel-default';
      case 'MODIFIED':
        return 'panel-warning';
      case 'PARTIAL_COMPLETION':
        return 'panel-info';
      case 'DAMAGED':
      case 'ERROR':
        return 'panel-danger';
      case 'QUARANTINED':
      case 'COMPLETED':
        return 'panel-success';
      default:
        return 'panel-default';
    }
  }
}

@Injectable()
export class ReportService {
  private analytes = new Map<string, string>();
  constructor(
    private httpClient: HttpClient,
    private userService: UserService,
    private loginService: LoginService
  ) {
    this.httpClient.get(`${environment.apiUrl}/getAnalytesForReport`).subscribe(
      (values: { name: string; cas_number: string }[]) => {
        for (const value of values) {
          this.analytes.set(value.name, value.cas_number);
        }
        // tslint:disable-next-line:no-console
        console.debug(this.analytes);
      },
      (error) => {
        console.error(error);
        this.handleError(error);
      }
    );
  }

  /*
   * Handles errors in the responses of backend api call.
   * */
  public handleError(errorRes: HttpErrorResponse): void {
    this.loginService.setErrorCode(errorRes.status);
    if (errorRes.status === 401 && this.loginService.getLoggedInValue()) {
      // User Disconnected in backend we need to log the user out.
      this.logout();
    }
  }

  /*
   * Returns an observable of a backend api call.
   * */
  addDamagedBadgeReport(badgeId: string, comments: string): Observable<any> {
    if (badgeId === undefined || badgeId === null) {
      return null;
    }

    const url = `${environment.apiUrl}/reportDamagedBadge`;
    return this.httpClient
      .post(url, {
        comments,
        badgeId,
      })
      .pipe(catchError(async (err) => this.handleError(err)));
  }

  logout(): void {
    this.loginService.backendForceLogout();
  }

  /*
   * Returns an observable of a backend api call.
   * */
  getBadgesWithStatus(status: number): Observable<any> {
    return this.httpClient.post(
      `${environment.apiUrl}/tokenReportAggregateValues`,
      {
        badge_status: status,
      }
    );
  }

  /*
   * Returns an observable of a backend api call.
   * */
  getAnalytes(): Observable<any> {
    return this.httpClient.post<any>(
      `${environment.apiUrl}/analyteExposureRatings`,
      {}
    );
  }

  /*
   * Returns an observable of a backend api call.
   * */
  getSpecifiedAnalyzedTokenAnalyte(
    badgeSerialNumber: string,
    tokenId: number,
    analyteName: string
  ): Observable<any> {
    return this.httpClient.post<any>(
      `${environment.apiUrl}/getSpecifiedAnalyzedToken`,
      {
        badgeSerialNumber,
        tokenId,
        analyteName,
      }
    );
  }

  /*
   * Returns an observable of a backend api call.
   * */
  getMethods(): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/methods`, {});
  }

  /*
   * Returns an observable of a backend api call.
   * */
  getTokenTypes(): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/tokenTypes`, {});
  }

  /*
   * Returns an observable of a backend api call.
   * */
  getTargetAnalytes(
    badgeSerialNumber: string,
    tokenId: number
  ): Observable<any> {
    return this.httpClient.post<TargetAnalyteResponse>(
      `${environment.apiUrl}/getTargetAnalytes`,
      {
        badgeSerialNumber,
        tokenId,
      }
    );
  }

  /*
   * Returns an observable of a backend api call.
   * */
  updateAnalyzedReport(
    tokenReportForm: TokenReportForm,
    requestedCompound: RequestedCompound,
    comments: string
  ): Observable<any> {
    return this.httpClient.put(`${environment.apiUrl}/updateAnalyzedReport`, {
      analyte_name: requestedCompound.compound,
      recorded_value: requestedCompound.quantityFound,
      badge_serial_number: tokenReportForm.badge_serial_number,
      token_id: tokenReportForm.tube_number,
      recorded_units: requestedCompound.unit,
      volume_concentration: requestedCompound.volume_concentration,
      found_concentration: requestedCompound.found_concentration,
      concentration_units: requestedCompound.concentration_units,
      cas_number: requestedCompound.casNumber,
      analyst_id: requestedCompound.analyst_id,
      analysis_method: requestedCompound.analysis_method,
      comments,
      reporting_limit: requestedCompound.reporting_limit,
      token_type: requestedCompound.token_type,
      editedBadgeSerialNumber: tokenReportForm.badge_serial_number.slice(
        2,
        tokenReportForm.badge_serial_number.length
      ),
      pk: requestedCompound.id,
    });
  }

  /*
   * Returns an observable of a backend api call.
   * */
  deleteAnalyzedReport(
    tokenReportForm: TokenReportForm,
    requestedCompound: RequestedCompound
  ): Observable<any> {
    return this.httpClient.post(`${environment.apiUrl}/deleteAnalyzedReport`, {
      analyte_name: requestedCompound.compound,
      badge_serial_number: tokenReportForm.badge_serial_number,
      token_id: tokenReportForm.tube_number,
      cas_number: requestedCompound.casNumber,
      editedBadgeSerialNumber: tokenReportForm.badge_serial_number.slice(
        2,
        tokenReportForm.badge_serial_number.length
      ),
      pk: requestedCompound.id,
    });
  }

  /*
   * Returns an observable of a backend api call.
   * */
  createAnalyzedReport(
    tokenReportForm: TokenReportForm,
    requestedCompound: RequestedCompound,
    comments: string
  ): Observable<any> {
    return this.httpClient.post(`${environment.apiUrl}/analyzedReport`, {
      analyte_name: requestedCompound.compound,
      recorded_value: requestedCompound.quantityFound,
      badge_serial_number: tokenReportForm.badge_serial_number,
      token_id: tokenReportForm.tube_number,
      recorded_units: requestedCompound.unit,
      volume_concentration: requestedCompound.volume_concentration,
      found_concentration: requestedCompound.found_concentration,
      concentration_units: requestedCompound.concentration_units,
      cas_number: requestedCompound.casNumber,
      analysis_method: requestedCompound.analysis_method,
      comments,
      reporting_limit: requestedCompound.reporting_limit,
      token_type: requestedCompound.token_type,
      editedBadgeSerialNumber: tokenReportForm.badge_serial_number.slice(
        2,
        tokenReportForm.badge_serial_number.length
      ),
      data_table_id: tokenReportForm.raw_data_id,
    });
  }

  /*
   * Returns an observable of cached results of a backend api call.
   * */
  getAnalytesByName(analyteLike: string): Observable<any> {
    if (analyteLike === '') {
      return EMPTY;
    }

    const filteredReturn = [];
    const iter = this.analytes.entries();
    for (const [name, cas] of iter) {
      const newVal = { a_name: name, a_cas: cas };
      if (name.startsWith(analyteLike)) {
        filteredReturn.push(newVal);
      }
    }
    return of(filteredReturn);
  }

  /*
   * Returns an observable of cached results of a backend api call.
   * */
  getAnalytesByCasNumber(analyteLike: string): Observable<any> {
    if (analyteLike === '') {
      return EMPTY;
    }

    // The following regular expression searches for characters other than a number or the hyphen.
    if (!analyteLike.search('[^0-9-]')) {
      return EMPTY;
    }

    const filteredReturn = [];
    const iter = this.analytes.entries();
    for (const [name, cas] of iter) {
      const newVal = { a_name: name, a_cas: cas };
      if (cas.startsWith(analyteLike)) {
        filteredReturn.push(newVal);
      }
    }
    return of(filteredReturn);
  }
}
