import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { GridService } from '../../../services/agGrid.service';
import { Subscription} from 'rxjs';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-custom-data',
  templateUrl: './custom-data.component.html',
  styleUrls: ['./custom-data.component.css'],
})
export class CustomDataComponent implements OnInit, OnDestroy {
  // Form Values
  showForm = false;
  subscriptions: Subscription;

  constructor(
    private http: HttpClient,
    private gridService: GridService,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
  ) {
    this.gridService.setGridType(0);
    this.subscriptions = new Subscription();
  }

  resetSubscriptions(): void {
    this.subscriptions.unsubscribe();
  }

  exportValuesCSV(): void {
    this.gridService.setPrintCSV(true);
  }

  exportValuesDSV(): void {
    this.gridService.setPrintDSV(true);
  }

  showFormValues(): boolean {
    this.showForm = true;
    return this.showForm;
  }

  ngOnInit(): void {
  }

  logout(): void {
    this.loginService.backendForceLogout();
  }

  ngOnDestroy(): void {
    this.resetSubscriptions();
  }
}
