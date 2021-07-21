import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginAttempted = false;
  isWaiting = false;
  error = '';
  maintenance = null;
  maintenanceEndTime = null;
  hippaFlag = false;
  governmentFlag = false;
  private authUserSub: Subscription;
  password: string;
  username: string;
  maintenanceText: string;
  newPassword: string;
  confirmPassword: string;
  passwordIsExpired: boolean;
  buttonText: string;
  constructor(private loginService: LoginService, private router: Router) {
    this.passwordIsExpired = false;
    this.buttonText = 'Login';
  }

  ngOnInit(): void {
    this.authUserSub = this.loginService.authUser.subscribe(
      (data) => {
        this.isWaiting = false; // This is a callback so obviously we are not waiting anymore.
        if (data && data?.userId < 0 && this.passwordIsExpired) {
          this.passwordIsExpired = false;
          this.error =
            'Successfully updated your password! Please log in again.';
          this.confirmPassword = this.newPassword = this.password = '';
          this.buttonText = 'Login';
          return;
        }
        this.hippaFlag = data.hippaFlag;
        this.governmentFlag = data.governmentFlag;
        if (data?.userId === undefined || data?.userId < 0) {
          this.error = this.username = this.password = '';
        } else if (data?.userId === 0) {
          this.error = '';
          if (data.maintenanceTime !== null) {
            this.error = `The server is currently under maintenance`;
          } else if (data?.loginAttemptExceeded) {
            this.error = 'The user account has exceeded the maximum login attempt threshold limit account has been locked.';
          } else if (data?.accountLocked) {
            this.error = `The user account has been locked. Contact your administrator.`;
          }
          else {
            this.error = `The credentials entered were either incorrect or not found. Please try again.`;
          }
          console.log(this.error);
          this.loginAttempted = true;
          this.password = '';
        } else if (this.isPasswordExpired(data?.passwordExpiredDate, 0)) {
          // tslint:disable-next-line:no-console
          console.debug('Password is expired.');
          this.passwordIsExpired = true;
          this.password = '';
          this.error = 'Password has expired. Update password to login.';
          this.buttonText = 'Update Password';
        } else {
          this.navigateIntoSite('home');
        }
      },
      (haltingError) => {
        console.warn(haltingError.message);
        if (haltingError.status === 504){
          this.error = 'The user account has exceeded the maximum login attempt threshold limit account has been locked.';
        }
        this.buttonText = 'Login';
        this.hippaFlag = false;
        this.governmentFlag = false;
        this.isWaiting = false;
      },
      () => {
        this.isWaiting = false;
      }
    );
  }

  private navigateIntoSite(url: string): void {
    this.router.navigate([url]).then(() => this.authUserSub.unsubscribe());
  }

  isPasswordExpired(
    passwordExpirationDate: Date | string | null | undefined,
    additionalDays: number = 0
  ): boolean {
    if (typeof passwordExpirationDate === 'undefined') {
      return false;
    }

    if (typeof passwordExpirationDate === 'string') {
      passwordExpirationDate = new Date(passwordExpirationDate);
    }

    return (
      passwordExpirationDate.valueOf() + additionalDays < Date.now().valueOf()
    );
  }

  showGovernmentWarning(): boolean {
    return this.governmentFlag !== true;
  }

  showHipaaAgreement(): boolean {
    return this.governmentFlag && this.hippaFlag !== true;
  }

  showLoginForm(): boolean {
    return this.governmentFlag && this.hippaFlag;
  }

  onLogin(): void {
    this.isWaiting = true;
    if (this.passwordIsExpired) {
      if (this.password === this.newPassword) {
        this.error =
          'New password cannot be the same as your previous password.';
        this.password = this.newPassword = this.confirmPassword = '';
        return;
      } else if (this.newPassword !== this.confirmPassword) {
        this.error = 'New password mismatch. Please enter your new password.';
        this.password = this.newPassword = this.confirmPassword = '';
        return;
      } else if (this.newPassword.length < 1) {
        this.error = 'Please enter a new password.';
        this.password = this.newPassword = this.confirmPassword = '';
        return;
      } else if (this.confirmPassword.length < 1) {
        this.error =
          'Confirm password mismatch. Please reconfirm your new password.';
        this.password = this.newPassword = this.confirmPassword = '';
        return;
      } else {
        this.loginService.changeCredentials(this.newPassword);
      }
    } else {
      this.loginService.checkCredentials(this.username, this.password);
    }
  }

  resetErrorText(): void {
    // Doesn't reset the text automatically when the password is expired.
    if (!this.passwordIsExpired) {
      this.error = '';
    }
  }

  ngOnDestroy(): void {
    this.authUserSub.unsubscribe();
  }
}
