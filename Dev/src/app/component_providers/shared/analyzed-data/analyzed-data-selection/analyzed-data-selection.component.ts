import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { GridService } from '../../../../services/agGrid.service';
import { Badge } from '../../../../database/Models/database.model.badge';
import { User } from '../../../../database/Models/database.model.user';
import { ModalWindowService } from '../../../../services/modal-window.service';
import { BadgeService } from '../../../../services/badge.service';

@Component({
  selector: 'app-analyzed-data-selection',
  templateUrl: './analyzed-data-selection.component.html',
  styleUrls: ['./analyzed-data-selection.component.css'],
})
export class AnalyzedDataSelectionComponent implements OnInit, OnDestroy {
  analyzedInformation = new FormGroup({
    username: new FormControl(),
    badgeSerialNumber: new FormControl(),
    dateCheckedOut: new FormControl(),
    dateCheckedIn: new FormControl(),
  });

  constantSub: Subscription;
  subscriptions: Subscription;

  // Form Values
  showFormValue = false;
  showAnalyzedForm = false;
  badgeList: any;
  userList: any;
  selectedBadge: Badge;
  assignedUser: User;
  analyst: User;

  constructor(
    private http: HttpClient,
    private gridService: GridService,
    private modalService: ModalWindowService,
    private badgeService: BadgeService,
  ) {
    this.constantSub = new Subscription();
    this.subscriptions = new Subscription();
    this.gridService.setGridType(6);
    this.badgeList = [];
    this.userList = [];
    this.assignedUser = null;
    this.analyst = null;
  }

  // Show the form once loaded.
  showForm(): boolean {
    this.showFormValue = true;
    return this.showFormValue;
  }

  // Check the badge serial number and determine the necessary info to display.
  checkBadgeData(): void {
    this.showAnalyzedForm = false;
    const badgeSerialNumber = this.analyzedInformation.controls.badgeSerialNumber.value;

    if (!badgeSerialNumber) {
      this.modalService.setModalContext('Improper Format for the Badge Data, Please ensure fields are properly filled out');
      return;
    }

    this.selectedBadge = this.badgeList.find(x => x.badge_serial_number === badgeSerialNumber);
    if (this.selectedBadge){
      this.userValues();
    }
  }

  // Set the values and prepare necessary info to display.
  showSelectedInfo(): void{
    this.assignedUser = null;
    this.analyst = null;
    this.showAnalyzedForm = false;
    this.selectedBadge = this.gridService.getSelectedRow();
    if (this.selectedBadge){
      if (this.selectedBadge.badge_serial_number) {
        this.analyzedInformation.controls.badgeSerialNumber.setValue(this.selectedBadge.badge_serial_number);
      }
    }

    if (this.selectedBadge){
      this.userValues();
    }
  }

  userValues(): void {
    const desiredUser =  this.userList.find(x => x.Username === this.selectedBadge.assigned_user);
    if (!desiredUser) { return; }
    this.badgeService.getSelectedUser(
     desiredUser.id).subscribe((value) => {
        if (value){
          this.assignedUser = value[0];
        }
      },
      (err) => { console.log(err); },
      () => {
        if (this.assignedUser) {
        console.log('Assigned User set: ' + this.assignedUser);
        this.determineDisplayAnalyzed();
        }
        else {
          console.log('Could not find Assigned User.');
          if (this.selectedBadge && this.analyst){
            this.modalService.setModalContext('The Data for this badge has yet to be analyzed.');
          }
        }
      });
    this.badgeService.getAnalyst(this.selectedBadge.badge_serial_number).subscribe((value) => {
        if (value) {
          // get the analyst assigned to the first token.
          this.analyst = value[0];
        }
      },
      (err) => { console.log(err); },
      () => {
        if (this.analyst) {
          console.log('Analyst User set as: ' + this.analyst);
          this.determineDisplayAnalyzed();
        }
        else{
          console.log('Could not find analyst.');
          if (this.selectedBadge && this.assignedUser){
            this.modalService.setModalContext('The Data for this badge has yet to be analyzed.');
          }
        }
      });
  }

  // Determines whether we have the necessary info to display the resulting page.
  determineDisplayAnalyzed(): void {
    if (this.selectedBadge && this.assignedUser && this.analyst){
      this.showAnalyzedForm = true;
    }
    else {
      this.showAnalyzedForm = false;
      console.log('Will Not Show Form. ');
      console.log('Analyst: ' + this.analyst);
      console.log('Assigned User: ' + this.assignedUser);
      console.log('Selected Badge: ' + this.selectedBadge);
    }
  }

  // Subscribe from all subscriptions.
  ngOnInit(): void {
    this.badgeService.getUserList().subscribe((value) => {
      if (value) {
        this.userList = value;
      }
    });

    this.constantSub.add(
      this.gridService.rowSelected.subscribe((value) => {
        if (value) {
          this.showSelectedInfo();
        } else {
          this.analyzedInformation.reset();
          this.selectedBadge = null;
          this.showAnalyzedForm = false;
          this.assignedUser = null;
          this.analyst = null;
        }
      })
    );

    this.badgeService.getBadgeByStatus(8).subscribe((value) => {
      if (value) {
        this.badgeList = value;
        this.analyzedInformation.controls.badgeSerialNumber.setValue(this.badgeList);
        this.showForm();
      }
    });
  }

  // Unsubscribe from temporary subscriptions.
  resetSubscriptions(): void {
    this.subscriptions.unsubscribe();
  }

  // Unsubscribe from all subscriptions.
  ngOnDestroy(): void {
    this.resetSubscriptions();
    this.constantSub.unsubscribe();
  }
}
