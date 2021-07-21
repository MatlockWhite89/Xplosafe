import {Component, OnInit, OnDestroy} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BadgeService } from '../../../services/badge.service';
import { GridService } from '../../../services/agGrid.service';
import { Badge } from '../../../database/Models/database.model.badge';
import { ModalWindowService } from '../../../services/modal-window.service';
import { AnalyzedDataComponent } from '../analyzed-data/analyzed-data.component';

@Component({
  selector: 'app-badge-remove',
  templateUrl: './badge-remove.component.html',
  styleUrls: ['./badge-remove.component.css'],
})
export class BadgeRemoveComponent implements OnInit, OnDestroy {
  badgeInformation = new FormGroup({
    badgeSerialNumber: new FormControl(),
  });

  // Form Values
  badgeSerialNumber: string;
  badges: Badge[];
  badgesToRemove: Badge[];
  analyzedBadges: AnalyzedDataComponent[];

  subscriptions: Subscription;
  constantSubscriptions: Subscription;

  constructor(
    private http: HttpClient,
    private badgeService: BadgeService,
    private gridService: GridService,
    private modalService: ModalWindowService,
  ) {
    this.badgeService.getUserList();
    this.subscriptions = new Subscription();
    this.constantSubscriptions = new Subscription();

    this.badges = [];
    this.badgesToRemove = [];
    this.analyzedBadges = [];

    this.gridService.setGridType(1);
  }

  // Set the fields based on AgGrid selection.
  showSelectedBadgeData(): void {
    const data = this.gridService.getSelectedRow() as Badge;
    if (!data) { return; }
    if (data.badge_serial_number) {
      this.badgeInformation.controls.badgeSerialNumber.setValue( data.badge_serial_number);
    }
  }

  // Checks the Badge data to make sure it has been filled out properly before adding to DB.
  checkBadgeData(): void {
    this.badgeSerialNumber = this.badgeInformation.controls.badgeSerialNumber.value;

    if (!this.badgeSerialNumber || this.badgeSerialNumber === '') {
      this.modalService.setModalContext('No Badge Selected.');
      return;
    }

    this.removeBadge();
  }

  // Add the Badge to the DB.
  removeBadge(): void {
    const badge = this.badges.find(x => x.badge_serial_number === this.badgeSerialNumber);
    if (!badge || !badge.id){
      this.modalService.setModalContext('No Badge Selected.');
      return;
    }

    if (badge.badge_status === 8){
      this.modalService.setModalContext('This badge has already been analyzed and should not be removed');
      this.resetValues();
    }

    this.badgeService.removeBadgeData(
      this.badgeSerialNumber,
      badge.id
    ).subscribe(
      (value) => {},
      (err) => { console.log(err); },
      () => {
        this.modalService.setModalContext(
          'Badge ' + this.badgeSerialNumber + ' has been removed from the database'
        );
        this.resetValues();
      });
  }

  // Reset Display input values.
  resetValues(): void {
    this.badgeInformation.reset();
    this.resetSubscriptions();
    this.gridService.setGridType(1);
  }

  // Create subscriptions that the component will need.
  ngOnInit(): void {
    this.constantSubscriptions.add(this.gridService.rowSelected.subscribe((value) => {
      if (value) {
        this.showSelectedBadgeData();
      } else {
        this.badgeInformation.reset();
      }
    }));
    this.subscriptions.add(this.badgeService.getAllBadges().subscribe((value) => {
      let temp: Badge[];
      temp = [];
      temp = value;
      // The following will prevent the Manufacturer from removing badges that have already completed the analysis process.
      for (const b of temp){
        if (b.badge_status !== 8){
          this.badges.push(b);
        }
      }
    }));
  }

  // Unsubscribe from all nonConstantSubscriptions.
  resetSubscriptions(): void {
    this.subscriptions.unsubscribe();
  }

  // Unsubscribe from all subscriptions.
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.constantSubscriptions.unsubscribe();
  }
}
