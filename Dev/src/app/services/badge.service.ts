import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { BadgeResponseData } from '../database/Models/database.model.badge';
import { UserService } from './user.service';
import { LoginService } from './login.service';
import { environment } from '../../environments/environment';
import { AnalyzedTokenResponseData } from '../database/Models/database.model.analyzedToken';
import { UserResponseData } from '../database/Models/database.model.user';
import { TokenStateResponse } from '../database/Models/database.model.tokenState';
import { TokenTypeResponse } from '../database/Models/database.mode.tokenType';

@Injectable()
export class BadgeService {
  constructor(
    private http: HttpClient,
    private userService: UserService,
    private loginService: LoginService
  ) {}

  // Handles any errors made from backend calls.
  handleError(errorRes: HttpErrorResponse): Observable<any> {
    this.loginService.setErrorCode(errorRes.status);
    if (errorRes.status === 401 && this.loginService.getLoggedInValue()) {
      // User Disconnected in backend we need to log the user out.
      this.logout();
    }
    return;
  }

  // Issue Badge.
  issueBadgeData(
    badgeSerialNumber: string,
    badgeStatus: number,
    selectedUser: string,
    issuedTime: string
  ): Observable<boolean> {
    return this.http
      .post<boolean>(`${environment.apiUrl}/issueBadge`, {
        badgeSerialNumber,
        badgeStatus,
        selectedUser,
        issuedTime,
      })
      .pipe(catchError((err) => this.handleError(err)));
  }

  // Get Usernames from backend.
  getUserList(): Observable<any> {
    const userId = this.userService.getActiveUser().userId;
    return this.http
      .get(`${environment.apiUrl}/getUsers` + userId)
      .pipe(catchError((err) => this.handleError(err)));
  }

  // Gets the selectedUser given the users Id.
  getSelectedUser(userId: number): Observable<any> {
    return this.http
      .post<boolean>(`${environment.apiUrl}/getSelectedUser`, {
        userId,
      })
      .pipe(catchError((err) => this.handleError(err)));
  }

  // Get Badge Serial Number list from backend based on Badge Status.
  getBadgeList(badgeStatus: number): Observable<any> {
    return this.http
      .post<BadgeResponseData>(`${environment.apiUrl}/getBadges`, {
        badgeStatus,
      })
      .pipe(catchError((err) => this.handleError(err)));
  }

  // Get Badge list from backend.
  getAllBadges(): Observable<any> {
    return this.http
      .post<BadgeResponseData>(`${environment.apiUrl}/badge`, {})
      .pipe(catchError((err) => this.handleError(err)));
  }

  // Get Badge Serial Number list from backend based on Badge Status.
  getWearerBadgeList(badgeStatus: number): Observable<any> {
    return this.http
      .post<BadgeResponseData>(
        `${environment.apiUrl}/getWearerBadgesByStatus`,
        {
          badgeStatus,
        }
      )
      .pipe(catchError((err) => this.handleError(err)));
  }

  // Get Badge Serial Number list from backend based on Badge Status.
  getSubordinantBadgeList(badgeStatus: number): Observable<any> {
    return this.http
      .post<BadgeResponseData>(
        `${environment.apiUrl}/getSubordinantBadgesByStatus`,
        {
          badgeStatus,
        }
      )
      .pipe(catchError((err) => this.handleError(err)));
  }

  // Returns an array of all locations from backend.
  getLocationList(): Observable<any> {
    const userId = this.userService.getActiveUser().userId;
    return this.http
      .get(`${environment.apiUrl}/getLocation` + userId)
      .pipe(catchError((err) => this.handleError(err)));
  }

  // Get the specific badge based on badge serial number.
  getBadge(badgeSerialNumber: string): Observable<any> {
    return this.http
      .post<BadgeResponseData>(`${environment.apiUrl}/getSpecificBadge`, {
        badgeSerialNumber,
      })
      .pipe(catchError((err) => this.handleError(err)));
  }

  // Gets the analyst that performed the analysis on a given badge.
  getAnalyst(badgeSerialNumber: string): Observable<any> {
    return this.http
      .post<UserResponseData>(`${environment.apiUrl}/getBadgeAnalyst`, {
        badgeSerialNumber,
      })
      .pipe(catchError((err) => this.handleError(err)));
  }

  // Get Badge list from backend based on Badge Status.
  getBadgeByStatus(badgeStatus: number): Observable<any> {
    return this.http
      .post<BadgeResponseData>(`${environment.apiUrl}/getBadgesByStatus`, {
        badgeStatus,
      })
      .pipe(catchError((err) => this.handleError(err)));
  }

