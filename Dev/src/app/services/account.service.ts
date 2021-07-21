import { Injectable } from '@angular/core';
import { User } from '../shared/user.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { UserService } from './user.service';
import { LoginService } from './login.service';
import { environment } from '../../environments/environment';
import { ModalWindowService } from './modal-window.service';

@Injectable()
export class AccountService {
  activeUser: User;
  lockedAccounts = new BehaviorSubject<any>(null);
  unlockedAccounts = new BehaviorSubject<any>(null);

  constructor(
    private httpClient: HttpClient,
    private userService: UserService,
    private loginService: LoginService,
    private modalService: ModalWindowService
  ) {
    this.activeUser = this.userService.getActiveUser();
  }

  public handleError(errorRes: HttpErrorResponse): Observable<any> {
    this.loginService.setErrorCode(errorRes.status);
    if (errorRes.status === 401 && this.loginService.getLoggedInValue()) {
      // User Disconnected in backend we need to log the user out.
      this.logout();
    }
    return;
  }

  unlockAccount(userId: number): void {
    this.httpClient
      .post(`${environment.apiUrl}/unlockAccount`, {
        lockedAccountId: userId,
      })
      .subscribe(
        (value) => {
          this.lockedAccounts.next(value);
        },
        (badgesError) => {
          console.log(badgesError);
          this.handleError(badgesError);
        },
        () => {
          this.modalService.setModalContext('User Account has been unlocked');
          this.getLockedAccounts();
          this.getUnLockedAccounts();
        }
      );
  }

  lockAccount(userId: number): void {
    this.httpClient
      .post(`${environment.apiUrl}/lockAccount`, {
        lockedAccountId: userId,
      })
      .subscribe(
        (value) => {
          this.unlockedAccounts.next(value);
        },
        (lockError) => {
          console.log('From lockAccount(number):' + lockError);
          this.handleError(lockError);
        },
        () => {
          this.modalService.setModalContext('User Account has been Locked');
          this.getLockedAccounts();
          this.getUnLockedAccounts();
        }
      );
  }

  getLockedAccounts(): void {
    const userId = this.userService.getActiveUser().userId;
    this.httpClient
      .get(`${environment.apiUrl}/getLockedAccounts` + userId)
      .subscribe(
        (value) => {
          this.lockedAccounts.next(value);
        },
        (usersError) => {
          this.handleError(usersError);
        },
        () => {}
      );
  }

  getUnLockedAccounts(): void {
    const userId = this.userService.getActiveUser().userId;
    this.httpClient
      .get(`${environment.apiUrl}/getUnLockedAccounts` + userId)
      .subscribe(
        (value) => {
          this.unlockedAccounts.next(value);
        },
        (usersError) => {
          this.handleError(usersError);
        },
        () => {}
      );
  }

  logout(): void {
    this.loginService.backendForceLogout();
  }
}
