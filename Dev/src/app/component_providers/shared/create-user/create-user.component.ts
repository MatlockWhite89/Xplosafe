import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GridService } from '../../../services/agGrid.service';
import { UserService } from '../../../services/user.service';
import { ModalWindowService } from '../../../services/modal-window.service';
import { environment } from '../../../../environments/environment';
import {LoginService} from '../../../services/login.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
})
export class CreateUserComponent implements OnInit, AfterViewInit, OnDestroy {
  userInformation = new FormGroup({
    username: new FormControl(''),
    group: new FormControl(0),
    location: new FormControl(0),
    role: new FormControl(0),
    password: new FormControl(''),
  });
  subscriptions: Subscription;
  // Form Values
  username: string;
  password: string;
  group: number;
  location: number;
  role: number;

  locationOptions: any = null;
  roleOptions: any = null;
  groupOptions: any = null;
  locations: any;
  groups: any;
  roles: any;

  showForm = false;
  users: any = null;
  button: any;
  selection: any;
  error: string = null;
  optionsList: any;

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private gridService: GridService,
    private modalService: ModalWindowService,
    private loginService: LoginService,
  ) {
    this.subscriptions = new Subscription();
    this.gridService.getGroupList();
    this.gridService.getLocationList();
    this.gridService.getRoleList();
  }

  checkUserData(): void {
    this.username = this.userInformation.controls.username.value;
    this.password = this.userInformation.controls.password.value;
    this.location = this.userInformation.controls.location.value;
    this.role = this.userInformation.controls.role.value;
    this.group = this.userInformation.controls.group.value;

    if (
      this.username === '' ||
      this.location < 1 ||
      this.role < 1 ||
      this.group < 1 ||
      this.password === ''
    ) {
      this.modalService.setModalContext('Improper Format for the User Data');
      return;
    }

    this.addUser();
  }

  addUser(): void {
    this.http
      .post<boolean>(`${environment.apiUrl}/addUser`, {
        username: this.username,
        password: this.password,
        role: this.role,
        group_id: this.group,
        location_id: this.location,
      })
      .subscribe((value) => {
        if (value) {
          this.modalService.setModalContext(
            'User ' + this.username + ' has been added to the database'
          );
          this.gridService.setGridType(5);
          this.resetValues();
        } else {
          this.modalService.setModalContext(
            'User ' +
              this.username +
              ' could not be added to the database, Check the Parameters'
          );
        }
      },
        (err) => {
        this.modalService.setModalContext('Could not add user due to ' + err);
        this.loginService.setErrorCode(err.status);
      });
  }

  resetValues(): void {
    this.userInformation.reset();
    this.resetSubscriptions();
  }

  showUserForm(): boolean {
    this.showForm = true;
    return this.showForm;
  }

  ngOnInit(): void {
    this.groupOptions = this.gridService.getGroups();
    this.userInformation.controls.group.setValue(this.groupOptions);
    this.gridService.groups.subscribe((value) => {
      this.groups = value;
      this.userInformation.controls.group.setValue(0);
    });

    this.locationOptions = this.gridService.getLocations();
    this.userInformation.controls.location.setValue(this.locationOptions);
    this.gridService.locations.subscribe((value) => {
      this.locations = value;
      this.userInformation.controls.location.setValue(0);
    });

    this.roleOptions = this.gridService.getRoleList();
    this.userInformation.controls.role.setValue(this.roleOptions);
    this.gridService.roles.subscribe((value) => {
      this.roles = value;
      this.userInformation.controls.role.setValue(0);
    });
  }

  resetSubscriptions(): void {
    this.subscriptions.unsubscribe();
  }
  ngAfterViewInit(): void {}

  ngOnDestroy(): void {
    this.resetSubscriptions();
  }
}
