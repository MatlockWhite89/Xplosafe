import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';
import { UserResponseData } from '../../../database/Models/database.model.user';
import { HttpClient } from '@angular/common/http';
import { GridService } from '../../../services/agGrid.service';
import { Analyte } from '../../../database/Models/database.model.analyte';
import { catchError, tap } from 'rxjs/operators';
import { UserService } from '../../../services/user.service';
import { ModalWindowService } from '../../../services/modal-window.service';
import { environment } from '../../../../environments/environment';
import { ColumnDefsModel } from '../../../shared/column-defs.model';

@Component({
  selector: 'app-analyte-exposure',
  templateUrl: './analyte-exposure.component.html',
  styleUrls: ['./analyte-exposure.component.css'],
})
export class AnalyteExposureComponent implements OnInit, OnDestroy {
  // The organization selection form group.
  organizationSelection = new FormGroup({
    analyteOrganization: new FormControl(),
  });

  // The analyte Data form group.
  analyteInformation = new FormGroup({
    oshaPPMValue: new FormControl(),
    oshaMgValue: new FormControl(),
    twaValue: new FormControl(),
    twaStValue: new FormControl(),
    twaCValue: new FormControl(),
    osuSamplingRateValue: new FormControl(),
    detectionLimitValue: new FormControl(),
    analytes: new FormControl(),
    detectionUnits: new FormControl(),
    molecularWeight: new FormControl(),
  });

  // Form Values
  twaValue: string;
  twaStValue: string;
  twaCValue: string;
  oshaPPMValue: string;
  oshaMgValue: string;
  detectionLimit: string;
  osuSamplingRate: string;
  selectedCasNumber: string;
  molecularWeight: string;
  selectedAnalyte: Analyte;

  showForm = false;
  responseData: [UserResponseData];
  User = new BehaviorSubject<UserResponseData>(null);
  selectedOrganization: number;
  analytesList: any;
  samplingRateList: any;
  subscriptions: Subscription;
  rowSelectionSub: Subscription;
  userSelection: boolean;
  gridSelection: boolean;
  valueHasBeenReset: boolean;

  // This sets up the default values and subscriptions for the analyte exposure component.
  constructor(
    private http: HttpClient,
    private agGridService: GridService,
    private userService: UserService,
    private modalService: ModalWindowService
  ) {
    this.subscriptions = new Subscription();
    this.rowSelectionSub = new Subscription();
    this.agGridService.setGridType(null);

    this.selectedAnalyte = null;
    this.selectedCasNumber = '';
    this.oshaPPMValue = '';
    this.oshaMgValue = '';
    this.twaCValue = '';
    this.twaStValue = '';
    this.twaValue = '';
    this.osuSamplingRate = '';
    this.detectionLimit = '';
    this.userSelection = false;
    this.gridSelection = false;
    this.valueHasBeenReset = false;

    this.selectedOrganization = 0;
    this.analyteInformation.controls.detectionUnits.setValue(1);
  }

  // Sets the selected analyte based on the grid selection.
  setSelectedAnalyte(): void {
    const data = this.agGridService.getSelectedRow() as Analyte;
    this.selectedAnalyte = data;
    this.showSelectedAnalyte();
  }

