import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { OkPacket } from '../../../shared/okPacket';

@Component({
  selector: 'app-account-management',
  templateUrl: './account-management.component.html',
  styleUrls: ['./account-management.component.css'],
})
export class AccountManagementComponent implements OnInit {
  accountInformation = new FormGroup({
    userName: new FormControl('', { updateOn: 'change' }),
    newPassword: new FormControl('', { updateOn: 'change' }),
    passwordConfirmation: new FormControl('', { updateOn: 'change' }),
  });
  cssUserFeedback: string;
  userFeedback: string;

  constructor(private userService: UserService) {
    this.userFeedback = '';
    this.cssUserFeedback = '';
  }

  /*
   * Gets the username stored in the account information form group.
   * */
  get cachedUsername(): string {
    return this.accountInformation.get('userName').value as string;
  }

  /*
   * Tied into a button click event.
   * Based off the response from the backend, sets a field bound to an ngClass directive and another field for user feedback.
   * */
  updateInfo(): void {
    this.userService.updateAccountInfo(this.accountInformation.value).subscribe(
      (value: OkPacket) => {
        if (value.affectedRows === 1 && value.changedRows === 1) {
          this.userFeedback = 'Account information updated successfully.';
          this.cssUserFeedback = 'success';
          const currentUser = this.userService.userValue;
          if (currentUser.username.valueOf() !== this.cachedUsername) {
            currentUser.username = this.cachedUsername;
            this.userService.updateActiveUser(currentUser);
          }
        } else if (value.affectedRows === 0 && value.changedRows === 1) {
          this.userFeedback =
            'Something went wrong here. Please try again later.';
          this.cssUserFeedback = 'fail';
        } else {
          this.userFeedback = value.message;
          this.cssUserFeedback = 'fail';
        }
      },
      (error) => {
        this.userFeedback =
          'We have encountered an error while attempting to process your request.';
        console.warn(error);
        this.cssUserFeedback = 'fail';
      },
      () => {
        this.resetInfo();
      }
    );
  }

  ngOnInit(): void {
    this.userService.activeUser$.subscribe(
      (value) => {
        this.setCurrentUser(value);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  /*
   * Tied to a reset button click event.
   * */
  resetInfo(): void {
    this.setCurrentUser(this.userService.userValue);
  }

  /*
   * Updates the account information form group with a user's username.
   *  */
  private setCurrentUser(user?): void {
    this.accountInformation.reset({
      userName: user?.username,
      newPassword: '',
      passwordConfirmation: '',
    });
  }

  /*
   * Resets the feedback to the user upon completion of backend api call.
   * */
  resetFeedback(): void {
    this.userFeedback = '';
  }
}
