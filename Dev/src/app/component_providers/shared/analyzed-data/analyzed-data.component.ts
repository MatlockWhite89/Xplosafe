import {Component, OnInit, OnDestroy, Input} from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BadgeService } from '../../../services/badge.service';
import { GridService } from '../../../services/agGrid.service';
import { Analyte } from '../../../database/Models/database.model.analyte';
import { Badge } from '../../../database/Models/database.model.badge';
import { User } from '../../../database/Models/database.model.user';
import { AnalyzedToken } from '../../../database/Models/database.model.analyzedToken';
import { LocationResponseData } from '../../../database/Models/database.model.location';
import {ModalWindowService} from '../../../services/modal-window.service';

@Component({
  selector: 'app-analyzed-data',
  templateUrl: './analyzed-data.component.html',
  styleUrls: ['./analyzed-data.component.css'],
})
export class AnalyzedDataComponent implements OnInit, OnDestroy {
  @Input() selectedBadge: Badge;
  @Input() assignedUserId: number;
  @Input() assignedUser: User;
  @Input() analyst: User;

  // Form Values
  subscriptions: Subscription;
  constantSubscriptions: Subscription;
  analyteList: any;
  formLoaded: boolean;
  evaluationsMade: boolean;
  elapsedTime: number;
  wearerLocation?: LocationResponseData;
  analystLocation?: LocationResponseData;
  labReportedValue: string;
  locations: any;
  method: any;
  analytesFound: Analyte[];
  userList: User[];
  analyzedTokenReportList: AnalyzedToken[];
  analyzedValues: any;

  tokenTypeList: any;
  analysisMethodList: any;
  disclaimerInfo: string;

  constructor(
    private http: HttpClient,
    private badgeService: BadgeService,
    private gridService: GridService,
    private modalWindow: ModalWindowService,
  ) {
    this.subscriptions = new Subscription();
    this.constantSubscriptions = new Subscription();
    this.formLoaded = false;
    this.evaluationsMade = false;
    this.analytesFound = [];
    this.userList = [];
    this.analyzedTokenReportList = [];
    this.locations = [];
    this.method = [];
    this.analyzedValues = [];
    this.wearerLocation = null;
    this.analystLocation = null;
    this.disclaimerInfo = '';
  }

  // Evaluate the Elapsed Time given the selected badge activate and turned in times in minutes.
  setElapsedTime(): void {
    const activated = new Date(this.selectedBadge.activated_time).valueOf();
    const turnedIn = new Date(this.selectedBadge.turned_in_time).valueOf();
    const evaluatedTime = Math.abs(turnedIn - activated);
    const minuteEval = 1000 * 60;
    this.elapsedTime = evaluatedTime / minuteEval;
  }

  // Find the analyte value given the cas number.
  findAnalyteName(casNumber: string): string {
    if (!casNumber){
      return '';
    }

    const givenAnalyte = this.analyteList.find(x => x.cas_number === casNumber);
    return givenAnalyte.analyte_name;
  }

  // Finds the Analysis Method for the given analyte.
  findMethod(casNumber: string): string {
    return this.analyzedTokenReportList.find(x => x.cas_number === casNumber).analysis_method;
  }

  // Determine the evaluations given the one time pull of the data.
  determineEvaluations(): void
  {
    console.log('Reached into determineEvaluations.');
    const result = [];
    const casNumbers = [];
    for (const a of this.analyzedTokenReportList)
    {
      console.log('Reached into AnalyzedTokenReportList.');
      if (!casNumbers.includes(a.cas_number)){
        casNumbers.push(a.cas_number);
        if (!this.analytesFound.includes(this.analyteList.find(x => x.cas_number === a.cas_number))) {
          this.analytesFound.push(this.analyteList.find(x => x.cas_number === a.cas_number));
        }
      }
    }

    if (this.analyzedTokenReportList[0]){
      this.labReportedValue = this.analyzedTokenReportList[0].date_created;
    }

    console.log('Cas Numbers: ');
    console.log(casNumbers);
    for (const casNum of casNumbers) {
      let qtyFound = 0;
      let volConcentration = 0;
      let foundConcentration = 0;
      let units = '';
      let concentrationUnits = '';
      let molecularWeight = '';
      let molarVolume = '';
      let samplingRate = '';
      for (const a of this.analyzedTokenReportList.filter(x => x.cas_number === casNum)) {
        qtyFound += Number(a.recorded_value);
        volConcentration += Number(a.volume_concentration);
        foundConcentration += Number(a.found_concentration);
        units = a.recorded_units;
        concentrationUnits = a.concentration_units;
        samplingRate = a.sampling_rate;
        molarVolume = a.molar_volume;
        molecularWeight = a.molecular_weight;
      }
      const numValues = (this.analyzedTokenReportList.filter(x => x.cas_number === casNum)).length;
      const avg = ((Math.round((qtyFound / numValues) * 1000)) / 1000);
      const vol = ((Math.round((volConcentration / numValues) * 1000)) / 1000);
      const conc = ((Math.round((foundConcentration / numValues) * 1000)) / 1000);
      const standardDeviationValues = this.findStandardDeviation(casNum, avg, vol, conc);
      result.push({
        numValues,
        casNum,
        averageQtyFound: avg,
        averageVolumeConcentration: vol,
        averageFoundConcentration: conc,
        standardDeviationAverage: standardDeviationValues.foundSD,
        standardDeviationVolume: standardDeviationValues.volumeSD,
        standardDeviationConcentration: standardDeviationValues.concentrationSD,
        foundUnits: units,
        concentrationUnits,
      });
    }

    this.analyzedValues = result;
    if (this.analyzedValues.length > 0){
      this.evaluationsMade = true;
    }
    console.log(this.analyzedValues);
  }