  // Displays the selected analytes values into the input boxes for easy manipulation.
  showSelectedAnalyte(): void {
    this.analyteInformation.controls.detectionUnits.setValue(1);
    if (!this.selectedAnalyte) {
      return;
    }
    if (!this.userSelection) {
      this.analyteInformation.controls.analytes.setValue(
        this.selectedAnalyte.cas_number
      );
    }
    this.analyteInformation.controls.oshaPPMValue.setValue(
      this.selectedAnalyte.osha_pel_ppm
    );
    this.analyteInformation.controls.oshaMgValue.setValue(
      this.selectedAnalyte.osha_pel_mg
    );
    this.analyteInformation.controls.molecularWeight.setValue(
      this.selectedAnalyte.molecular_weight
    );
    if (this.selectedOrganization.toString() === '1') {
      this.analyteInformation.controls.twaValue.setValue(
        this.selectedAnalyte.cal_osha_pel_8_hour_twa
      );
      this.analyteInformation.controls.twaStValue.setValue(
        this.selectedAnalyte.cal_osha_pel_8_hour_twa_st
      );
      this.analyteInformation.controls.twaCValue.setValue(
        this.selectedAnalyte.cal_osha_pel_8_hour_twa_c
      );
    } else if (this.selectedOrganization.toString() === '2') {
      this.analyteInformation.controls.twaValue.setValue(
        this.selectedAnalyte.niosh_rel_10_hour_twa
      );
      this.analyteInformation.controls.twaStValue.setValue(
        this.selectedAnalyte.niosh_rel_10_hour_twa_st
      );
      this.analyteInformation.controls.twaCValue.setValue(
        this.selectedAnalyte.niosh_rel_10_hour_twa_c
      );
    } else if (this.selectedOrganization.toString() === '3') {
      this.analyteInformation.controls.twaValue.setValue(
        this.selectedAnalyte.acgih_2019_tlv_8_hour_twa
      );
      this.analyteInformation.controls.twaStValue.setValue(
        this.selectedAnalyte.acgih_2019_tlv_8_hour_twa_st
      );
      this.analyteInformation.controls.twaCValue.setValue(
        this.selectedAnalyte.acgih_2019_tlv_8_hour_twa_c
      );
    }
    this.analyteInformation.controls.osuSamplingRateValue.setValue(
      this.selectedAnalyte.osu_6_sampling_rate
    );

    // If there is no detection Limit specified (**New Information** AKA reporting Limit) replace with:
    // ACGIH value first and OSHA pel PPM if no ACGIH value is present.
    if (!this.selectedAnalyte.detection_limit) {
      if (this.selectedAnalyte.acgih_2019_tlv_8_hour_twa) {
        this.analyteInformation.controls.detectionLimitValue.setValue(
          this.selectedAnalyte.acgih_2019_tlv_8_hour_twa
        );
      } else {
        this.analyteInformation.controls.detectionLimitValue.setValue(
          this.selectedAnalyte.osha_pel_ppm
        );
      }
    } else {
      this.analyteInformation.controls.detectionLimitValue.setValue(
        this.selectedAnalyte.detection_limit
      );
    }

    this.userSelection = false;
    this.gridSelection = false;
    this.analyteInformation.controls.detectionUnits.setValue(1);
  }

  // Updates the Analyte based off of input.
  updateAnalyte(): void {
    if (!this.selectedCasNumber || !this.selectedAnalyte) {
      console.log('something went wrong.');
      return;
    }
    const sub = new Subscription();
    sub.add(
      this.http
        .post<any>(`${environment.apiUrl}/updateAnalyte`, {
          osha_pel_ppm: this.selectedAnalyte.osha_pel_ppm,
          osha_pel_mg: this.selectedAnalyte.osha_pel_mg,
          cal_osha_pel_8_hour_twa: this.selectedAnalyte.cal_osha_pel_8_hour_twa,
          cal_osha_pel_8_hour_twa_st: this.selectedAnalyte
            .cal_osha_pel_8_hour_twa_st,
          cal_osha_pel_8_hour_twa_c: this.selectedAnalyte
            .cal_osha_pel_8_hour_twa_c,
          niosh_rel_10_hour_twa: this.selectedAnalyte.niosh_rel_10_hour_twa,
          niosh_rel_10_hour_twa_st: this.selectedAnalyte
            .niosh_rel_10_hour_twa_st,
          niosh_rel_10_hour_twa_c: this.selectedAnalyte.niosh_rel_10_hour_twa_c,
          acgih_2019_tlv_8_hour_twa: this.selectedAnalyte
            .acgih_2019_tlv_8_hour_twa,
          acgih_2019_tlv_8_hour_twa_st: this.selectedAnalyte
            .acgih_2019_tlv_8_hour_twa_st,
          acgih_2019_tlv_8_hour_twa_c: this.selectedAnalyte
            .acgih_2019_tlv_8_hour_twa_c,
          cas_number: this.selectedCasNumber,
          reporting_limit: this.detectionLimit,
          molecular_weight: this.selectedAnalyte.molecular_weight,
        })
        .pipe(
          catchError((err) => this.agGridService.handleError(err)),
          tap((resData) => {})
        )
        .subscribe(
          (value) => {},
          (err) => {
            this.agGridService.handleError(err);
          },
          () => {
            sub.unsubscribe();
          }
        )
    );
  }

