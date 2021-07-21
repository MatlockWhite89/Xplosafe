import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { RoleResponseData } from '../database/Models/database.model.role';
import { DataTableResponseData } from '../database/Models/database.model.data';
import { AnalyteResponseData } from '../database/Models/database.model.analyte';
import { BadgeResponseData } from '../database/Models/database.model.badge';
import { any } from 'codelyzer/util/function';
import { CustomResponseData } from '../database/Models/database.model.custom';
import { UserService } from './user.service';
import { LoginService } from './login.service';
import { ColumnDefsModel } from '../shared/column-defs.model';
import { UserResponseData } from '../database/Models/database.model.user';
import { environment } from '../../environments/environment';
import { SamplingRateResponseData } from '../database/Models/database.model.samplingrate';
import { LocationResponseData } from '../database/Models/database.model.location';
import { AnalyzedTokenResponseData } from '../database/Models/database.model.analyzedToken';
import {AuditResponseData} from '../database/Models/database.model.audit';

@Injectable()
export class GridService {
  roleResponse: RoleResponseData;
  badgeResponse: BadgeResponseData;
  dataResponse: DataTableResponseData;
  analyteResponse: AnalyteResponseData;
  users = new BehaviorSubject<any>(null);
  managers = new BehaviorSubject<any>(null);
  analysts = new BehaviorSubject<any>(null);
  groups = new BehaviorSubject<any>(null);
  locations = new BehaviorSubject<any>(null);
  subordinates = new BehaviorSubject<any>(null);
  roles = new BehaviorSubject<any>(null);
  defaultFramework: any;
  gridType: number;
  response: [any];
  cols: any;
  rows: any;
  rowIndex = 0;
  height = 500;
  width = 1000;
  selectedRow: any;
  rowHasBeenSelected = false;
  printCSVValue = false;
  printDSVValue = false;
  unsubscribe = false;
  rowSelected: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  analyteValue: number;

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private loginService: LoginService
  ) {
    this.gridType = null;
    this.cols = [];
    this.rows = [];
    this.response = this.getFramework();
    this.activeBadgeUser.next(this.badgeResponse);
    this.activeAnalyteUser.next(this.analyteResponse);
    this.activeDataUser.next(this.dataResponse);
    this.activeRoleUser.next(this.roleResponse);
    this.gridTypeDisplay.next(this.gridType);
    this.customDataRows.next(this.rows);
    this.customDataCols.next(this.cols);
    this.unsubscribeValue.next(this.unsubscribe);
  }

  gridTypeDisplay = new BehaviorSubject<number>(null);
  printCSV = new BehaviorSubject<boolean>(null);
  printDSV = new BehaviorSubject<boolean>(null);
  unsubscribeValue = new BehaviorSubject<boolean>(null);
  activeRoleUser = new BehaviorSubject<RoleResponseData>(null);
  activeBadgeUser = new BehaviorSubject<BadgeResponseData>(null);
  activeDataUser = new BehaviorSubject<DataTableResponseData>(null);
  activeAnalyteUser = new BehaviorSubject<AnalyteResponseData>(null);
  customDataRows = new BehaviorSubject<any>(null);
  customDataCols = new BehaviorSubject<any>(null);

  // tslint:disable:no-console
  handleError(errorRes: HttpErrorResponse): Observable<any> {
    this.loginService.setErrorCode(errorRes.status);
    if (errorRes.status === 401 && this.loginService.getLoggedInValue()) {
      // User Disconnected in backend we need to log the user out.
      this.logout();
    }
    return;
  }

  private handleSubordinateFailure<T>(
    result?: T
  ): (error: any) => Observable<T> {
    return (error: any): Observable<T> => {
      console.log(
        `Failed to get subordinates for the following reason(s): ${error.message}`
      );
      return of(result as T);
    };
  }

  private handleDownloadData(resData: any): void {
    console.log('Reached into the Downloaded Data Handler');
    window.open(resData, '_blank');
  }

  // Sets the grid type used when determining what column values to display.
  setGridType(value: number): void {
    this.gridType = value;
    this.gridTypeDisplay.next(this.gridType);
  }

  // Sets the determining value to print CSV of the displayed grid values.
  setPrintCSV(value: boolean): void {
    this.printCSVValue = value;
    this.printCSV.next(this.printCSVValue);
  }

  // Sets the determining value to print DSV of the displayed grid values.
  setPrintDSV(value: boolean): void {
    this.printDSVValue = value;
    this.printDSV.next(this.printDSVValue);
  }

  // Sends the row values for custom grids to the the custom grid component.
  publishRowValues(): void {
    console.log('Publishing new Row values: ' + this.rows);
    this.customDataRows.next(this.rows);
  }

  // Sends the column information for custom grids to the the custom grid component.
  publishColValues(): void {
    console.log('Publishing new Col values: ' + this.cols);
    this.customDataCols.next(this.cols);
  }

  // Rest the Columns and Rows values.
  resetValues(): void {
    this.cols = [];
    this.rows = [];
  }

  // returns the User list.
  getUsers(): any {
    return this.users;
  }

  // returns the analyst list.
  getAnalysts(): any {
    return this.analysts;
  }

  // returns the manager list.
  getManagers(): any {
    return this.managers;
  }

  // returns the location list.
  getLocations(): any {
    return this.locations;
  }

  // returns the subordinant list.
  getSubordinates(): any {
    return this.subordinates;
  }

  // returns the group list.
  getGroups(): any {
    return this.groups;
  }

  // Gets the gridType.
  getGridType(): number {
    return this.gridType;
  }

  // Sets the selected Row based on user double click in the grid component.
  setSelectedRow(values: any): void {
    if (values !== this.selectedRow) {
      this.selectedRow = values;
      this.rowHasBeenSelected = this.selectedRow !== null;
      this.rowSelected.next(this.rowHasBeenSelected);
    }
  }

  // Return the selected Row Value.
  getSelectedRow(): any {
    return this.selectedRow;
  }

  // Downloads the file on the server based on the filepath name.
  downloadFile(filePath: string): Observable<any> {
    return this.http
      .post<string>(`${environment.apiUrl}/downloadFile`, {})
      .pipe(
        catchError((err) => this.handleError(err)),
        tap((result) => {
          console.log(result);
          this.handleDownloadData(result);
        })
      );
  }

  // Returns an array of all usernames from the backend.
  getUserList(): void {
    const userId = this.userService.getActiveUser().userId;
    if (userId === undefined) {
      console.debug('The active user is undefined.');
      return;
    }
    this.http.get(`${environment.apiUrl}/getUsers` + userId).subscribe(
      (value) => {
        this.users.next(value);
        console.log('Users:', value);
      },
      (usersError) => {
        this.handleError(usersError);
        console.log(usersError);
      },
      () => {}
    );
  }

  // Returns current users managers from the backend.
  getManagerList(): void {
    const groupId = this.userService.getActiveUser().group;
    if (groupId === undefined) {
      console.debug('The active user is undefined.');
      return;
    }
    this.http.get(`${environment.apiUrl}/getManager` + groupId).subscribe(
      (value) => {
        this.managers.next(value);
      },
      (usersError) => {
        this.handleError(usersError);
        console.log(usersError);
      },
      () => {}
    );
  }

  // Returns an array of all locations from backend.
  getLocationList(): void {
    const userId = this.userService.getActiveUser().userId;
    if (userId === undefined) {
      console.debug('The active user is undefined.');
      return;
    }
    this.http.get(`${environment.apiUrl}/getLocation` + userId).subscribe(
      (value) => {
        this.locations.next(value);
        console.log('Locations:', value);
      },
      (usersError) => {
        this.handleError(usersError);
        console.log(usersError);
      },
      () => {}
    );
  }

  // Logout functionality when the backend is signaling the front end to log out this user.
  logout(): void {
    this.loginService.backendForceLogout();
  }

  // Returns an array of groups from the backend.
  getGroupList(): void {
    const userId = this.userService.getActiveUser().userId;
    if (userId === undefined) {
      console.debug('The active user is undefined.');
      return;
    }
    this.http.get(`${environment.apiUrl}/getGroup` + userId).subscribe(
      (value) => {
        this.groups.next(value);
        console.log('Groups:', value);
      },
      (usersError) => {
        this.handleError(usersError);
        console.log(usersError);
      },
      () => {}
    );
  }

  // Return an array of analytes from the backend.
  getAnalystList(): void {
    const userId = this.userService.getActiveUser().userId;
    if (userId === undefined) {
      console.debug('The active user is undefined.');
      return;
    }
    this.http.get(`${environment.apiUrl}/getAnalyst` + userId).subscribe(
      (value) => {
        this.analysts.next(value);
        console.log(value);
      },
      (usersError) => {
        this.handleError(usersError);
        console.log(usersError);
      },
      () => {}
    );
  }

  // Return an array of Roles from the backend.
  getRoleList(): void {
    const userId = this.userService.getActiveUser().userId;
    if (userId === undefined) {
      console.debug('The active user is undefined.');
      return;
    }
    this.http.get(`${environment.apiUrl}/getRole` + userId).subscribe(
      (value) => {
        this.roles.next(value);
        console.log('Roles:', value);
      },
      (roleError) => {
        this.handleError(roleError);
        console.log(roleError);
      },
      () => {}
    );
  }

  // Service Responders
  RoleResponse(): Observable<RoleResponseData> {
    this.unsubscribe = false;
    return this.http
      .post<RoleResponseData>(`${environment.apiUrl}/role`, {})
      .pipe(
        catchError((err) => this.handleError(err)),
        tap((result) => {
          this.cols = ColumnDefsModel.GetCachedColumnDefinition(this.gridType);
          this.width = this.cols.reduce((sum: number, c) => sum + c.width, 0);
          this.rows = result;
          this.unsubscribe = true;
        })
      );
  }

  subordinatesResponse(): Observable<UserResponseData> {
    this.unsubscribe = false;
    const user = this.userService.getActiveUser();
    if (user?.userId === undefined) {
      console.debug('The active user is undefined.');
      return of();
    }
    return this.http
      .get<UserResponseData>(
        `${environment.apiUrl}/getSubordinates/` + user.userId
      )
      .pipe(
        catchError((err) =>
          this.handleSubordinateFailure<UserResponseData>(err)
        ),
        tap((result) => {
          this.cols = ColumnDefsModel.GetCachedColumnDefinition(this.gridType);
          this.width = this.cols.reduce((sum: number, c) => sum + c.width, 0);
          this.rows = result;
          this.unsubscribe = true;
        })
      );
  }

  locationResponse(): Observable<LocationResponseData> {
    this.unsubscribe = false;
    const user = this.userService.getActiveUser();
    if (user?.userId === undefined) {
      console.debug('The active user is undefined.');
      return of();
    }
    return this.http
      .get<LocationResponseData>(`${environment.apiUrl}/locations`)
      .pipe(
        catchError((err) => this.handleError(err)),
        tap((result) => {
          this.cols = ColumnDefsModel.GetCachedColumnDefinition(this.gridType);
          this.width = this.cols.reduce((sum: number, c) => sum + c.width, 0);
          this.rows = result;
          this.unsubscribe = true;
        })
      );
  }

  auditResponse(): Observable<AuditResponseData> {
    this.unsubscribe = false;
    const user = this.userService.getActiveUser();
    if (user?.userId === undefined) {
      console.debug('The active user is undefined.');
      return of();
    }
    return this.http
      .get<AuditResponseData>(`${environment.apiUrl}/audit`)
      .pipe(
        catchError((err) => this.handleError(err)),
        tap((result) => {
          this.cols = ColumnDefsModel.GetCachedColumnDefinition(this.gridType);
          this.width = this.cols.reduce((sum: number, c) => sum + c.width, 0);
          if (!this.width){
            this.width = 50;
          }
          this.rows = result;
          this.unsubscribe = true;
        })
      );
  }

  BadgeResponse(): Observable<BadgeResponseData> {
    this.unsubscribe = false;
    return this.http
      .post<BadgeResponseData>(`${environment.apiUrl}/badge`, {})
      .pipe(
        catchError((err) => this.handleError(err)),
        tap((result) => {
          this.cols = ColumnDefsModel.GetCachedColumnDefinition(this.gridType);
          this.width = this.cols.reduce((sum: number, c) => sum + c.width, 0);
          this.rows = result;
          this.unsubscribe = true;
        })
      );
  }

  // Get Badge list from backend based on Badge Status.
  getBadgeByStatus(badgeStatus: number): Observable<any> {
    return this.http
      .post<any>(`${environment.apiUrl}/getBadgesByStatus`, {
        badgeStatus,
      })
      .pipe(
        catchError((err) => this.handleError(err)),
        tap((result) => {
          this.cols = ColumnDefsModel.GetCachedColumnDefinition(this.gridType);
          this.width = this.cols.reduce((sum: number, c) => sum + c.width, 0);
          this.rows = result;
          this.unsubscribe = true;
        })
      );
  }

  // Get Badge list from backend based on Wearer.
  getWearerBadges(wearerId: number): Observable<BadgeResponseData> {
    return this.http
      .post<BadgeResponseData>(`${environment.apiUrl}/getWearerBadges`, {
        wearerId,
      })
      .pipe(
        catchError((err) => this.handleError(err)),
        tap((result) => {
          this.cols = ColumnDefsModel.GetCachedColumnDefinition(this.gridType);
          this.width = this.cols.reduce((sum: number, c) => sum + c.width, 0);
          this.rows = result;
          this.unsubscribe = true;
        })
      );
  }

  // Get Badge list from backend based on Wearer based on status.
  getWearerBadgesByStatus(badgeStatus: number): Observable<BadgeResponseData> {
    return this.http
      .post<BadgeResponseData>(
        `${environment.apiUrl}/getWearerBadgeValuesByStatus`,
        {
          badgeStatus,
        }
      )
      .pipe(
        catchError((err) => this.handleError(err)),
        tap((result) => {
          this.cols = ColumnDefsModel.GetCachedColumnDefinition(this.gridType);
          this.width = this.cols.reduce((sum: number, c) => sum + c.width, 0);
          this.rows = result;
          this.unsubscribe = true;
        })
      );
  }

  // Get Badge list from backend based on Wearer.
  getSubordinantBadges(): Observable<BadgeResponseData> {
    return this.http
      .post<BadgeResponseData>(`${environment.apiUrl}/getSubordinateBadges`, {})
      .pipe(
        catchError((err) => this.handleError(err)),
        tap((result) => {
          this.cols = ColumnDefsModel.GetCachedColumnDefinition(this.gridType);
          this.width = this.cols.reduce((sum: number, c) => sum + c.width, 0);
          this.rows = result;
          this.unsubscribe = true;
        })
      );
  }

  // Get Badge list from backend based on Subordinant and status.
  getSubordinantBadgesByStatus(
    badgeStatus: number
  ): Observable<BadgeResponseData> {
    return this.http
      .post<BadgeResponseData>(
        `${environment.apiUrl}/getSubordinantBadgesByStatus`,
        {
          badgeStatus,
        }
      )
      .pipe(
        catchError((err) => this.handleError(err)),
        tap((result) => {
          this.cols = ColumnDefsModel.GetCachedColumnDefinition(this.gridType);
          this.width = this.cols.reduce((sum: number, c) => sum + c.width, 0);
          this.rows = result;
          this.unsubscribe = true;
        })
      );
  }

  getFoundAnalytes(): Observable<any> {
    return this.http
      .post<any>(`${environment.apiUrl}/getFoundAnalytesFromTokens`, {})
      .pipe(catchError((err) => this.handleError(err)));
  }

  // Get Analyzed Token Report from backend.
  getAnalyzedTokenData(): Observable<any> {
    return this.http
      .post<AnalyzedTokenResponseData>(
        `${environment.apiUrl}/getAnalyzedReports`,
        {}
      )
      .pipe(catchError((err) => this.handleError(err)));
  }

  // Get Analyzed Token Report from backend based on Analyte Cas Number.
  getAnalyzedTokenReportByCasNumber(casNumber: string): Observable<any> {
    return this.http
      .post<AnalyzedTokenResponseData>(
        `${environment.apiUrl}/getSpecificAnalyteFromTokens`,
        {
          casNum: casNumber,
        }
      )
      .pipe(catchError((err) => this.handleError(err)));
  }

  DataTableResponse(): Observable<DataTableResponseData> {
    this.unsubscribe = false;
    return this.http
      .post<DataTableResponseData>(`${environment.apiUrl}/data`, {})
      .pipe(
        catchError((err) => this.handleError(err)),
        tap((result) => {
          this.cols = ColumnDefsModel.GetCachedColumnDefinition(this.gridType);
          this.width = this.cols.reduce((sum: number, c) => sum + c.width, 0);
          this.height = 1000;
          this.rows = result;
          this.unsubscribe = true;
        })
      );
  }

  // Gets the tokens for the given Badge serial number.
  GetTokens(badgeSerialNumber: string): Observable<AnalyteResponseData> {
    return this.http
      .post(`${environment.apiUrl}/getTokens`, {
        badgeSerialNumber,
      })
      .pipe(catchError((err) => this.handleError(err)));
  }

  AnalyteResponse(): Observable<AnalyteResponseData> {
    this.unsubscribe = false;
    return this.http
      .post<AnalyteResponseData>(
        `${environment.apiUrl}/analyteExposureRatings`,
        {}
      )
      .pipe(
        catchError((err) => this.handleError(err)),
        tap((result) => {
          this.width = this.cols.reduce((sum: number, c) => sum + c.width, 0);
          this.rows = result;
        })
      );
  }

  SamplingRateResponse(): Observable<SamplingRateResponseData> {
    this.unsubscribe = false;
    return this.http
      .post<SamplingRateResponseData>(`${environment.apiUrl}/samplingRate`, {})
      .pipe(
        catchError((err) => this.handleError(err)),
        tap((result) => {
          this.unsubscribe = true;
        })
      );
  }

  createCustomGrid(): Observable<CustomResponseData> {
    return this.http.post<any>(`${environment.apiUrl}/customData`, {}).pipe(
      catchError((err) => this.handleError(err)),
      tap((result) => {
        this.cols = ColumnDefsModel.GetCachedColumnDefinition(this.gridType);
        this.width = this.cols.reduce((sum: number, c) => sum + c.width, 0);
        this.height = 1000;
        this.rows = result;
        this.unsubscribe = true;
      })
    );
  }

  // Return the column Definitions.
  getCols(): any {
    return this.cols;
  }

  // Set the column Definitions.
  setCols(values: any): void {
    this.cols = values;
  }

  // Return the Row Values.
  getRows(): any {
    return this.rows;
  }

  // Set the Row Values.
  setRows(values: any): void {
    this.rows = values;
  }

  // Return the Width.
  getWidth(): any {
    return this.width;
  }

  getHeight(): any {
    return this.height;
  }

  private getFramework(): any {
    let responseBadge = {
      id: any,
      assignedUser: any,
      batchGroup: any,
      dataId: any,
      badgeStatus: any,
      turnedInTime: any,
      ActivatedTime: any,
      NumberOfTokens: any,
    };

    responseBadge = {
      id: null,
      assignedUser: null,
      batchGroup: null,
      dataId: null,
      badgeStatus: null,
      turnedInTime: null,
      ActivatedTime: null,
      NumberOfTokens: null,
    };
    this.defaultFramework = responseBadge;
    this.response = [this.defaultFramework];
    return null;
  }
}
