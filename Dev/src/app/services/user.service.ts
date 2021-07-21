import { Injectable } from '@angular/core';
import { User } from '../shared/user.model';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { NavRoute } from '../shared/nav-route.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { UserResponseData } from '../database/Models/database.model.user';
import { environment } from '../../environments/environment';
import {
  NothingToUpdate,
  OkPacket,
  PasswordMismatch,
} from '../shared/okPacket';
import { ModalWindowService } from './modal-window.service';
import { LocationResponseData } from '../database/Models/database.model.location';

@Injectable()
export class UserService {
  private readonly activeUser: BehaviorSubject<User>;
  public activeUser$: Observable<User>;
  private authTokenName: string;
  private manager: UserResponseData;
  constructor(
    private httpClient: HttpClient,
    private modalService: ModalWindowService
  ) {
    this.activeUser = new BehaviorSubject<User>(new User());
    this.activeUser$ = this.activeUser.asObservable();
    this.authTokenName = '';
    this.manager = null;
  }

  public get userValue(): User {
    return this.activeUser.value;
  }

  public get userAuthToken(): string {
    const authToken = sessionStorage.getItem(this.authTokenName);
    return authToken ?? '';
  }

  public set userAuthToken(encodedToken: string) {
    this.authTokenName = encodedToken.split('.')[0];
    sessionStorage.setItem(this.authTokenName, encodedToken);
  }

  public handleError(errorRes: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'DB_CONNECTION_ERROR':
        errorMessage =
          'There was an error attempting to connect to the database.';
        break;
      case 'DATA_NOT_FOUND':
        errorMessage = 'This username does not exist.';
        break;
    }
    return throwError(errorMessage);
  }

  updateActiveUser(newUser: User): void {
    this.activeUser.next(newUser);
  }

  setActiveUser(
    role: number,
    locationId: number,
    userId: number,
    group: number,
    username: string,
    accountLocked: boolean,
    passwordExpiredDate: any,
    maintenanceTime: any,
    maintenanceEndTime: any,
    routes: Array<NavRoute>,
    loginAttemptExceeded: boolean
  ): void {
    this.activeUser.next(
      new User(
        userId,
        role,
        group,
        locationId,
        username,
        accountLocked,
        passwordExpiredDate,
        maintenanceTime,
        maintenanceEndTime,
        routes,
        loginAttemptExceeded
      )
    );
    console.log(this.activeUser);
    if (this.activeUser && this.activeUser.value.group) {
      this.getActiveUserManager().subscribe((value) => {
        if (value) {
          this.manager = value;
        }
      });
    }
  }

  // The Manager of the Assigned User.
  getManager(): UserResponseData {
    return this.manager;
  }

  disconnectActiveUser(): void {
    if (this.authTokenName !== '') {
      sessionStorage.removeItem(this.authTokenName);
      this.authTokenName = '';
    }
    this.activeUser.next(new User());
  }

  getActiveUser(): User {
    return this.activeUser.value;
  }

  // Gets The Manager of the Assigned User.
  getActiveUserManager(): Observable<UserResponseData> {
    return this.httpClient
      .get<UserResponseData>(
        `${environment.apiUrl}/getManager/` + this.activeUser.value.group
      )
      .pipe(catchError((err) => this.handleError(err)));
  }

  getSubordinates(): Observable<UserResponseData> {
    return this.httpClient
      .get<UserResponseData>(
        `${environment.apiUrl}/getSubordinates/` + this.activeUser.value.userId
      )
      .pipe(
        catchError((err) =>
          this.handleSubordinateFailure<UserResponseData>(err)
        )
      );
  }

  getSelectedUser(userId: number): Observable<any> {
    return this.httpClient
      .post<boolean>(`${environment.apiUrl}/getSelectedUser`, {
        userId,
      })
      .pipe(catchError((err) => this.handleError(err)));
  }

  UpdateUser(userToUpdate: any): Observable<any> {
    return this.httpClient
      .post<boolean>(`${environment.apiUrl}/updateUser`, {
        updatedUsername: userToUpdate.username,
        userRole: userToUpdate.role,
        userGroupId: userToUpdate.group_id,
        userLocationId: userToUpdate.location_id,
        userId: userToUpdate.id,
      })
      .pipe(catchError((err) => this.handleError(err)));
  }

  changeUserGroup(
    selectedUserId: number,
    userGroupId: number
  ): Observable<any> {
    return this.httpClient
      .post<boolean>(`${environment.apiUrl}/updateUserGroup`, {
        group_id: userGroupId,
        userId: selectedUserId,
      })
      .pipe(catchError((err) => this.handleError(err)));
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

  updateSubordinateInfo(userToUpdate: any): Observable<OkPacket> {
    // PUT all values of this "userToUpdate" and let the backend determine whether or not to include them in the update query.
    return this.httpClient
      .put<OkPacket>(`${environment.apiUrl}/users/${userToUpdate.id}`, {
        updatedUsername: undefined,
        updatedRole: userToUpdate.role,
        updatedPassword: userToUpdate.password,
        updatedGroup: userToUpdate.group_id,
        updatedLocation: userToUpdate.location_id,
        updatedAccountLock: userToUpdate.account_locked,
        subordinateId: userToUpdate.id,
      })
      .pipe(catchError((err) => this.handleError(err)));
  }

  addLocationData(
    city: string,
    state: string,
    country: string,
    base: string
  ): Observable<any> {
    return this.httpClient
      .post<LocationResponseData>(`${environment.apiUrl}/addLocation`, {
        cityValue: city,
        stateValue: state,
        countryValue: country,
        baseValue: base,
      })
      .pipe(
        catchError((err) => this.handleError(err)),
        tap((resData) => {
          console.log(resData);
        })
      );
  }

  updateLocationData(
    id: number,
    city: string,
    state: string,
    country: string,
    base: string
  ): Observable<any> {
    return this.httpClient
      .post<LocationResponseData>(`${environment.apiUrl}/updateLocation`, {
        idValue: id,
        cityValue: city,
        stateValue: state,
        countryValue: country,
        baseValue: base,
      })
      .pipe(
        catchError((err) => this.handleError(err)),
        tap((value) => {
          console.log('Reached the End');
        })
      );
  }

  updateAccountInfo(formGroupValue: any): Observable<OkPacket> {
    let { userName, newPassword, passwordConfirmation } = formGroupValue;
    if (newPassword === '') {
      newPassword = undefined;
    }
    if (passwordConfirmation === '') {
      passwordConfirmation = undefined;
    }
    if (!userName || userName === '') {
      userName = this.userValue.username;
    }

    // Check if the user is updating their password by:
    // - 1) Check if the passwords were even supplied.
    // - 2) Check to see if the passwords match.
    // - 2a) If they do not match, immediately return false to have the user fix the error.
    if (newPassword) {
      if (passwordConfirmation) {
        if (newPassword !== passwordConfirmation) {
          return of<OkPacket>(new PasswordMismatch());
        }
      } else {
        return of<OkPacket>(new PasswordMismatch());
      }
    }

    // The user is attempting to only update their username, compare with the existing username value
    // and if they already match, simply return true and don't bother the backend/database.
    if (newPassword === undefined) {
      if (userName === this.userValue.username) {
        return of<OkPacket>(new NothingToUpdate());
      }
    }

    // All relevant checks have been validated. Send PUT request to the backend for username/password updates.
    return this.httpClient
      .put<OkPacket>(`${environment.apiUrl}/users/${this.userValue.userId}`, {
        updatedUsername: userName,
        updatedPassword: newPassword,
      })
      .pipe(catchError((err) => this.handleError(err)));
  }
}