  // Sends the updated Sampling Rate Values to the backend.
  updateSamplingRate(): void {
    if (!this.selectedCasNumber || !this.selectedAnalyte) {
      console.log('something went wrong.');
      return;
    }
    const sub = new Subscription();
    sub.add(
      this.http
        .post<any>(`${environment.apiUrl}/updateSamplingRate`, {
          osu_6_sampling_rate: this.selectedAnalyte.osu_6_sampling_rate,
          detection_limit: this.selectedAnalyte.detection_limit,
          cas_number: this.selectedCasNumber,
        })
        .pipe(
          catchError((err) => this.agGridService.handleError(err)),
          tap((resData) => {})
        )
        .subscribe(
          (value) => {},
          (err) => {
            this.agGridService.handleError(err);
          },
          () => {
            this.agGridService.setGridType(2);
            sub.unsubscribe();
          }
        )
    );
  }

  // Defines the ColumnDefs that will be displayed on the grid based on the selected Organization.
  buildCols(): void {
    // ColumnDefsModel.GetCachedColumnDefinition()
    const colDefs = [];
    colDefs.push(
      {
        headerName: 'Analyte Name',
        field: 'analyte_name',
        width: 150,
        height: 50,
        sortable: true,
        visible: true,
        resizable: true,
        filter: 'agTextColumnFilter',
        filterParams: ColumnDefsModel.nameFilterParams,
      },
      {
        headerName: 'CAS Number',
        field: 'cas_number',
        width: 150,
        height: 50,
        sortable: true,
        visible: true,
        resizable: true,
        filter: 'agTextColumnFilter',
        filterParams: ColumnDefsModel.nameFilterParams,
      },
      {
        headerName: 'Molecular Weight',
        field: 'molecular_weight',
        width: 150,
        height: 50,
        sortable: true,
        visible: true,
        resizable: true,
        filter: 'agNumberColumnFilter',
        filterParams: ColumnDefsModel.numberFilterParams,
      },
      {
        headerName: 'OSHA pel PPM',
        field: 'osha_pel_ppm',
        width: 150,
        height: 50,
        sortable: true,
        visible: true,
        resizable: true,
        filter: 'agTextColumnFilter',
        filterParams: ColumnDefsModel.nameFilterParams,
      },
      {
        headerName: 'OSHA pel mg/m3',
        field: 'osha_pel_mg',
        width: 150,
        height: 50,
        sortable: true,
        visible: true,
        resizable: true,
        filter: 'agNumberColumnFilter',
        filterParams: ColumnDefsModel.numberFilterParams,
      }
    );

    if (this.selectedOrganization.toString() === '1') {
      // Osha
      colDefs.push(
        {
          headerName: 'Osha 8 Hour TWA',
          field: 'cal_osha_pel_8_hour_twa',
          width: 150,
          height: 50,
          sortable: true,
          visible: true,
          resizable: true,
          filter: 'agNumberColumnFilter',
          filterParams: ColumnDefsModel.numberFilterParams,
        },
        {
          headerName: 'Osha 8 Hour TWA (ST)',
          field: 'cal_osha_pel_8_hour_twa_st',
          width: 150,
          height: 50,
          sortable: true,
          visible: true,
          resizable: true,
          filter: 'agNumberColumnFilter',
          filterParams: ColumnDefsModel.numberFilterParams,
        },
        {
          headerName: 'Osha 8 Hour TWA (C)',
          field: 'cal_osha_pel_8_hour_twa_c',
          width: 150,
          height: 50,
          sortable: true,
          visible: true,
          resizable: true,
          filter: 'agNumberColumnFilter',
          filterParams: ColumnDefsModel.numberFilterParams,
        }
      );
    } else if (this.selectedOrganization.toString() === '2') {
      // Niosh
      colDefs.push(
        {
          headerName: 'NIOSH 10 Hour TWA',
          field: 'niosh_rel_10_hour_twa',
          width: 150,
          height: 50,
          sortable: true,
          visible: true,
          resizable: true,
          filter: 'agNumberColumnFilter',
          filterParams: ColumnDefsModel.numberFilterParams,
        },
        {
          headerName: 'NIOSH 10 Hour TWA (ST)',
          field: 'niosh_rel_10_hour_twa_st',
          width: 100,
          height: 50,
          sortable: true,
          visible: true,
          resizable: true,
          filter: 'agNumberColumnFilter',
          filterParams: ColumnDefsModel.numberFilterParams,
        },
        {
          headerName: 'NIOSH 10 Hour TWA (C)',
          field: 'niosh_rel_10_hour_twa_c',
          width: 150,
          height: 50,
          sortable: true,
          visible: true,
          resizable: true,
          filter: 'agNumberColumnFilter',
          filterParams: ColumnDefsModel.numberFilterParams,
        }
      );
    } else if (this.selectedOrganization.toString() === '3') {
      // ACGIH
      colDefs.push(
        {
          headerName: 'ACGIH 8 Hour TWA',
          field: 'acgih_2019_tlv_8_hour_twa',
          width: 150,
          height: 50,
          sortable: true,
          visible: true,
          resizable: true,
          filter: 'agNumberColumnFilter',
          filterParams: ColumnDefsModel.numberFilterParams,
        },
        {
          headerName: 'ACGIH 8 Hour TWA (ST)',
          field: 'acgih_2019_tlv_8_hour_twa_st',
          width: 100,
          height: 50,
          sortable: true,
          visible: true,
          resizable: true,
          filter: 'agNumberColumnFilter',
          filterParams: ColumnDefsModel.numberFilterParams,
        },
        {
          headerName: 'ACGIH 8 Hour TWA (C)',
          field: 'acgih_2019_tlv_8_hour_twa_c',
          width: 150,
          height: 50,
          sortable: true,
          visible: true,
          resizable: true,
          filter: 'agNumberColumnFilter',
          filterParams: ColumnDefsModel.numberFilterParams,
        }
      );
    } else {
      console.log('Was not able to correlate organization');
    }
    colDefs.push(
      {
        headerName: 'Sampling Rate mL/min',
        field: 'osu_6_sampling_rate',
        width: 150,
        height: 50,
        sortable: true,
        visible: true,
        resizable: true,
        filter: 'agNumberColumnFilter',
        filterParams: ColumnDefsModel.numberFilterParams,
      },
      {
        headerName: 'Reporting Limit',
        field: 'reporting_limit',
        width: 150,
        height: 50,
        sortable: true,
        visible: true,
        resizable: true,
        filter: 'agNumberColumnFilter',
        filterParams: ColumnDefsModel.numberFilterParams,
      }
    );

    this.agGridService.setCols(colDefs);
    this.agGridService.setRows(this.analytesList);
  }

