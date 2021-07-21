import {Component, OnInit, OnDestroy} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GridService } from '../../../services/agGrid.service';
import { ModalWindowService } from '../../../services/modal-window.service';
import { LocationResponseData } from '../../../database/Models/database.model.location';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-site-management',
  templateUrl: './site-management.component.html',
  styleUrls: ['./site-management.component.css'],
})
export class SiteManagementComponent implements OnInit, OnDestroy {
  locationInformation = new FormGroup({
    city: new FormControl(),
    country: new FormControl(''),
    state: new FormControl(''),
    base: new FormControl(''),
  });

  // Form Values
  city: string;
  state: string;
  country: string;
  base: string;
  id: number;

  subscriptions: Subscription;
  constantSubscriptions: Subscription;

  constructor(
    private http: HttpClient,
    private gridService: GridService,
    private userService: UserService,
    private modalService: ModalWindowService
  ) {
    this.subscriptions = new Subscription();
    this.constantSubscriptions = new Subscription();

    this.id = null;
    this.city = '';
    this.country = '';
    this.state = '';
    this.base = '';

    // Set the grid to display badges
    this.gridService.setGridType(13);
  }

  // Set the fields based on AgGrid selection.
  showSelectedLocationData(): void {
    const data = this.gridService.getSelectedRow() as LocationResponseData;
    if (!data)        { return; }
    if (data.city)    { this.locationInformation.controls.city.setValue(data.city); }
    if (data.state)   { this.locationInformation.controls.state.setValue(data.state); }
    if (data.country) { this.locationInformation.controls.country.setValue(data.country); }
    if (data.base)    { this.locationInformation.controls.base.setValue(data.base); }
    if (data.id)      { this.id = data.id; }
    else              { this.id = null; }
  }

  // Checks the Location data to make sure it has been filled out properly before adding to DB.
  checkLocationData(): void {
    this.city = this.locationInformation.controls.city.value;
    this.state = this.locationInformation.controls.state.value;
    this.country = this.locationInformation.controls.country.value;
    this.base = this.locationInformation.controls.base.value;

    if (
      this.city === '' ||
      this.state === '' ||
      this.country === '' ||
      this.base === ''
    ) {
      this.modalService.setModalContext('Improper Format for the Location');
      return;
    }

    if (this.id) {
      this.updateLocation();
    }
    else {
      this.addLocation();
    }
  }

  // Add the Location Data to the DB.
  addLocation(): void {
    this.userService.addLocationData(
      this.city,
      this.state,
      this.country,
      this.base
    ).subscribe(
      (value) => {},
      (err) => { this.gridService.handleError(err); },
      () => {
        this.modalService.setModalContext(
          'New Location has been added to the database'
        );
        this.resetValues();
    });
  }

  // Add the Location Data to the DB.
  updateLocation(): void {
    this.userService.updateLocationData(
      this.id,
      this.city,
      this.state,
      this.country,
      this.base
    ).subscribe(
      (value) => {},
      (err) => {
      this.gridService.handleError(err);
      },
      () => {
        this.modalService.setModalContext('Location has been updated in the database');
        this.resetValues();
    });
  }

  // Reset Display input values.
  resetValues(): void {
    this.locationInformation.reset();
    this.resetSubscriptions();

    this.id = null;
    this.city = '';
    this.country = '';
    this.state = '';
    this.base = '';

    this.gridService.setGridType(13);
  }

  // Create subscriptions that the component will need.
  ngOnInit(): void {
    this.constantSubscriptions.add(this.gridService.rowSelected.subscribe((value) => {
      if (value) {
        this.showSelectedLocationData();
      } else {
        this.resetValues();
      }
    }));
  }

  // Unsubscribe from all nonConstantSubscriptions.
  resetSubscriptions(): void{
    this.subscriptions.unsubscribe();
  }

  // Unsubscribe from all subscriptions.
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.constantSubscriptions.unsubscribe();
  }
}