  // Gets the StandardDeviation of the values of a given casNumber.
  findStandardDeviation(casNumber: string, foundAverage: number, volumeAverage: number, concentrationAverage: number):
    { foundSD: number, volumeSD: number, concentrationSD: number } {
    let foundResult = 0;
    let volumeResult = 0;
    let concentrationResult = 0;
    const numValues = (this.analyzedTokenReportList.filter(x => x.cas_number === casNumber)).length;
    const matchingValues = (this.analyzedTokenReportList.filter(x => x.cas_number === casNumber));
    if (matchingValues.length > 1){
      for (const val of matchingValues){
        const rval = (Number(val.recorded_value) - foundAverage);
        const rvol = (Number(val.volume_concentration) - volumeAverage);
        const rconc = (Number(val.found_concentration) - concentrationAverage);
        foundResult += rval * rval;
        volumeResult += rvol * rvol;
        concentrationResult += rconc * rconc;
      }

      foundResult = foundResult / (numValues - 1);
      foundResult = Math.sqrt(foundResult);
      volumeResult = volumeResult / (numValues - 1);
      volumeResult = Math.sqrt(volumeResult);
      concentrationResult = concentrationResult / (numValues - 1);
      concentrationResult = Math.sqrt(concentrationResult);
    }

    return { foundSD: foundResult, volumeSD: volumeResult, concentrationSD: concentrationResult};
  }

  // get the actual location values for the given analyst and assigned user.
  formatLocations(): void {
    console.log(this.analyst);
    if (this.analyst){
      for (const loc of this.locations){
        if (loc.id === this.analyst.location_id){
          this.analystLocation = loc;
        }
      }
    }
    else{
      console.log('Analyst Value is null in analyzed-data.component');
    }
    console.log(this.assignedUser);
    if (this.assignedUser){
      for (const loc of this.locations){
        if (loc.id === this.assignedUser.location_id){
          this.wearerLocation = loc;
        }
      }
    }
    else{
      console.log('Assigned User Value is null in analyzed-data.component');
    }
  }

  // Determines if the form is ready to be displayed.
  checkFormReadyToLoad(): void {
    this.formatLocations();
    if (this.evaluationsMade) {
      console.log('evaluations were Made');
      return;
    }
    if (this.userList.length < 1) {
      console.log('users Not Found');
      return;
    }
    if (!this.selectedBadge) {
      console.log('Selected Badge Not Found');
      return;
    }
    if (this.analyteList.length < 1) {
      console.log('Analytes Not Found');
      return;
    }
    if (this.analyzedTokenReportList.length < 1) {
      console.log('analyzed Token Reports Not Found');
      return;
    }
    if (!this.analyst) {
      console.log('analyst Not Found');
      return;
    }

    console.log('All Checks Performed');
    this.determineEvaluations();

    if (this.labReportedValue) {
      this.formLoaded = true;
    } else {
      this.modalWindow.setModalContext('There are no analyzed values for this badge.');
    }
  }

  // Create subscriptions that the component will need.
  ngOnInit(): void {
    this.evaluationsMade = false;
    this.setElapsedTime();
    // Get analyte info.
    this.gridService.AnalyteResponse().subscribe((value) => {
      this.analyteList = value;
      },
      (err) => {
        console.log(err);
      },
      () => {
        this.checkFormReadyToLoad();
      });

    this.badgeService.getLocationList().subscribe((value) =>
      {
        if (value){
          this.locations = value;
        }
      },
      (err) => {
        console.log(err);
      },
      () => {
          this.checkFormReadyToLoad();
        }
      );

    this.badgeService.getAnalyzedTokenReportResponse(
      this.selectedBadge.badge_serial_number).subscribe((value) => {
        this.analyzedTokenReportList = value;
        this.analyzedTokenReportList = this.analyzedTokenReportList.filter(x => Number(x.recorded_value) > 0);
        if (this.analyzedTokenReportList.length === 0){
          this.modalWindow.setModalContext('There are no relevant values recorded for this badge.');
        }
      },
      (err) => {
        console.log(err);
      },
      () => {
        this.checkFormReadyToLoad();
    });

    this.badgeService.getUserList().subscribe((value) => {
      this.userList = value;
    },
      (err) => {},
      () => {
      this.checkFormReadyToLoad();
      });
    this.disclaimerInfo = this.getDefaultDisclaimer();
  }

  // The constant disclaimer string if no other string is utilized in the future.
  getDefaultDisclaimer(): string {
    return '\'<\' means the result is below the Reporting Limit (Quantification Limits) of the software. ' +
      'Exposure results are the average of the time period when reported by badge, or the average of the token when reported by ' +
      'individual tokens. Applicable OSHA and NIOSH PEL\'s, STEL\'s, and REL\'s are reported for reference only. These may not ' +
      'be sufficient for regulatory compliance. Clients should be aware that more stringent local, state, or international ' +
      'standards may be applicable. AiroTect/XploSafe make no claims as to the sufficiency of regulatory compliance, and each ' +
      'client should be aware of how their results correspond with legal exposure tracking requirements.';
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