  // Performs front end check to ensure that the updated values the user has input are valid before performing updateAnalyte().
  updateAnalyteCheck(): void {
    this.selectedCasNumber = this.analyteInformation.controls.analytes.value;
    this.selectedAnalyte = null;
    this.selectedAnalyte = this.analytesList.filter(
      (x) => x.cas_number === this.selectedCasNumber
    ) as Analyte;
    if (!this.selectedAnalyte) {
      console.log('could not locate the selected analyte');
      return;
    }

    this.molecularWeight = this.analyteInformation.controls.molecularWeight
      .value
      ? this.analyteInformation.controls.molecularWeight.value
      : null;
    this.twaValue = this.analyteInformation.controls.twaValue.value
      ? this.analyteInformation.controls.twaValue.value
      : null;
    this.twaStValue = this.analyteInformation.controls.twaStValue.value
      ? this.analyteInformation.controls.twaStValue.value
      : null;
    this.twaCValue = this.analyteInformation.controls.twaCValue.value
      ? this.analyteInformation.controls.twaCValue.value
      : null;
    this.oshaMgValue = this.analyteInformation.controls.oshaMgValue.value
      ? this.analyteInformation.controls.oshaMgValue.value
      : null;
    this.oshaPPMValue = this.analyteInformation.controls.oshaPPMValue.value
      ? this.analyteInformation.controls.oshaPPMValue.value
      : null;
    this.osuSamplingRate = this.analyteInformation.controls.osuSamplingRateValue
      .value
      ? this.analyteInformation.controls.osuSamplingRateValue.value
      : null;
    this.detectionLimit = this.analyteInformation.controls.detectionLimitValue
      .value
      ? this.analyteInformation.controls.detectionLimitValue.value
      : null;
    if (this.detectionLimit) {
      // Conversion of detection Limit from PPB to PPM.
      this.detectionLimit = (
        Number(this.detectionLimit) /
        this.analyteInformation.controls.detectionUnits.value
      ).toString();
    }

    if (!this.twaValue) {
      this.twaValue = null;
    }
    if (!this.twaStValue) {
      this.twaStValue = null;
    }
    if (!this.twaCValue) {
      this.twaCValue = null;
    }
    if (!this.oshaMgValue) {
      this.oshaMgValue = null;
    }
    if (!this.oshaPPMValue) {
      this.oshaPPMValue = null;
    }
    if (!this.osuSamplingRate) {
      this.osuSamplingRate = null;
    }
    if (!this.detectionLimit) {
      this.detectionLimit = null;
    }

    this.selectedAnalyte.osha_pel_ppm = this.oshaPPMValue;
    this.selectedAnalyte.osha_pel_mg = this.oshaMgValue;
    this.selectedAnalyte.osu_6_sampling_rate = this.osuSamplingRate;
    this.selectedAnalyte.detection_limit = this.detectionLimit;
    this.selectedAnalyte.cas_number = this.selectedCasNumber;
    this.selectedAnalyte.molecular_weight = this.molecularWeight;
    switch (this.selectedOrganization.toString()) {
      case '1':
        this.selectedAnalyte.cal_osha_pel_8_hour_twa = this.twaValue;
        this.selectedAnalyte.cal_osha_pel_8_hour_twa_st = this.twaStValue;
        this.selectedAnalyte.cal_osha_pel_8_hour_twa_c = this.twaCValue;
        break;
      case '2':
        this.selectedAnalyte.niosh_rel_10_hour_twa = this.twaValue;
        this.selectedAnalyte.niosh_rel_10_hour_twa_st = this.twaStValue;
        this.selectedAnalyte.niosh_rel_10_hour_twa_c = this.twaCValue;
        break;
      case '3':
        this.selectedAnalyte.acgih_2019_tlv_8_hour_twa = this.twaValue;
        this.selectedAnalyte.acgih_2019_tlv_8_hour_twa_st = this.twaStValue;
        this.selectedAnalyte.acgih_2019_tlv_8_hour_twa_c = this.twaCValue;
        break;
    }

    this.checkUndefinedValues();
    this.updateAnalyte();
    this.updateSamplingRate();
    this.modalService.setModalContext('Analyte Values have been updated.');
    this.resetPageParameters();
  }

