import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import DateTimeFormat = Intl.DateTimeFormat;
import { environment } from '../../../../../environments/environment';
import { catchError, tap } from 'rxjs/operators';
import {
  DoehrsAnalyteResultData,
  DoehrsAnalyteResultDataResponseData,
} from '../../../../database/Models/database.model.doehrsAnalyteResultData';
import { UserService } from '../../../../services/user.service';
import { LoginService } from '../../../../services/login.service';
import { DoehrsLab } from '../../../../database/Models/database.model.doehrsLab';
import { DoehrsChainOfCustody } from '../../../../database/Models/database.model.doehrsChainOfCustody';
import { DoehrsSample } from '../../../../database/Models/database.model.doehrsSample';
import { FormControl, FormGroup } from '@angular/forms';
import { DoehrsIHLabAnalysisResultDataResponse } from '../../../../database/Models/database.model.doehrsIHLabAnalysisResultData';
import { ModalWindowService } from '../../../../services/modal-window.service';

@Component({
  selector: 'app-doehrs-upload',
  templateUrl: './doehrs-upload.component.html',
  styleUrls: ['./doehrs-upload.component.css'],
})
export class DoehrsUploadComponent implements OnInit, OnDestroy {
  doehrsInformation = new FormGroup({
    sample: new FormControl(),
    chainOfCustody: new FormControl(''),
    analyteResultData: new FormControl(''),
    lab: new FormControl(''),
    doehrsData: new FormControl(''),
  });

  // Form Values
  doehrsLab: DoehrsLab[];
  doehrsAnalyteResultData: DoehrsAnalyteResultData[];
  doehrsChainOfCustody: DoehrsChainOfCustody[];
  doehrsSample: DoehrsSample[];
  ihLabAnalysis: DoehrsIHLabAnalysisResultDataResponse[];
  showForm = false;
  doehrsData: any;

  selectedSample: DoehrsSample;
  selectedLab: DoehrsLab;

  selectedChainOfCustody: DoehrsChainOfCustody[];
  selectedAnalyteResultData: DoehrsAnalyteResultData[];

