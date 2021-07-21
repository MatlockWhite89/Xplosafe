import {Component, OnInit, AfterViewInit, OnDestroy} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import DateTimeFormat = Intl.DateTimeFormat;
import {LoginService} from '../../../services/login.service';
import {Subscription} from 'rxjs';
import {UserService} from '../../../services/user.service';
import {ModalWindowService} from '../../../services/modal-window.service';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.css'],
})
export class MaintenanceComponent implements OnInit, OnDestroy {
  maintenanceInformation = new FormGroup({
    maintenanceScheduleDate: new FormControl(),
    maintenanceEndScheduleDate: new FormControl(),
  });
  // Form Values
  maintenanceTime: DateTimeFormat;
  maintenanceEndTime: DateTimeFormat;

  showForm = false;
  registered = false;
  submitButton: any;
  endMaintenanceButton: any;
  selection: any;
  error: string = null;
  optionsList: any;
  subscriptions: Subscription;

  constructor(
    private http: HttpClient,
    private loginService: LoginService,
    private modalService: ModalWindowService
  )
  {
    this.subscriptions = new Subscription();
    this.maintenanceTime = null;
    this.maintenanceEndTime = null;
    this.submitButton = document.getElementById('submitButton');
    this.endMaintenanceButton = document.getElementById('endMaintenanceButton');
  }

  showFormDisplay(): boolean {
    this.showForm = true;
    return this.showForm;
  }

  setMaintenanceTime(): void {
    this.maintenanceTime = this.maintenanceInformation.controls.maintenanceScheduleDate.value;
    this.maintenanceEndTime = this.maintenanceInformation.controls.maintenanceEndScheduleDate.value;

    if (this.maintenanceTime === null || this.maintenanceTime === undefined ||
      (this.maintenanceEndTime !== null && this.maintenanceEndTime < this.maintenanceTime))
    {
      console.log('Improper Format for the Maintenance Dates');
      return;
    }

    this.pushValuesToDatabase();
  }

  endMaintenance(): void {
    this.subscriptions.add(this.loginService
      .scheduleMaintenance(null, null)
      .subscribe(
        (value) => {
          // @ts-ignore
          if (value.affectedRows > 0) {
            this.resetValues();
          } else {
            this.badData();
          }
        },
        (error1) => {
          this.badData();
        }
      ));
  }
  pushValuesToDatabase(): void {
    const scheduledTime = this.formatDate(this.maintenanceTime);
    let endTime = null;
    if (this.maintenanceEndTime !== null && this.maintenanceEndTime !== undefined){
      endTime = this.formatDate(this.maintenanceEndTime);
    }

    this.subscriptions.add(this.loginService
      .scheduleMaintenance(scheduledTime, endTime)
      .subscribe(
        (value) => {
          // @ts-ignore
          if (value.affectedRows > 0) {
            this.resetValues();
          } else {
            this.badData();
          }
        },
        (error1) => {
          this.badData();
        }
      ));
  }

  badData(): void {
    this.modalService.setModalContext('Was not able to update Database Error 407: check your input.');
  }

  resetValues(): void {
    if (this.maintenanceTime === null)
    {
      this.modalService.setModalContext('Maintenance has been ended');
      this.loginService.setMaintValue('');
      this.loginService.setMaintEndTimeValue(this.maintenanceEndTime + '');
    }
    else
    {
      this.modalService.setModalContext(
        'Maintenance has been scheduled at ' + this.maintenanceTime
      );
      this.loginService.setMaintValue(this.maintenanceTime + '');
      if (this.maintenanceEndTime === null) { this.loginService.setMaintEndTimeValue(''); }
      else { this.loginService.setMaintEndTimeValue(this.maintenanceEndTime + ''); }
      this.maintenanceInformation.reset();
      this.maintenanceTime = null;
      this.maintenanceEndTime = null;
    }
  }

  formatDate(time: DateTimeFormat): string {
    if (time === null) {
      return null;
    }

    const newTime = time + '';
    return newTime;
  }

  resetSubscriptions(): void{
    this.subscriptions.unsubscribe();
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.resetSubscriptions();
  }
}