  // Since some of the values in the DB will be null, they will become undefined when pulled in we need to ensure that those values
  // are marked null in order to update the DB. The following function (checkUndefinedValues()) is used for that reason.
  checkUndefinedValues(): void {
    if (!this.selectedAnalyte.osha_pel_ppm) {
      this.selectedAnalyte.osha_pel_ppm = null;
    }
    if (!this.selectedAnalyte.osha_pel_mg) {
      this.selectedAnalyte.osha_pel_mg = null;
    }
    if (!this.selectedAnalyte.cal_osha_pel_8_hour_twa) {
      this.selectedAnalyte.cal_osha_pel_8_hour_twa = null;
    }
    if (!this.selectedAnalyte.cal_osha_pel_8_hour_twa_st) {
      this.selectedAnalyte.cal_osha_pel_8_hour_twa_st = null;
    }
    if (!this.selectedAnalyte.cal_osha_pel_8_hour_twa_c) {
      this.selectedAnalyte.cal_osha_pel_8_hour_twa_c = null;
    }
    if (!this.selectedAnalyte.niosh_rel_10_hour_twa) {
      this.selectedAnalyte.niosh_rel_10_hour_twa = null;
    }
    if (!this.selectedAnalyte.niosh_rel_10_hour_twa_st) {
      this.selectedAnalyte.niosh_rel_10_hour_twa_st = null;
    }
    if (!this.selectedAnalyte.niosh_rel_10_hour_twa_c) {
      this.selectedAnalyte.niosh_rel_10_hour_twa_c = null;
    }
    if (!this.selectedAnalyte.acgih_2019_tlv_8_hour_twa) {
      this.selectedAnalyte.acgih_2019_tlv_8_hour_twa = null;
    }
    if (!this.selectedAnalyte.acgih_2019_tlv_8_hour_twa_st) {
      this.selectedAnalyte.acgih_2019_tlv_8_hour_twa_st = null;
    }
    if (!this.selectedAnalyte.acgih_2019_tlv_8_hour_twa_c) {
      this.selectedAnalyte.acgih_2019_tlv_8_hour_twa_c = null;
    }
    if (!this.selectedAnalyte.detection_limit) {
      this.selectedAnalyte.detection_limit = null;
    }
    if (!this.selectedAnalyte.osu_6_sampling_rate) {
      this.selectedAnalyte.osu_6_sampling_rate = null;
    }
    if (!this.selectedAnalyte.molecular_weight) {
      this.selectedAnalyte.molecular_weight = null;
    }
  }