  // Get the token States.
  getTokenStates(): Observable<any> {
    return this.http
      .post<TokenStateResponse>(`${environment.apiUrl}/getTokenStates`, {})
      .pipe(catchError((err) => this.handleError(err)));
  }

  // Get the token Types.
  getTokenTypes(): Observable<any> {
    return this.http
      .post<TokenTypeResponse>(`${environment.apiUrl}/getTokenTypes`, {})
      .pipe(catchError((err) => this.handleError(err)));
  }

  // Update the Token Information.
  updateToken(
    tokenState: string,
    tokenType: string,
    badgeSerialNumber: string,
    tubeNumber: string
  ): Observable<any> {
    return this.http
      .post<any>(`${environment.apiUrl}/updateToken`, {
        tokenType,
        tokenState,
        badgeSerialNumber,
        tubeNumber,
      })
      .pipe(catchError((err) => this.handleError(err)));
  }

  // Add the Target Analyte to the Database.
  addTargetAnalyte(
    badgeSerialNumber: string,
    tubeNumber: string,
    targetCasNumber: string,
    targetName: string,
    tokenType: string
  ): Observable<any> {
    return this.http
      .post<any>(`${environment.apiUrl}/addTargetAnalyte`, {
        badgeSerialNumber,
        tubeNumber,
        targetCasNumber,
        targetName,
        tokenType,
      })
      .pipe(catchError((err) => this.handleError(err)));
  }

  // Get Analyzed Token Reports from backend based on Badge Serial Number and optionally token id.
  getAnalyzedTokenReportResponse(
    badgeSerialNumber: string,
    // tslint:disable-next-line:variable-name
    token_id?: number
  ): Observable<any> {
    return this.http
      .post<AnalyzedTokenResponseData>(
        `${environment.apiUrl}/getAnalyzedReports`,
        {
          badgeSerialNumber,
          token_id,
        }
      )
      .pipe(catchError((err) => this.handleError(err)));
  }

  // Turn in Badge.
  turnInBadgeData(
    badgeSerialNumber: string,
    activatedTime: string,
    turnedInTime: string,
    celsiusTemp: string,
    fahrenheitTemp: string,
    vaporsExposed: string,
    relativeHumidity: string,
    notes: string
  ): Observable<boolean> {
    return this.http
      .post<boolean>(`${environment.apiUrl}/turnInBadge`, {
        badgeSerialNumber,
        activatedTime,
        turnedInTime,
        celsiusTemp,
        fahrenheitTemp,
        vaporsExposed,
        relativeHumidity,
        notes,
      })
      .pipe(catchError((err) => this.handleError(err)));
  }

  // Add new Badge.
  addBadgeData(
    badgeSerialNumber: string,
    dataId: number,
    assignedUser: string,
    badgeStatus: number,
    activatedTime: string,
    turnedInTime: string,
    batchGroup: string,
    numberOfTokens: number,
    expirationDate: string
  ): Observable<any> {
    return this.http
      .post<BadgeResponseData>(`${environment.apiUrl}/addBadge`, {
        badgeSerialNumber,
        dataId,
        assignedUser,
        badgeStatus,
        activatedTime,
        turnedInTime,
        batchGroup,
        numberOfTokens,
        expirationDate,
      })
      .pipe(
        catchError((err) => this.handleError(err)),
        tap((resData) => {
          console.log(resData);
        })
      );
  }

  // Edit Badge.
  editBadgeData(
    badgeSerialNumber: string,
    assignedUser: string,
    badgeStatus: number,
    activatedTime: string,
    turnedInTime: string,
    temperatureCelsius: string,
    temperatureFahrenheit: string,
    relativeHumidity: string,
    vaporsExposed: string,
    notes: string,
    badgeId: number
  ): Observable<any> {
    return this.http
      .post<BadgeResponseData>(`${environment.apiUrl}/editBadge`, {
        badgeSerialNumber,
        assignedUser,
        badgeStatus,
        activatedTime,
        turnedInTime,
        temperatureCelsius,
        temperatureFahrenheit,
        vaporsExposed,
        relativeHumidity,
        notes,
        badgeId,
      })
      .pipe(
        catchError((err) => this.handleError(err)),
        tap((resData) => {
          console.log(resData);
        })
      );
  }

  // Remove Badge.
  removeBadgeData(badgeSerialNumber: string, badgeId: number): Observable<any> {
    return this.http
      .post<any>(`${environment.apiUrl}/removeBadge`, {
        badgeSerialNumber,
        badgeId,
      })
      .pipe(
        catchError((err) => this.handleError(err)),
        tap((resData) => {
          console.log(resData);
        })
      );
  }

  // Backend Forced Logout.
  logout(): void {
    this.loginService.backendForceLogout();
  }
}