  subscriptions: Subscription;
  constantSubscriptions: Subscription;

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private loginService: LoginService,
    private modalService: ModalWindowService
  ) {
    this.doehrsAnalyteResultData = [];
    this.doehrsChainOfCustody = [];
    this.doehrsLab = [];
    this.doehrsSample = [];
    this.ihLabAnalysis = [];
    this.selectedChainOfCustody = [];
    this.selectedAnalyteResultData = [];
    this.subscriptions = new Subscription();
    this.constantSubscriptions = new Subscription();
    this.selectedSample = null;
    this.selectedLab = null;
  }

  // Error Handling
  handleError(errorRes: HttpErrorResponse): Observable<any> {
    this.loginService.setErrorCode(errorRes.status);
    if (errorRes.status === 401 && this.loginService.getLoggedInValue()) {
      // User Disconnected in backend we need to log the user out.
      this.logout();
    }
    return;
  }

  // Reset Display input values.
  resetValues(): void {
    this.resetSubscriptions();
    this.selectedChainOfCustody = [];
    this.selectedAnalyteResultData = [];
    this.selectedLab = null;
  }

  // Format the Date for DB Date Time compliance
  formatDate(time: DateTimeFormat): string {
    if (time === null) {
      return null;
    }

    const newTime = time + '';
    const parsedTime = newTime.slice(0, 16).replace('T', ' ') + ':00';
    console.log('The New Formatted Time is: ' + parsedTime);
    return parsedTime;
  }

  // Submit Button Clicked. Gets the Selected sample and determine the display values.
  submit(): void {
    this.selectedSample = this.doehrsSample.find(
      (x) => x.SampleId === this.doehrsInformation.controls.sample.value
    );
    if (this.selectedSample) {
      this.determineDisplay();
    }
  }

  // Export the presented Doehrs Data.
  exportFile(filename: string): void {
    const el = document.getElementById('doehrsData');
    this.saveTextAsFile(el.innerText.valueOf(), filename);
  }

  exportTXT(): void {
    const time = new Date(Date.now());
    const filename =
      'DoehrsExport' +
      time.getFullYear() +
      time.getMonth() +
      time.getDate() +
      '-' +
      this.selectedSample.LabSampleId +
      '.txt';
    this.exportFile(filename);
  }

  exportXML(): void {
    const time = new Date(Date.now());
    const filename =
      'DoehrsExport' +
      time.getFullYear() +
      time.getMonth() +
      time.getDate() +
      '-' +
      this.selectedSample.LabSampleId +
      '.xml';
    this.exportFile(filename);
  }

  // Saves the grid as a specified file.
  saveTextAsFile(data: string, filename: string): void {
    if (!data) {
      this.modalService.setModalContext('No Data was presented to be exported');
      return;
    }

    const blob = new Blob([data]);
    const downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(blob);
    downloadLink.download = filename;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    window.URL.revokeObjectURL(downloadLink.href);
  }

  determineDisplay(): void {
    this.resetValues();
    this.selectedAnalyteResultData = this.doehrsAnalyteResultData.filter(
      (x) => x.AnalyteIdentifier === this.selectedSample.SampleId
    );
    this.selectedChainOfCustody = this.doehrsChainOfCustody.filter(
      (x) => x.LabSampleId === this.selectedSample.LabSampleId
    );

    const ih = this.ihLabAnalysis.find(
      (x) => x.LabSampleId === this.selectedSample.LabSampleId
    );
    if (ih) {
      this.selectedLab = this.doehrsLab.find((x) => x.id === ih.Lab);
    }
  }

  // Create subscriptions that the component will need.
  ngOnInit(): void {
    this.constantSubscriptions.add(
      this.AnalyteResults().subscribe((value) => {
        if (value) {
          this.doehrsAnalyteResultData = value;
        }
      })
    );
    this.constantSubscriptions.add(
      this.LabResults().subscribe((value) => {
        if (value) {
          this.doehrsLab = value;
        }
      })
    );
    this.constantSubscriptions.add(
      this.SampleResults().subscribe((value) => {
        if (value) {
          this.doehrsSample = value;
          this.showForm = true;
        }
      })
    );
    this.constantSubscriptions.add(
      this.ChainOfCustodyResults().subscribe((value) => {
        if (value) {
          this.doehrsChainOfCustody = value;
        }
      })
    );
    this.constantSubscriptions.add(
      this.IHLabAnalysisResults().subscribe((value) => {
        if (value) {
          this.ihLabAnalysis = value;
        }
      })
    );
  }

  // Gets Doehrs Analyte Values.
  AnalyteResults(): Observable<any> {
    return this.http
      .post<any>(`${environment.apiUrl}/doehrsAnalyteResultData`, {})
      .pipe(catchError((err) => this.handleError(err)));
  }

  // Gets Doehrs Lab Values.
  LabResults(): Observable<any> {
    return this.http
      .post<any>(`${environment.apiUrl}/doehrsLabData`, {})
      .pipe(catchError((err) => this.handleError(err)));
  }

  // Gets Doehrs Chain Of Custody Values.
  ChainOfCustodyResults(): Observable<any> {
    return this.http
      .post<any>(`${environment.apiUrl}/doehrsChainOfCustodyData`, {})
      .pipe(catchError((err) => this.handleError(err)));
  }

  // Gets Doehrs Sample Values.
  SampleResults(): Observable<any> {
    return this.http
      .post<any>(`${environment.apiUrl}/doehrsSampleData`, {})
      .pipe(catchError((err) => this.handleError(err)));
  }

  // Gets Doehrs Lab IH Analysis Values.
  IHLabAnalysisResults(): Observable<any> {
    return this.http
      .post<any>(`${environment.apiUrl}/doehrsIHLabAnalysis`, {})
      .pipe(catchError((err) => this.handleError(err)));
  }

  // Logout functionality when the backend is signaling the front end to log out this user.
  logout(): void {
    this.loginService.backendForceLogout();
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