  // Clears the input fields leaving the selected organization.
  resetPageParameters(): void {
    this.agGridService.setGridType(2);
    this.analytesList = this.agGridService.getRows();
    this.selectedAnalyte.analyte_name = this.analytesList.find(
      (x) => x.cas_number === this.selectedCasNumber
    ).analyte_name;
    const index = this.analytesList.findIndex(
      (x) => x.cas_number === this.selectedCasNumber
    );
    this.analytesList[index] = this.selectedAnalyte as Analyte;
    this.analyteInformation.reset();
    this.selectedAnalyte = null;
    this.selectedCasNumber = '';
    this.oshaPPMValue = '';
    this.oshaMgValue = '';
    this.twaCValue = '';
    this.twaStValue = '';
    this.twaValue = '';
    this.osuSamplingRate = '';
    this.detectionLimit = '';
    this.analyteInformation.controls.detectionUnits.setValue(1);
  }

  // Request the Analyte List, Sample Detection List values from the server
  ngOnInit(): void {
    this.agGridService.AnalyteResponse().subscribe(
      (value) => {
        this.analytesList = value;
      },
      (err) => {
        console.log(err);
      },
      () => {}
    );

    this.agGridService.SamplingRateResponse().subscribe(
      (value) => {
        this.samplingRateList = value;
      },
      (err) => {
        console.log(err);
      },
      () => {}
    );

    // subscribe to the row selection from the agGridService and populate appropriate fields.
    this.agGridService.rowSelected.subscribe(
      (value) => {
        if (value) {
          this.gridSelection = true;
          this.setSelectedAnalyte();
        } else {
          this.analyteInformation.reset();
        }
      },
      (err) => {
        console.log(err);
      },
      () => {}
    );

    // subscribe to the organization Selection from the form control.
    this.organizationSelection.controls.analyteOrganization.valueChanges.subscribe(
      (value) => {
        this.selectedOrganization = this.organizationSelection.controls.analyteOrganization.value;
        this.buildCols();
        this.agGridService.setGridType(2);
      },
      (err) => {
        console.log(err);
      },
      () => {}
    );

    // subscribe to the analyte selection from the form control and populate appropriate fields.
    this.analyteInformation.controls.analytes.valueChanges.subscribe(
      (value) => {
        if (!this.gridSelection) {
          if (value && value !== 'null') {
            this.selectedAnalyte = this.analytesList.filter(
              (x) => x.cas_number === value
            )[0] as Analyte;
            this.userSelection = true;
            this.checkUndefinedValues();
            this.showSelectedAnalyte();
          } else {
            if (!this.valueHasBeenReset) {
              this.valueHasBeenReset = true;
              this.analyteInformation.reset();
            } else {
              this.valueHasBeenReset = false;
            }
          }
        }
      },
      (err) => {
        console.log(err);
      },
      () => {}
    );

    this.organizationSelection.controls.analyteOrganization.setValue(1);
    this.selectedOrganization = 1;
    this.analyteInformation.controls.detectionUnits.setValue(1);
  }

  // Unsubscribe from all subscriptions.
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.rowSelectionSub.unsubscribe();
  }
}
