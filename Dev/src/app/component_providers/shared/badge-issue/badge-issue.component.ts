import {Component, OnInit, OnDestroy} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {BehaviorSubject, Subscription } from 'rxjs';
import { UserResponseData } from '../../../database/Models/database.model.user';
import { HttpClient } from '@angular/common/http';
import { BadgeService } from '../../../services/badge.service';
import DateTimeFormat = Intl.DateTimeFormat;
import { GridService } from '../../../services/agGrid.service';
import { Badge } from '../../../database/Models/database.model.badge';
import {ModalWindowService} from '../../../services/modal-window.service';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-badge-issue',
  templateUrl: './badge-issue.component.html',
  styleUrls: ['./badge-issue.component.css'],
})
export class BadgeIssueComponent implements OnInit, OnDestroy {
  badgeInformation = new FormGroup({
    badgeSerialNumber: new FormControl(),
    assignedUser: new FormControl(''),
    activatedTime: new FormControl(''),
  });

  // Form Values
  activatedTimeValue: DateTimeFormat;
  selectedUserValue: string;
  badgeSerialNumberValue: string;

  registered = false;
  users: any = null;
  badges: any = null;
  button: any;
  error: string = null;
  optionsList: any;
  badgeStatus: number;
  subscriptions: Subscription;
  constantSubscriptions: Subscription;
  userRole: number;
  buttonLabel: string;

  constructor(
    private http: HttpClient,
    private badgeService: BadgeService,
    private gridService: GridService,
    private modalService: ModalWindowService,
    private userService: UserService,
  ) {
    this.userRole = this.userService.getActiveUser().role;
    this.badgeStatus = null;
    if (this.userRole === 1){
      this.gridService.setGridType(12);
      this.buttonLabel = 'Activate Badge';
    }
    else {
      this.gridService.setGridType(10);
      this.buttonLabel = 'Issue Badge';
    }
    this.subscriptions = new Subscription();
    this.constantSubscriptions = new Subscription();
  }

  // Populate fields with values from grid selection on row click event.
  showSelectedBadgeData(): void {
    const data = this.gridService.getSelectedRow() as Badge;
    if (!data) { return; }
    if (data.activated_time) { this.badgeInformation.controls.activatedTime.setValue(data.activated_time); }
    if (data.assigned_user) { this.badgeInformation.controls.assignedUser.setValue(data.assigned_user); }
    this.badgeInformation.controls.badgeSerialNumber.setValue(
      data.badge_serial_number
    );
  }

  // Determines if user has input proper values in the respective field.
  checkBadgeData(): void {
    this.activatedTimeValue = this.badgeInformation.controls.activatedTime.value;
    this.selectedUserValue = this.badgeInformation.controls.assignedUser.value;
    this.badgeSerialNumberValue = this.badgeInformation.controls.badgeSerialNumber.value;

    if (this.badgeSerialNumberValue === '' || this.selectedUserValue === '') {
      this.modalService.setModalContext('Improper Format for the Badge Data, Please ensure fields are properly filled out');
      return;
    }

    this.determineBadgeStatus();
    this.updateBadge();
  }

  determineBadgeStatus(): void {
    if (this.selectedUserValue !== '' && !this.activatedTimeValue) {
      this.badgeStatus = 7;
    }
    else {
      this.badgeStatus = 2;
    }
  }

  // Update the Badge Information on the server.
  updateBadge(): void {
    console.log('Ready To Issue Badge Data to Database!');
    const activatedT = this.formatDate(this.activatedTimeValue);
    if (this.userRole === 1) {
      this.badgeService
        .issueBadgeData(this.badgeSerialNumberValue, this.badgeStatus, this.userService.getActiveUser().username, activatedT)
        .subscribe(
          (val) => {},
          (err) => {
            this.badgeService.handleError(err);
          },
          () => {
            this.badgeService.getWearerBadgeList(7).subscribe(
              (value) => {
                this.badges = value;
                this.badgeInformation.controls.badgeSerialNumber.setValue(this.badges);
              },
              () => {},
              () => {
                this.resetValues();
              });
          });
    } else {
      this.badgeService.issueBadgeData(this.badgeSerialNumberValue, this.badgeStatus, this.selectedUserValue, activatedT)
        .subscribe(
          (value) => {
          },
          (err) => {
            this.badgeService.handleError(err);
          },
          () => {
            // Update the dropDown then resetValues.
            this.badgeService.getBadgeList(1).subscribe(
              (value1) => {
                this.badges = value1;
                this.badgeInformation.controls.badgeSerialNumber.setValue(this.badges);
              },
              (error) => { console.log(error); },
              () => {
                this.resetValues();
              });
          }
        );
    }
  }

  // Inform the User that the badge has been updated and refresh the badgeList and remove any unnecessary subscriptions.
  resetValues(): void {
    this.modalService.setModalContext(
      'Badge ' + this.badgeSerialNumberValue + ' has been updated in the database'
    );
    this.badgeInformation.reset();
    if (this.userRole === 1){
      this.gridService.setGridType(12);
    }
    else {
      this.gridService.setGridType(10);
    }

    this.badgeStatus = null;
    this.resetSubscriptions();
  }

  // Format the date to a method that the DB will accept.
  formatDate(time: DateTimeFormat): string {
    if (time === null) {
      return null;
    }

    const newTime = time + '';
    const parsedTime = newTime.slice(0, 16).replace('T', ' ') + ':00';
    console.log('The New Formatted Time is: ' + parsedTime);
    return parsedTime;
  }

  // Initial Subscriptions needed for this component.
  ngOnInit(): void {
    this.constantSubscriptions.add(this.gridService.rowSelected.subscribe((value) => {
      if (value) {
        this.showSelectedBadgeData();
      } else {
        this.badgeInformation.reset();
      }
    }));
    if (this.userRole === 1){
      this.subscriptions.add(this.badgeService.getWearerBadgeList(7).subscribe((value) => {
        this.badges = value;
        this.badgeInformation.controls.badgeSerialNumber.setValue(this.badges);
      }));
    }
    else {
      this.subscriptions.add(this.badgeService.getBadgeList(1).subscribe((value) => {
        this.badges = value;
        this.badgeInformation.controls.badgeSerialNumber.setValue(this.badges);
      }));
      this.constantSubscriptions.add(this.gridService.subordinatesResponse().subscribe((value) => {
        this.users = value;
        this.badgeInformation.controls.assignedUser.setValue(this.users);
      }));
    }
  }

  // Unsubscribe from Local subscriptions.
  resetSubscriptions(): void{
    this.subscriptions.unsubscribe();
  }

  // Unsubscribe from all component subscriptions.
  ngOnDestroy(): void {
    this.resetSubscriptions();
    this.constantSubscriptions.unsubscribe();
  }
}
