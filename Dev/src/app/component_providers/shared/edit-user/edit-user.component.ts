import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { GridService } from '../../../services/agGrid.service';
import { User } from '../../../database/Models/database.model.user';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { ModalWindowService } from '../../../services/modal-window.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit, OnDestroy {
  private editUserForm: BehaviorSubject<FormGroup>;
  private userToUpdate: User;
  private subscription: Subscription;
  editUserFormContext = new FormGroup({
    userName: new FormControl(''),
    newPassword: new FormControl(''),
    locationId: new FormControl(0),
    accountLocked: new FormControl(0),
    roleId: new FormControl(0),
    groupId: new FormControl(0),
  });
  cssWrapperOverrideValue: string;
  cssNavOverrideValue: string;
  groups$: Observable<any>;
  roles$: Observable<any>;
  locations$: Observable<any>;
  cssUserFeedback: string;
  userFeedback: string;

  constructor(
    private userService: UserService,
    private gridService: GridService,
    private modalWindowService: ModalWindowService
  ) {
    this.cssWrapperOverrideValue = 'override-wrapper-edit-user';
    this.userFeedback = '';
    this.cssUserFeedback = '';
    this.editUserForm = new BehaviorSubject(this.editUserFormContext);
    this.subscription = new Subscription();
    this.groups$ = this.gridService.groups.asObservable();
    this.locations$ = this.gridService.locations.asObservable();
    this.roles$ = this.gridService.roles.asObservable();
    this.userToUpdate = null;
  }

  get formContext(): FormGroup {
    return this.editUserForm.getValue();
  }

  get lockStatus(): boolean {
    return this.formContext.get('accountLocked').value;
  }

  set lockStatus(value: boolean) {
    this.formContext.get('accountLocked').setValue(value);
  }

  get userName(): string {
    return this.userToUpdate?.username ?? '';
  }

  get currentLocation(): number | null {
    return this.userToUpdate?.location_id;
  }

  get currentRole(): number | null {
    return this.userToUpdate?.role;
  }

  get currentGroup(): number | string {
    return this.userToUpdate?.group_id ?? '';
  }

  get userSelected(): boolean {
    return this.userToUpdate !== null;
  }

  get createdOn(): string {
    return this.userToUpdate?.date_created ?? '';
  }

  get updatedOn(): string {
    return this.userToUpdate?.date_last_updated ?? '';
  }

  showSelectedUser(): void {
    const data = this.gridService.getSelectedRow() as User;
    if (data) {
      this.subscription.add(
        this.userService.getSelectedUser(data.id).subscribe(
          (resData) => {
            this.userToUpdate = resData[0] as User;
            this.resetForm();
          },
          (errorMessage) => {
            console.error(errorMessage);
            this.resetForm();
            this.userFeedback =
              'There was an error attempting to show the selected user.';
            this.cssUserFeedback = 'fail';
          }
        )
      );
    }
  }

  updateInfo(): void {
    this.determineUserToUpdateValues();
    this.userService.updateSubordinateInfo(this.userToUpdate).subscribe(
      (value) => {
        if (value.affectedRows === 1 && value.changedRows === 1) {
          this.modalWindowService.setModalContext(
            this.userToUpdate.username +
              '\'s account information was updated successfully.'
          );
          this.cssUserFeedback = 'success';
        }
      },
      (error1) => {
        console.log(error1);
        this.resetForm();
        this.userFeedback =
          this.userToUpdate.username +
          '\'s account information was not updated.';
        this.cssUserFeedback = 'fail';
      },
      () => {
        const selectedUser = this.gridService.getSelectedRow();
        this.gridService.setGridType(5);
        this.gridService.setSelectedRow(selectedUser);
      }
    );
  }

  determineUserToUpdateValues(): void {
    const roleId = this.formContext.get('roleId').value;
    const groupId = this.formContext.get('groupId').value;
    const locationId = this.formContext.get('locationId').value;
    const accountLock = this.formContext.get('accountLocked').value;
    const newPassword = this.formContext.get('newPassword').value;

    // If the user selected a new role option, then assign updated value.
    if (roleId) {
      this.userToUpdate.role = roleId;
    }

    // If the user selected a new group option, then assign updated value.
    if (groupId) {
      this.userToUpdate.group_id = groupId;
    }

    // If the user selected a new location option, then assign updated value.
    if (locationId) {
      this.userToUpdate.location_id = locationId;
    }

    // If the user toggled the account lock, then assign updated value.
    if (accountLock !== this.userToUpdate.account_locked) {
      this.userToUpdate.account_locked = Number(accountLock);
    }

    // Regardless of whether the user modified or not, assign value.
    this.userToUpdate.password = newPassword;
  }

  ngOnInit(): void {
    // Instruct the grid service to access data on the backend.
    // Observables have already been set up by now - we just need the grid service to assign the "next" value for each.
    this.gridService.getGroupList();
    this.gridService.getLocationList();
    this.gridService.getRoleList();

    this.subscription.add(
      this.gridService.rowSelected.subscribe((value) => {
        if (value && this.gridService.gridType === 5) {
          this.showSelectedUser();
        } else {
          this.editUserFormContext.reset();
          this.userToUpdate = null;
        }
      })
    );
    this.subscription.add(
      this.formContext.valueChanges.subscribe(() => {
        this.cssUserFeedback = '';
        this.userFeedback = '';
      })
    );
  }

  private resetForm(): void {
    // I am only supplying the account locked property of the newly selected user because I do not have a "Current Account Lock" field.
    if (this.userToUpdate) {
      this.formContext.reset({
        accountLocked: this.userToUpdate.account_locked,
      });
    }
  }

  resetSubscriptions(): void {
    this.subscription.unsubscribe();
    this.editUserForm.next(null);
    this.editUserForm.complete();
    this.gridService.setSelectedRow(null);
  }

  ngOnDestroy(): void {
    this.resetSubscriptions();
    this.userToUpdate = null;
  }

  toggleLockStatus(locked: boolean): void {
    this.lockStatus = locked;
  }
}
