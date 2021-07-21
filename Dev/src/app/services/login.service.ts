import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { DEFAULT_INTERRUPTSOURCES, Idle } from '@ng-idle/core';
import { roleEnum } from '../component_providers/shared/Enums/role.enum';
import { environment } from '../../environments/environment';
import { OkPacket } from '../shared/okPacket';
import {
  AuthResponseData,
  DefaultResponse,
  HIPAABannerResponse,
  WarningBannerResponse,
} from '../shared/auth-response.model';
import { ModalWindowService } from './modal-window.service';

@Injectable()
export class LoginService {
  maintenanceTime: string;
  maintenanceEndTime: string;
  errorCode: number;
  returnUrl: string;
  maintTime = new BehaviorSubject<string>(null);
  maintEndTime = new BehaviorSubject<string>(null);
  logoutEvent = new BehaviorSubject<boolean>(false);
  ipAddress: string;

  private defaultAuthUser: AuthResponseData;

  constructor(
    private httpClient: HttpClient,
    private userService: UserService,
    private router: Router,
    private idle: Idle,
    private modalService: ModalWindowService
  ) {
    this.maintenanceTime = null;
    this.errorCode = 0;

    this.defaultAuthUser = new DefaultResponse();
    this.populateDefaultAuthUserValues();
  }

  isLoggedIn = false;
  private readonly authDefaultResponse = DefaultResponse.getResponse();
  authUser = new BehaviorSubject<AuthResponseData>(this.authDefaultResponse);

