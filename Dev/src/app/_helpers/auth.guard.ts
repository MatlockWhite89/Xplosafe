import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
  CanActivateChild,
} from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private router: Router,
    private loginService: LoginService,
    private userService: UserService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    console.debug(state.url);
    let ret = true;
    if (!this.loginService.isUserLoggedIn()) {
      console.debug(
        'There is no user logged in. Navigating to the login page.'
      );
      ret = false;
      this.router.navigateByUrl('/login').then(
        (r) => (value) => {
          if (!value) {
            throw Error(
              'Could not navigate to the login page, even though the user is not logged in.'
            );
          }
        },
        (reason) => {
          throw Error(
            'Navigating to the login page was actively rejected for the following reason: ' +
              reason
          );
        }
      );
    }

    if (ret && this.userService.userAuthToken === '') {
      console.debug(
        'There is a user logged in without an authorization token. Navigating to the login page.'
      );
      ret = false;
      this.router.navigateByUrl('/login').then(
        (value) => {
          if (!value) {
            throw Error(
              'Could not navigate to the login page to obtain an authorization token.'
            );
          }
        },
        (reason) => {
          throw Error(
            'Navigating to the login page was actively rejected for the following reason: ' +
              reason
          );
        }
      );
    }

    return ret;
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.userService.userAuthToken === '') {
      console.debug(
        'There is a user logged in without an authorization token.'
      );
      this.loginService.disconnectActiveUser();
    }

    return this.userService.userAuthToken !== '';
  }
}
