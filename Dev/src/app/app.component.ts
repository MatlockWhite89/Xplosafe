import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from './services/login.service';
import { UserService } from './services/user.service';
import { GridService } from './services/agGrid.service';
import { ReportService } from './services/report.service';
import { BadgeService } from './services/badge.service';
import { FileDownloadService } from './services/file-download.service';
import { AccountService } from './services/account.service';
import { User } from './shared/user.model';
import { Subscription } from 'rxjs';
import { ModalWindowService } from './services/modal-window.service';
import { GraphService } from './services/graph.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    GridService,
    ReportService,
    GraphService,
    BadgeService,
    FileDownloadService,
    AccountService,
    ModalWindowService,
  ],
})
export class AppComponent implements OnInit, OnDestroy {
  maintenanceTime = '';
  maintenanceEndTime = '';
  maintenanceText = '';
  user: User;
  private userSubscription: Subscription;
  cssWrapperOverrideValue: string;
  constructor(
    private loginService: LoginService,
    private userService: UserService,
    private modalService: ModalWindowService,
    private httpClient: HttpClient
  ) {
    this.userSubscription = new Subscription();
    this.cssWrapperOverrideValue = 'base-wrapper';
  }

  evaluateMaintenance(): string {
    if (
      this.maintenanceTime === null ||
      this.maintenanceTime === undefined ||
      this.maintenanceTime === ''
    ) {
      return '';
    }
    const scheduledMaintenance = Date.parse(this.maintenanceTime);
    const currentTime = Date.now();
    const upcomingMaintenanceTime = scheduledMaintenance - 2 * 3600000;
    if (currentTime > scheduledMaintenance) {
      if (this.maintenanceEndTime === null || this.maintenanceEndTime === '') {
        const maintBegin =
          'The Site is will be under maintenance at: ' + this.maintenanceTime;
        this.modalService.setModalContext(maintBegin);
        return maintBegin;
      }

      const maintEnd =
        'The Site is expected to be under maintenance until: ' +
        this.maintenanceEndTime;
      this.modalService.setModalContext(maintEnd);
      return maintEnd;
    } else if (currentTime > upcomingMaintenanceTime) {
      this.loginService.setMaintenanceLogOut(currentTime, scheduledMaintenance);
      const maintUpcomming =
        'The Site will be undergoing Maintenance at: ' + this.maintenanceTime;
      this.modalService.setModalContext(maintUpcomming);
      return maintUpcomming;
    }

    return '';
  }

  ngOnInit(): void {
    this.userSubscription = this.userService.activeUser$.subscribe((user) => {
      this.user = user;
      if (user && user.userId > 0) {
        this.cssWrapperOverrideValue = 'override-wrapper-home';
      } else {
        this.cssWrapperOverrideValue = 'base-wrapper';
      }
    });

    this.userSubscription.add(
      this.loginService.logoutEvent.subscribe((value) => {
        if (value) {
          this.modalService.setModalContext(
            'Active user has been disconnected.'
          );
        }
      })
    );

    this.loginService.getMaintenanceTime().subscribe((maintValue) => {
      const maintTime = 'maintenance_time';
      const maintEndTime = 'maintenance_end_time';
      const idValue = 'id';
      if (maintValue[0][idValue] > 0) {
        this.loginService.maintenanceTime = maintValue[0][maintTime];
        this.loginService.maintenanceEndTime = maintValue[0][maintEndTime];
        this.maintenanceTime = this.loginService.maintenanceTime;
        this.maintenanceEndTime = this.loginService.maintenanceEndTime;
        this.maintenanceText = this.evaluateMaintenance();
      }
    });

    this.loginService.maintTime.subscribe((maintValue) => {
      this.maintenanceTime = maintValue;
      this.maintenanceText = this.evaluateMaintenance();
    });
    this.loginService.maintEndTime.subscribe((maintValue) => {
      this.maintenanceEndTime = maintValue;
      this.maintenanceText = this.evaluateMaintenance();
    });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