  private static handleError(errorRes: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (errorRes.status === 504) {
      errorMessage =
        'The user account has exceeded the maximum login attempt threshold limit account has been locked.';
      return throwError(errorMessage);
    }
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'DB_CONNECTION_ERROR':
        errorMessage =
          'There was an error attempting to connect to the database.';
        break;
      case 'USERNAME_NOT_FOUND':
        errorMessage = 'This username does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.';
        break;
      case 'MAINTENANCE':
        errorMessage = 'The Site is currently under maintenance.';
        break;
      case 'LOCKED':
        errorMessage =
          'The user account has been locked. Contact your administrator.';
        break;
      case 'LOGIN_EXCEEDED_THRESHOLD_LIMIT':
        errorMessage =
          'The user account has exceeded the maximum login attempt threshold limit account has been locked.';
        break;
    }
    return throwError(errorMessage);
  }

  getLoggedInValue(): boolean {
    return this.isLoggedIn;
  }

  getErrorCode(): number {
    return this.errorCode;
  }

  getReturnUrl(): string {
    return this.returnUrl;
  }

  setErrorCode(value: number): void {
    this.errorCode = value;
    if (this.errorCode > 399) {
      if (this.errorCode === 401){
        this.modalService.setModalContext('Unauthorized Attempt');
        this.logout();
      }
      this.returnUrl = this.router.url;
      this.router.navigate(['/not-found']);
    }
  }

  // Sets the initial Values for the Auth User.
  private populateDefaultAuthUserValues(): void {
    this.defaultAuthUser.userId = 0;
    this.defaultAuthUser.role = 0;
    this.defaultAuthUser.group = 0;
    this.defaultAuthUser.locationId = 0;
    this.defaultAuthUser.username = null;
    this.defaultAuthUser.hippaFlag = false;
    this.defaultAuthUser.governmentFlag = false;
    this.defaultAuthUser.accountLocked = false;
    this.defaultAuthUser.passwordExpiredDate = null;
    this.defaultAuthUser.maintenanceTime = null;
    this.defaultAuthUser.maintenanceEndTime = null;
    this.defaultAuthUser.routes = [];
    this.defaultAuthUser.loginAttemptExceeded = false;
    this.defaultAuthUser.jwt = null;
  }

  // Called in login.component.ts when its "Login" button is clicked.
  checkCredentials(usernameEntered: string, passwordEntered: string): void {
    this.populateDefaultAuthUserValues();
    this.defaultAuthUser.hippaFlag = true;
    this.defaultAuthUser.governmentFlag = true;
    this.httpClient
      .post<AuthResponseData>(`${environment.apiUrl}/auth`, {
        username: usernameEntered,
        password: passwordEntered,
      })
      .pipe(catchError(LoginService.handleError))
      .subscribe(
        (data) => {
          const {
            role,
            group,
            location_id,
            id,
            username,
            account_locked,
            date_password_expires,
            routes,
            jwt,
            login_threshold_exceeded,
          } = data[0];
          this.defaultAuthUser.userId = id;
          this.defaultAuthUser.username = username;
          this.defaultAuthUser.role = role;
          this.defaultAuthUser.group = group;
          this.defaultAuthUser.locationId = location_id;
          this.defaultAuthUser.accountLocked = account_locked;
          this.defaultAuthUser.passwordExpiredDate = date_password_expires;
          this.defaultAuthUser.routes = routes;
          this.defaultAuthUser.jwt = jwt;
          this.defaultAuthUser.loginAttemptExceeded = login_threshold_exceeded;
          this.handleAuthentication(this.defaultAuthUser);
        },
        (haltingError) => {
          console.warn(haltingError);
          if (
            haltingError ===
            'The user account has exceeded the maximum login attempt threshold limit account has been locked.'
          ) {
            this.defaultAuthUser.loginAttemptExceeded = true;
            this.defaultAuthUser.accountLocked = true;
            this.authUser.next(this.defaultAuthUser);
          }

          this.setErrorCode(haltingError.status);
          this.handleAuthentication(undefined);
        }
      );
  }

  changeCredentials(newPassword: string): void {
    this.httpClient
      .put<OkPacket>(`${environment.apiUrl}/auth`, {
        userId: this.authUser.value.userId,
        newPassword,
      })
      .pipe(catchError(LoginService.handleError))
      .subscribe((value) => {
        if (value.affectedRows === 1 && value.changedRows === 1) {
          this.defaultAuthUser.userId = -1;
          this.defaultAuthUser.hippaFlag = true;
          this.defaultAuthUser.governmentFlag = true;
          this.authUser.next(this.defaultAuthUser);
        }
      });
  }

  // Called when the user clicks accept on the government warning banner.
  acceptGovernmentWarning(): void {
    this.authUser.next(WarningBannerResponse.getResponse());
  }

  // Called when the user clicks accept on the HIPAA Agreement banner.
  acceptHippaAgreement(): void {
    this.authUser.next(HIPAABannerResponse.getResponse());
  }

  // Sets the maintenance time.
  setMaintValue(value: string): void {
    this.maintenanceTime = value;
    this.maintTime.next(this.maintenanceTime);
  }

  // Sets the end of the maintenance time.
  setMaintEndTimeValue(value: string): void {
    this.maintenanceEndTime = value;
    this.maintEndTime.next(this.maintenanceEndTime);
  }

  // Sets the maintenance time.
  backendLogOut(): Observable<boolean> {
    return this.httpClient
      .post<boolean>(`${environment.apiUrl}/logout`, {})
      .pipe(catchError(LoginService.handleError));
  }

  // Disconnects the Current Active User.
  disconnectActiveUser(): void {
    this.backendLogOut().subscribe();
    this.router.navigate(['/login']).then(() => {
      this.setLoggedIn(false);
      this.authUser.next(this.authDefaultResponse);
      this.userService.disconnectActiveUser();
      this.idle.stop();
    });
    this.logoutEvent.next(true);
  }

  // Sets the logged in status of the user.
  private setLoggedIn(status: boolean): void {
    if (this.isLoggedIn !== status) {
      console.log(`isLoggedIn changing from ${this.isLoggedIn} to ${status}.`);
      this.isLoggedIn = status;
    }
  }

  // Conversion tool used for time.
  private ConvertTimeMilliseconds(
    scheduledMaintenance: number,
    interval: number
  ): number {
    const elapsedTime = interval * 3600000;
    return scheduledMaintenance + elapsedTime;
  }

  // Login Authentication logic.
  private handleAuthentication(resData: AuthResponseData): void {
    if (resData === undefined) {
      this.setLoggedIn(false);
      this.defaultAuthUser.userId = 0;
      this.authUser.next(this.defaultAuthUser);
      return;
    }

    if (
      this.defaultAuthUser.loginAttemptExceeded ||
      this.defaultAuthUser.accountLocked
    ) {
      this.setLoggedIn(false);
      this.defaultAuthUser.userId = 0;
      this.authUser.next(this.defaultAuthUser);
      return;
    }

    const hasPasswordExpired =
      new Date(this.defaultAuthUser.passwordExpiredDate).valueOf() <
      Date.now().valueOf();
    if (hasPasswordExpired) {
      this.setLoggedIn(false);
      this.authUser.next(this.defaultAuthUser);
      return;
    }

    if (
      this.defaultAuthUser.role !== 8 &&
      this.defaultAuthUser.role !== 6 &&
      this.maintenanceTime !== null
    ) {
      const scheduledMaintenance = Date.parse(this.maintenanceTime);
      const currentTime = Date.now();
      const maintenanceUpcomingTimeMilliseconds = this.ConvertTimeMilliseconds(
        scheduledMaintenance,
        -2
      );
      if (currentTime > scheduledMaintenance) {
        if (this.maintenanceEndTime === null) {
          this.modalService.setModalContext(
            'The site is now currently under Maintenance.'
          );
        } else {
          this.modalService.setModalContext(
            'The Site is currently under maintenance until: ' +
              this.maintenanceEndTime
          );
        }
        this.setLoggedIn(false);
        this.defaultAuthUser.userId = 0;
        this.defaultAuthUser.maintenanceTime = this.maintenanceTime;
        this.authUser.next(this.defaultAuthUser);
        return;
      } else if (currentTime > maintenanceUpcomingTimeMilliseconds) {
        this.modalService.setModalContext(
          'Site will be undergoing Maintenance at: (' +
            this.maintenanceTime +
            ')'
        );
      }
    }
    this.setLoggedIn(true);
    this.userService.userAuthToken = this.defaultAuthUser.jwt;
    this.userService.setActiveUser(
      this.defaultAuthUser.role,
      this.defaultAuthUser.locationId,
      this.defaultAuthUser.userId,
      this.defaultAuthUser.group,
      this.defaultAuthUser.username,
      this.defaultAuthUser.accountLocked,
      this.defaultAuthUser.passwordExpiredDate,
      this.maintenanceTime,
      this.maintenanceEndTime,
      this.defaultAuthUser.routes,
      this.defaultAuthUser.loginAttemptExceeded
    );

    this.authUser.next(this.defaultAuthUser);
    this.autoLogout(10, 15 * 60);
  }

  // Sets the maintenance time and displays.
  setMaintenanceLogOut(startTime: number, endTime: number): void {
    const timeoutTime = endTime - startTime;
    setTimeout(() => this.maintenanceLogout(), timeoutTime);
  }

  // Logs the user out after a certain period of inactivity.
  autoLogout(lengthOfAllowableIdle: number, inactivityTimeout: number): void {
    this.idle.setIdle(lengthOfAllowableIdle);
    this.idle.setTimeout(inactivityTimeout);
    this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
    this.idle.onTimeout.pipe(first()).subscribe(
      () => this.logout(),
      (error) => console.error(error)
    );
    this.idle.watch();
  }

  // Returns the Maintenance time from the Database.
  getMaintenanceTime(): Observable<string> {
    return this.httpClient
      .get<string>(`${environment.apiUrl}/maintenance`)
      .pipe(catchError(LoginService.handleError));
  }

  // Scheduling Maintenance logic.
  scheduleMaintenance(
    maintenanceTime: string,
    maintenanceEndTime: string
  ): Observable<boolean> {
    console.log({
      scheduledTime: maintenanceTime,
      endTime: maintenanceEndTime,
    });
    const params = new HttpParams()
      .set('maintenanceTime', maintenanceTime)
      .set('maintenanceEndTime', maintenanceEndTime);
    return this.httpClient
      .put<boolean>(`${environment.apiUrl}/maintenance`, { params })
      .pipe(catchError(LoginService.handleError));
  }

  // Logout functionality from the server to force the user to be logged out.
  backendForceLogout(): void {
    this.router.navigate(['/login']).then(() => {
      this.setLoggedIn(false);
      this.authUser.next(this.authDefaultResponse);
      this.userService.disconnectActiveUser();
      this.idle.stop();
    });
  }

  // Normal Logout functionality.
  logout(): void {
    console.log('Disconnecting active user.');
    this.disconnectActiveUser();
  }

  // Maintenance logout functionality.
  maintenanceLogout(): void {
    if (!this.isLoggedIn) {
      return;
    }
    const user = this.userService.getActiveUser();
    // dont log out developers or administrators
    this.setMaintEndTimeValue(this.maintenanceEndTime);
    this.setMaintValue(this.maintenanceTime);
    if (
      user !== undefined &&
      user !== null &&
      (user.role === roleEnum.developer || user.role === roleEnum.administrator)
    ) {
      return;
    }
    this.disconnectActiveUser();
  }

  // Returns the value that determines if the user is currently logged in.
  isUserLoggedIn(): boolean {
    return this.isLoggedIn;
  }
}
