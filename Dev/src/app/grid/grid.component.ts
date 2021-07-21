import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GridService } from '../services/agGrid.service';
import { Observable, Subscription } from 'rxjs';
import { RoleResponseData } from '../database/Models/database.model.role';
import {
  Badge,
  BadgeResponseData,
} from '../database/Models/database.model.badge';
import {
  Data,
  DataTableResponseData,
} from '../database/Models/database.model.data';
import {
  Analyte,
  AnalyteResponseData,
} from '../database/Models/database.model.analyte';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { BadgeService } from '../services/badge.service';
import DateTimeFormat = Intl.DateTimeFormat;
import {Custom, CustomResponseData} from '../database/Models/database.model.custom';
import { LoginService } from '../services/login.service';
import { FormControl, FormGroup } from '@angular/forms';
import { GridApi, GridOptions} from 'ag-grid';
import { User, UserResponseData } from '../database/Models/database.model.user';
import { ModalWindowService } from '../services/modal-window.service';
import { UserService } from '../services/user.service';
import { DatabaseModelLocation, LocationResponseData } from '../database/Models/database.model.location';
import { GraphService } from '../services/graph.service';
import { AuditResponseData } from '../database/Models/database.model.audit';

@Component({
  selector: 'app-grid',
  styleUrls: ['./grid.component.css'],
  templateUrl: './grid.component.html',
})
export class GridComponent implements OnInit, OnDestroy {
  gridForm = new FormGroup({
    columnSelection: new FormControl(),
  });
  dateForm = new FormGroup({
    beginningTime: new FormControl(),
    endingTime: new FormControl(),
    desiredValue: new FormControl(),
  });

  @Input() highlightSelectedRow = false;
  gridApi: GridApi;
  legendMembers: any;
  subscriptions: Subscription;
  gridOptions: GridOptions;
  displayLegend: boolean;
  gridIsSetup: boolean;
  columnSelections: any;
  selectedItems: any;
  columnDefs: any;
  rowData: any;
  unalteredRowData: any;
  foundAnalyteList: any;
  error: string = null;
  height = 500;
  width = 1000;
  rowSelection: any;
  gridType: number;
  showSubComponent = false;
  loggingOut = false;
  dropDownSettings = {};
  disabled: boolean;
  cssWrapperOverrideValue: string;
  cssArticleOverride: string;
  isDateFilterCollapsed = true;
  modules = [ClientSideRowModelModule];
  desiredValue: string;
  showPareto = false;
  showHistogram = false;

  constructor(
    private agGridService: GridService,
    private badgeService: BadgeService,
    private router: Router,
    private loginService: LoginService,
    private modalService: ModalWindowService,
    private userService: UserService,
    private graphService: GraphService,
  ) {
    this.cssWrapperOverrideValue = 'base-wrapper';
    this.gridIsSetup = false;
    this.displayLegend = false;
    this.disabled = true;
    this.subscriptions = new Subscription();
    this.columnSelections = [];
    this.selectedItems = [];
    this.legendMembers = [];
    this.foundAnalyteList = [];
    this.desiredValue = '';
    this.gridOptions = {
      context: {
        componentParent: this,
      },
      columnDefs: null,
      rowData: null,
    };

    const unsubSub = this.agGridService.unsubscribeValue.subscribe((value) => {
      // console.log('Received the signal to reset subscriptions the grid.');
      if (value) {
        this.resetSubscriptions();
      }
    });

    const csvSub = this.agGridService.printCSV.subscribe((value) => {
      if (value) {
        this.gridApi.exportDataAsCsv(this.rowData);
        this.agGridService.setPrintCSV(false);
      }
    });

    const dsvsub = this.agGridService.printDSV.subscribe((value) => {
      if (value) {
        this.exportText();
        this.agGridService.setPrintDSV(false);
      }
    });

    const beginningDateSub = this.dateForm.controls.beginningTime.valueChanges.subscribe(
      (value) => {
        this.evaluateRowData();
      }
    );
    const endingDateSub = this.dateForm.controls.endingTime.valueChanges.subscribe(
      (value) => {
        this.evaluateRowData();
      }
    );

    this.subscriptions.add(beginningDateSub);
    this.subscriptions.add(endingDateSub);
    this.subscriptions.add(unsubSub);
    this.subscriptions.add(csvSub);
    this.subscriptions.add(dsvsub);
  }

  ngOnInit(): void {
    this.columnSelections = [];
    this.selectedItems = [];
    this.dropDownSettings = {
      singleSelection: false,
      idField: 'columnIndex',
      textField: 'columnName',
      selectAlltext: 'Select All',
      // Adding the following will cause the Max number of directive "Function Calls" to exceed the allotted limit of 3
      unSelectAllText: 'Un-Select All',
      itemsShowLimit: 2,
      allowSearchFilter: true,
    };

    this.rowSelection = this.highlightSelectedRow ? 'multiple' : 'single';
    this.gridType = null;
    const gridSub = this.agGridService.gridTypeDisplay.subscribe((value) => {
      this.gridType = this.agGridService.getGridType();
      this.changeGrid();
    });

    this.subscriptions.add(gridSub);
  }

  // Sets the Grid API to the params api.
  onGridReady(params): void {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
  }

  // Reset the BeginningTime date picker value.
  beginningReset(): void {
    this.dateForm.controls.beginningTime.reset();
  }

  // Reset the EndingTime date picker value.
  endingReset(): void {
    this.dateForm.controls.endingTime.reset();
  }

  // Single Click registration event data manipulation.
  // Changes the rowSelected value on the Grid Service which will then publish the info to all other components listening.
  onRowClick(event: any): void {
    switch (this.gridType) {
      case 0:
        // custom grid data.
        break;
      case 1:
        break;
      case 2:
        //  Analyte Exposure data.
        // const analyte = new Analyte();
        // analyte.id = event.data.id;
        // analyte.cas_number = event.data.cas_number;
        // analyte.analyte_name = event.data.analyte_name;
        // analyte.data_table_id = event.data.data_table_id;
        // analyte.chemical_class_id = event.data.chemical_class_id;
        // analyte.date_last_updated = event.data.date_last_updated;
        // analyte.cal_osha_pel_8_hour_twa_c =
        //   event.data.cal_osha_pel_8_hour_twa_c;
        // analyte.cal_osha_pel_8_hour_twa_st =
        //   event.data.cal_osha_pel_8_hour_twa_st;
        // analyte.cal_osha_pel_8_hour_twa = event.data.cal_osha_pel_8_hour_twa;
        // analyte.osha_pel_mg = event.data.osha_pel_mg;
        // analyte.osha_pel_ppm = event.data.osha_pel_ppm;
        // analyte.niosh_rel_10_hour_twa = event.data.niosh_rel_10_hour_twa;
        // analyte.niosh_rel_10_hour_twa_c = event.data.niosh_rel_10_hour_twa_c;
        // analyte.niosh_rel_10_hour_twa_st = event.data.niosh_rel_10_hour_twa_st;
        // analyte.acgih_2019_tlv_8_hour_twa =
        //   event.data.acgih_2019_tlv_8_hour_twa;
        // analyte.acgih_2019_tlv_8_hour_twa_st =
        //   event.data.acgih_2019_tlv_8_hour_twa_st;
        // analyte.acgih_2019_tlv_8_hour_twa_c =
        //   event.data.acgih_2019_tlv_8_hour_twa_c;
        // analyte.osu_6_sampling_rate = event.data.osu_6_sampling_rate;
        // analyte.detection_limit = event.data.detection_limit;
        // this.agGridService.setSelectedRow(analyte);
        break;
      case 3:
        break;
      case 4:
        break;
      case 5:
      // User Management
      // const userData = new User();
      // userData.id = event.data.id;
      // userData.role = event.data.role;
      // userData.location_id = event.data.location_id;
      // userData.username = event.data.username;
      // const selectedUser = this.agGridService.getSelectedRow() as User;
      // if (
      //   selectedUser !== undefined &&
      //   selectedUser !== null &&
      //   userData.id === selectedUser.id
      // ) {
      //   this.agGridService.setSingleClickSelectedRow(null);
      // } else {
      //   this.agGridService.setSingleClickSelectedRow(userData);
      // }
      // break;
      default:
        break;
    }
  }

  // Double Click registration event data manipulation.
  // Changes the rowSelected value on the Grid Service which will then publish the info to all other components listening.
  // This function acts as a facilitator to get the corresponding data and knows how it should be applied/manipulated.
  onRowDoubleClick(event: any): void {
    console.log('Row Has Been Double Clicked');
    switch (this.gridType) {
      case 0:
        // custom grid data.
        break;
      case 1:
      case 6:
      case 7:
      case 8:
      case 9:
      case 10:
      case 11:
      case 12:
        // badge grid data.
        const badgeData = new Badge();
        badgeData.id = event.data.id;
        badgeData.number_of_tokens = event.number_of_tokens;
        badgeData.assigned_user = event.data.assigned_user;
        badgeData.batch_group = event.data.batch_group;
        badgeData.badge_status = event.data.badge_status;
        badgeData.relative_humidity = event.data.relative_humidity;
        badgeData.temperature_celsius = event.data.temperature_celsius;
        badgeData.temperature_fahrenheit = event.data.temperature_fahrenheit;
        badgeData.notes = event.data.notes;
        badgeData.vapors_exposed = event.data.vapors_exposed;
        if (event.data.activated_time !== null) {
          badgeData.activated_time = event.data.activated_time.slice(0, 16);
        }
        if (event.data.turned_in_time !== null) {
          badgeData.turned_in_time = event.data.turned_in_time.slice(0, 16);
        }
        badgeData.badge_serial_number = event.data.badge_serial_number;
        badgeData.date_last_updated = event.date_last_updated;
        badgeData.date_created = event.date_created;

        if (
          this.agGridService.getSelectedRow() &&
          this.agGridService.getSelectedRow().id === badgeData.id
        ) {
          this.agGridService.setSelectedRow(null);
        } else {
          this.agGridService.setSelectedRow(badgeData);
        }
        break;
      case 2:
        //  Analyte Exposure data.
        const analyte = new Analyte();
        analyte.id = event.data.id;
        analyte.cas_number = event.data.cas_number;
        analyte.analyte_name = event.data.analyte_name;
        analyte.data_table_id = event.data.data_table_id;
        analyte.chemical_class_id = event.data.chemical_class_id;
        analyte.date_last_updated = event.data.date_last_updated;
        analyte.cal_osha_pel_8_hour_twa_c = event.data.cal_osha_pel_8_hour_twa_c;
        analyte.cal_osha_pel_8_hour_twa_st = event.data.cal_osha_pel_8_hour_twa_st;
        analyte.cal_osha_pel_8_hour_twa = event.data.cal_osha_pel_8_hour_twa;
        analyte.osha_pel_mg = event.data.osha_pel_mg;
        analyte.osha_pel_ppm = event.data.osha_pel_ppm;
        analyte.niosh_rel_10_hour_twa = event.data.niosh_rel_10_hour_twa;
        analyte.niosh_rel_10_hour_twa_c = event.data.niosh_rel_10_hour_twa_c;
        analyte.niosh_rel_10_hour_twa_st = event.data.niosh_rel_10_hour_twa_st;
        analyte.acgih_2019_tlv_8_hour_twa = event.data.acgih_2019_tlv_8_hour_twa;
        analyte.acgih_2019_tlv_8_hour_twa_st = event.data.acgih_2019_tlv_8_hour_twa_st;
        analyte.acgih_2019_tlv_8_hour_twa_c = event.data.acgih_2019_tlv_8_hour_twa_c;
        analyte.osu_6_sampling_rate = event.data.osu_6_sampling_rate;
        analyte.molecular_weight = event.data.molecular_weight;
        analyte.detection_limit = event.data.reporting_limit;
        if (
          this.agGridService.getSelectedRow() &&
          this.agGridService.getSelectedRow().analyte_name ===
            analyte.analyte_name
        ) {
          this.agGridService.setSelectedRow(null);
        } else {
          this.agGridService.setSelectedRow(analyte);
        }
        break;
      case 3:
        // Data table grid data.
        const data = new Data();
        data.id = event.data.id;
        data.analyst = event.data.analyst;
        data.analyst_id = event.data.analyst_id;
        data.wearer = event.data.wearer;
        data.wearer_id = event.data.wearer_id;
        data.badge_id = event.data.badge_id;
        data.badge_serial_number = event.data.badge_serial_number;
        data.data_table_type = event.data.data_table_type;
        data.raw_data_id = event.data.raw_data_id;
        data.raw_comments = event.data.raw_comments;
        data.raw_data = event.data.raw_data;
        data.original_filename = event.data.original_filename;
        if (this.agGridService.getSelectedRow() &&
          this.agGridService.getSelectedRow().id === data.id)
        {
          this.agGridService.setSelectedRow(null);
        } else {
          this.agGridService.setSelectedRow(event.data);
        }
        break;
      case 4:
        break;
      case 5:
        // User Management
        const userData = new User();
        userData.id = event.data.id;
        userData.role = event.data.role;
        userData.location_id = event.data.location_id;
        userData.username = event.data.username;
        if (
          this.agGridService.getSelectedRow() &&
          this.agGridService.getSelectedRow().id === userData.id
        ) {
          this.agGridService.setSelectedRow(null);
        } else {
          this.agGridService.setSelectedRow(userData);
        }
        break;
      case 13:
        const locationData = new DatabaseModelLocation();
        locationData.id = event.data.id;
        locationData.country = event.data.country;
        locationData.city = event.data.city;
        locationData.state = event.data.state;
        locationData.base = event.data.base;
        if (
          this.agGridService.getSelectedRow() &&
          this.agGridService.getSelectedRow().id === locationData.id
          ) {
            this.agGridService.setSelectedRow(null);
          } else {
            this.agGridService.setSelectedRow(locationData);
        }
        break;
      case 14:
        this.agGridService.setSelectedRow(null);
        break;
      default:
        break;
    }
  }

  // determines whether or not to display the grid.
  gridFormSetUp(): boolean {
    return this.gridIsSetup;
  }

  // Export the current grid as a Pole delimeted text file.
  exportText(): void {
    let exportString = '';
    for (const c of this.columnDefs) {
      if (c.visible){
      exportString += '' + c.headerName + '|';
      }
    }

    exportString += '\n';
    this.gridApi.selectAllFiltered();
    for (const r of this.gridApi.getSelectedRows()) {
      for (const c of this.columnDefs) {
        if (c.visible) {
          exportString += '' + r[c.field] + '|';
        }
      }
      exportString += '\n';
    }

    this.saveTextAsFile(exportString, 'DelimitedFile.txt');
    this.gridApi.deselectAllFiltered();
  }

  exportCSV(): void {
    this.gridApi.exportDataAsCsv(this.rowData);
  }

  // Deselect a single column definition for grid to display.
  setColumnViewDeSelect(eventObject: any): void {
    if (this.columnDefs === undefined || this.columnDefs === null) {
      return;
    }

    this.columnDefs[eventObject.columnIndex].visible = false;
    const newColDefs = [];
    for (const col of this.columnDefs) {
      if (col.visible) {
        newColDefs.push(col);
      }
    }

    this.gridOptions.api.setColumnDefs(newColDefs);
    this.gridOptions.api.sizeColumnsToFit();
  }

  // Select all column definitions for grid to display.
  setColumnViewSelectAll(eventObject: any): void {
    if (this.columnDefs === undefined || this.columnDefs === null) {
      return;
    }

    const newColDefs = [];
    for (const col of this.columnDefs) {
      col.visible = true;
      newColDefs.push(col);
    }

    this.gridOptions.api.setColumnDefs(newColDefs);
    this.gridOptions.api.sizeColumnsToFit();
  }

  // Unselect all column Definitions for grid to display.
  setColumnViewDeSelectAll(event: any): void {
    for (const col of this.columnDefs) {
      if (col.visible) {
        col.visible = false;
      }
    }

    this.gridOptions.api.setColumnDefs([]);
    this.gridOptions.api.sizeColumnsToFit();
  }

  // Allows the user to determine which column definitions to display on the grid.
  setColumnViewSelect(eventObject: any): void {
    if (this.columnDefs === undefined || this.columnDefs === null) {
      return;
    }

    this.columnDefs[eventObject.columnIndex].visible = true;
    const newColDefs = [];
    for (const col of this.columnDefs) {
      if (col.visible) {
        newColDefs.push(col);
      }
    }

    this.gridOptions.api.setColumnDefs(newColDefs);
    this.gridOptions.api.sizeColumnsToFit();
  }

  // Saves the grid as a .txt file.
  saveTextAsFile(data: string, filename: string): void {
    if (!data) {
      this.modalService.setModalContext(
        'No Data was presented to be exported as Delimited'
      );
      return;
    }

    if (!filename) {
      filename = 'DelimitedFile.txt';
    }
    const blob = new Blob([data], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(blob);
    downloadLink.setAttribute('download', filename);
    document.body.appendChild(downloadLink);
    downloadLink.click();
  }

  // Reformat the Date to be MySQL compliant.
  formatDate(value: Date): DateTimeFormat {
    const year = value.getFullYear();
    const month = value.getMonth();
    const day = value.getDay();
    const hour = value.getHours();
    const min = value.getMinutes();
    const newDate =
      '' + year + '-' + month + '-' + day + 'T' + hour + ':' + min;
    const r = new DateTimeFormat(newDate);
    return r;
  }

  // Evaluate the date range of the rows to determine which rows to display.
  evaluateGivenRange(evaluation: number, begin: Date, end: Date): void {
    const rowArray = [];
    for (const row of this.unalteredRowData) {
      // the date created is only applicaple for data regarding the Badge tables
      let rowCreated = new Date(row.date_created);
      if (!row.date_created) {
        // date last updated is used in all other tables
        rowCreated = new Date(row.date_last_updated);
      }
      switch (evaluation) {
        case 0:
          if (rowCreated && rowCreated < end && rowCreated > begin) {
            rowArray.push(row);
          }
          break;
        case 1:
          if (rowCreated && rowCreated > begin) {
            rowArray.push(row);
          }
          break;
        case 2:
          if (rowCreated && rowCreated < end) {
            rowArray.push(row);
          }
          break;
      }
    }

    this.rowData = rowArray;
  }

  // Determine the Row Data to display.
  evaluateRowData(): void {
    let begin = new Date(this.dateForm.controls.beginningTime.value);
    let end = new Date(this.dateForm.controls.endingTime.value);
    if (begin.getFullYear() < 2020) {
      begin = null;
    }
    if (end.getFullYear() < 2020) {
      end = null;
    }

    if (begin || end) {
      // set row data based on begin and end times
      if (begin && end) {
        // populate with given range
        this.evaluateGivenRange(0, begin, end);
      } else if (begin) {
        // populate all time after given period
        this.evaluateGivenRange(1, begin, end);
      } else {
        // populate with all times before given period
        this.evaluateGivenRange(2, begin, end);
      }
    } else {
      this.rowData = this.unalteredRowData;
    }
  }

  // Fill the containers width and height.
  fillExact(): void {
    // Determine True row data values
    this.gridOptions.api.setColumnDefs(this.columnDefs);
    this.gridOptions.api.sizeColumnsToFit();
    this.evaluateRowData();
    this.gridOptions.rowData = this.rowData;
    this.gridIsSetup = true;
  }

  // Reset the subscriptions.
  resetSubscriptions(): void {
    this.subscriptions.unsubscribe();
  }

  // Set the grid values back to the default values.
  resetGridValues(): void {
    this.rowData = [];
    this.columnDefs = [];
    this.columnSelections = [];
    this.selectedItems = [];
    this.legendMembers = [];
    this.agGridService.setSelectedRow(null);
    this.gridIsSetup = false;
  }

  changeGrid(): void {
    this.resetGridValues();
    switch (this.gridType) {
      case 0:
        // Custom Grid.
        this.cssWrapperOverrideValue = 'base-wrapper-1';
        this.cssArticleOverride = 'override-article-custom-data';
        this.populateCustomData();
        break;
      case 1:
      case 7:
      case 8:
      case 9:
      case 10:
      case 11:
      case 12:
        // Badge Grid.
        this.legendMembers = [];
        this.legendMembers.push({
          colourName: '#ff8080',
          legendName: 'Expired',
        });
        this.legendMembers.push({
          colourName: '#ffff99',
          legendName: 'Expires in 2 weeks',
        });
        this.legendMembers.push({
          colourName: '#389611',
          legendName: 'Not yet activated',
        });
        this.displayLegend = true;
        this.cssWrapperOverrideValue = 'base-wrapper-1';
        this.cssArticleOverride = 'override-article-badges';
        if (this.gridType === 1) { this.populateBadgeData(); }
        else if (this.gridType === 7) { this.populateWearerBadgeData(); }                      // Wearer All badges.
        else if (this.gridType === 12) { this.populateWearerBadgeDataByStatus(7); }      // Wearer Issue Component.
        else if (this.gridType === 9) { this.populateWearerBadgeDataByStatus(2); }       // Wearer Turn In Component.
        else if (this.gridType === 8) { this.populateSubordinantBadgeData(); }                 // Manager All Badges Used in Edit Component.
        else if (this.gridType === 10) { this.populateBadgeDataByStatus(1); }            // Manager Issue Component.
        else if (this.gridType === 11) { this.populateSubordinantBadgeDataByStatus(2); } // Manager Turn In Component.
        this.gridOptions.getRowStyle = (params) => {
          const expirationDate = new Date(
            params.data.expiration_date
          ).valueOf();
          const activatedTime = new Date(
            params.data.activated_time
          ).valueOf();
          const turnedInTime = new Date(
            params.data.turned_in_time
          ).valueOf();
          const date = new Date(Date.now()).valueOf();
          const interval = 60000 * 60 * 24 * 7 * 2;
          if (expirationDate <= date && !turnedInTime) {
            return { background: '#ff8080' };
          }
          else if (expirationDate - interval <= date && !turnedInTime) {
            return { background: '#ffff99' };
          }
          else if (!activatedTime) {
            return { background: '#389611' };
          }
        };
        break;
      case 2:
        // Analyte Grid.
        this.cssWrapperOverrideValue = 'base-wrapper-1';
        this.cssArticleOverride = 'override-article-analytes';
        this.populateAnalyteData();
        break;
      case 3:
        // Data Table Grid.
        this.cssWrapperOverrideValue = 'base-wrapper-1';
        this.cssArticleOverride = 'override-article-data-table';
        this.populateDataTableData();
        break;
      case 4:
        // Role Table Grid.
        this.cssWrapperOverrideValue = 'base-wrapper-1';
        this.cssArticleOverride = 'override-article-roles';
        this.populateRoleData();
        break;
      case 5:
        this.cssWrapperOverrideValue = 'base-wrapper-1';
        this.cssArticleOverride = 'override-article-subordinates';
        this.populateSubordinantData();
        break;
      case 6:
        this.subscriptions.add(this.agGridService.getFoundAnalytes().subscribe((value) => {
          this.foundAnalyteList = value;
          this.refineFoundAnalytes();
          this.cssWrapperOverrideValue = 'base-wrapper-1';
          this.cssArticleOverride = 'override-article-badges';
          this.populateBadgeDataByStatus(8);
        }));
        break;
      case 13:
        this.cssWrapperOverrideValue = 'base-wrapper-1';
        this.cssArticleOverride = 'override-article-badges';
        this.populateLocationData();
        break;
      case 14:
        this.cssWrapperOverrideValue = 'base-wrapper-1';
        this.cssArticleOverride = 'override-article-audits';
        this.populateAuditLogs();
        break;
      default:
        this.resetGridValues();
        break;
    }
  }

  // Populate the Data table Data (involves analyzed and raw Data).
  private populateDataTableData(): void {
    // tslint:disable-next-line:prefer-const
    let dataObs: Observable<DataTableResponseData>;
    dataObs = this.agGridService.DataTableResponse();
    const sub = dataObs.subscribe(
      (resData) => {
        console.log('Backend callback: next');
        const userIdKey = 'id';
        if (
          resData === null ||
          resData === undefined ||
          resData[0][userIdKey] === undefined ||
          resData[0][userIdKey] === null
        ) {
          this.columnDefs = this.createCols();
          this.unalteredRowData = [];
          this.fillExact();
        } else {
          if (resData[0][userIdKey] > 0) {
            this.columnDefs = this.createCols();
            this.unalteredRowData =
              this.agGridService.getRows().filter(x => x.original_filename !== null && x.original_filename !== undefined);
            this.fillExact();
          }
        }
      },
      (errorMessage) => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.loginService.setErrorCode(errorMessage.status);
      },
      () => {
        console.log(
          'Backend callback: complete. The Data should be displayed now.'
        );
      }
    );
    this.subscriptions.add(sub);
  }

  // Populate the Analyte Data.
  private populateAnalyteData(): void {
    // tslint:disable-next-line:prefer-const
    let analyteObs: Observable<AnalyteResponseData>;
    analyteObs = this.agGridService.AnalyteResponse();
    const sub = analyteObs.subscribe(
      (resData) => {
        console.log('Backend callback: next');
        const userIdKey = 'id';
        if (
          resData === null ||
          resData === undefined ||
          resData[0][userIdKey] === undefined ||
          resData[0][userIdKey] === null
        ) {
          this.columnDefs = this.createCols();
          this.unalteredRowData = [];
          this.fillExact();
        } else {
          if (resData[0][userIdKey] > 0) {
            this.columnDefs = this.createCols();
            this.unalteredRowData = this.agGridService.getRows();
            this.fillExact();
          }
        }
      },
      (errorMessage) => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.loginService.setErrorCode(errorMessage.status);
      },
      () => {
        console.log(
          'Backend callback: complete. The Data should be displayed now.'
        );
      }
    );

    this.subscriptions.add(sub);
  }

  // Populate Data based on user specified content parameters.
  private populateCustomData(): void {
    // tslint:disable-next-line:prefer-const
    let customObs: Observable<CustomResponseData>;
    customObs = this.agGridService.createCustomGrid();
    const sub = customObs.subscribe(
      (resData) => {
        console.log('Backend callback: next');
        this.columnDefs = this.createCols();
        this.unalteredRowData = this.agGridService.getRows();
        this.fillExact();
      },
      (errorMessage) => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.loginService.setErrorCode(errorMessage.status);
      },
      () => {
        console.log(
          'Backend callback: complete. The Data should be displayed now.'
        );
      }
    );

    this.subscriptions.add(sub);
  }

  // Format the Row data based on user input for custom grids.
  private formatRows(value: any): any {
    const newRows = [];
    for (const row of value) {
      newRows.push(row as Custom);
    }

    return value;
  }

  // Format the columns based on user input for custom grids.
  private formatColumns(value: any): any {
    this.gridIsSetup = true;
    return value;
  }

  // Populate Badge data.
  private populateBadgeData(): void {
    // tslint:disable-next-line:prefer-const
    let badgeObs: Observable<BadgeResponseData>;
    badgeObs = this.agGridService.BadgeResponse();
    const sub = badgeObs.subscribe(
      (resData) => {
        console.log('Backend callback: next');
        const userIdKey = 'id';
        if (
          resData === null ||
          resData === undefined ||
          resData[0][userIdKey] === undefined ||
          resData[0][userIdKey] === null
        ) {
          this.columnDefs = this.createCols();
          this.unalteredRowData = [];
          this.fillExact();
        } else {
          if (resData[0][userIdKey] > 0) {
            this.columnDefs = this.createCols();
            this.unalteredRowData = this.agGridService.getRows();
            this.fillExact();
          }
        }
      },
      (errorMessage) => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.loginService.setErrorCode(errorMessage.status);
      },
      () => {
        console.log(
          'Backend callback: complete. The Data should be displayed now.'
        );
      }
    );

    this.subscriptions.add(sub);
  }

  // Populate wearer Badge data.
  private populateWearerBadgeData(): void {
    if (this.userService.getActiveUser().role === 1) {
      const sub = this.agGridService.getWearerBadges(this.userService.getActiveUser().userId).subscribe(
        (resData) => {
          const userIdKey = 'id';
          if (!resData || !resData[0] || !resData[0][userIdKey]) {
            this.columnDefs = this.createCols();
            this.unalteredRowData = [];
            this.fillExact();
            console.log('There are no relevant Values');
          } else {
            if (resData[0][userIdKey] > 0) {
              this.columnDefs = this.createCols();
              this.unalteredRowData = this.agGridService.getRows();
              console.log('Values were found');
              this.fillExact();
            }
          }
        },
        (errorMessage) => {
          console.log(errorMessage);
          this.error = errorMessage;
          this.loginService.setErrorCode(errorMessage.status);
        },
        () => {
        }
      );

      this.subscriptions.add(sub);
    }
  }

  // Populate wearer Badge data based on status.
  private populateWearerBadgeDataByStatus(status: number): void {
    if (this.userService.getActiveUser().role === 1) {
      const sub = this.agGridService.getWearerBadgesByStatus(status).subscribe(
        (resData) => {
          const userIdKey = 'id';
          if (!resData || !resData[0] || !resData[0][userIdKey]) {
            this.columnDefs = this.createCols();
            this.unalteredRowData = [];
            this.fillExact();
            console.log('There are no relevant Values');
          } else {
            if (resData[0][userIdKey] > 0) {
              this.columnDefs = this.createCols();
              this.unalteredRowData = this.agGridService.getRows();
              console.log('Values were found');
              this.fillExact();
            }
          }
        },
        (errorMessage) => {
          console.log(errorMessage);
          this.error = errorMessage;
          this.loginService.setErrorCode(errorMessage.status);
        },
        () => {
        }
      );

      this.subscriptions.add(sub);
    }
  }

  // Populate Badge data based on passed in status.
  private populateBadgeDataByStatus(status: number): void {
    const sub = this.agGridService.getBadgeByStatus(status).subscribe(
      (resData) => {
        const userIdKey = 'id';
        if (!resData || !resData[0] || !resData[0][userIdKey])
        {
          this.columnDefs = this.createCols();
          this.unalteredRowData = [];
          this.fillExact();
        } else {
          if (resData[0][userIdKey] > 0) {
            this.columnDefs = this.createCols();
            this.unalteredRowData = this.agGridService.getRows();
            this.fillExact();
          }
        }
      },
      (errorMessage) => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.loginService.setErrorCode(errorMessage.status);
      },
      () => {}
    );

    this.subscriptions.add(sub);
  }

  // Populate Subordinants Badge data.
  private populateSubordinantBadgeData(): void {
    // tslint:disable-next-line:prefer-const
    let badgeObs: Observable<BadgeResponseData>;
    badgeObs = this.agGridService.getSubordinantBadges();
    const sub = badgeObs.subscribe(
      (resData) => {
        console.log('Backend callback: next');
        const userIdKey = 'id';
        if (!resData || !resData[0] || !resData[0][userIdKey]) {
          this.columnDefs = this.createCols();
          this.unalteredRowData = [];
          this.fillExact();
        } else {
          if (resData[0][userIdKey] > 0) {
            this.columnDefs = this.createCols();
            this.unalteredRowData = this.agGridService.getRows();
            this.fillExact();
          }
        }
      },
      (errorMessage) => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.loginService.setErrorCode(errorMessage.status);
      },
      () => {
        console.log(
          'Backend callback: complete. The Data should be displayed now.'
        );
      }
    );

    this.subscriptions.add(sub);
  }

  // Populate Subordinants Badge data based on desired badge Status.
  private populateSubordinantBadgeDataByStatus(status: number): void {
    // tslint:disable-next-line:prefer-const
    let badgeObs: Observable<BadgeResponseData>;
    badgeObs = this.agGridService.getSubordinantBadgesByStatus(status);
    const sub = badgeObs.subscribe(
      (resData) => {
        console.log('Backend callback: next');
        const userIdKey = 'id';
        if (!resData || !resData[0] || !resData[0][userIdKey]) {
          this.columnDefs = this.createCols();
          this.unalteredRowData = [];
          this.fillExact();
        } else {
          if (resData[0][userIdKey] > 0) {
            this.columnDefs = this.createCols();
            this.unalteredRowData = this.agGridService.getRows();
            this.fillExact();
          }
        }
      },
      (errorMessage) => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.loginService.setErrorCode(errorMessage.status);
      },
      () => {
        console.log(
          'Backend callback: complete. The Data should be displayed now.'
        );
      }
    );

    this.subscriptions.add(sub);
  }

  // Populate Subordinant Data.
  private populateSubordinantData(): void {
    // tslint:disable-next-line:prefer-const
    let roleObs: Observable<UserResponseData>;
    roleObs = this.agGridService.subordinatesResponse();
    const sub = roleObs.subscribe(
      (resData) => {
        console.log('Backend callback: next');
        const userIdKey = 'id';
        if (
          resData === undefined ||
          resData === null ||
          resData[0] === null ||
          resData[0] === undefined ||
          resData[0][userIdKey] === undefined ||
          resData[0][userIdKey] === null
        ) {
          this.columnDefs = this.createCols();
          this.unalteredRowData = [];
          this.fillExact();
        } else {
          if (resData[0][userIdKey] > 0) {
            this.columnDefs = this.createCols();
            this.unalteredRowData = this.agGridService.getRows();
            this.fillExact();
          }
        }
      },
      (errorMessage) => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.loginService.setErrorCode(errorMessage.status);
      },
      () => {
        console.log(
          'Backend callback: complete. The Data should be displayed now.'
        );
      }
    );

    this.subscriptions.add(sub);
  }

  // Populate Audit Data.
  private populateAuditLogs(): void {
    // tslint:disable-next-line:prefer-const
    let locObs: Observable<AuditResponseData>;
    locObs = this.agGridService.auditResponse();
    const sub = locObs.subscribe(
      (resData) => {
        console.log('Backend callback: next');
        const userIdKey = 'id';
        if (
          resData === undefined ||
          resData === null ||
          resData[0] === null ||
          resData[0] === undefined ||
          resData[0][userIdKey] === undefined ||
          resData[0][userIdKey] === null
        ) {
          this.columnDefs = this.createCols();
          this.unalteredRowData = [];
          this.fillExact();
        } else {
          if (resData[0][userIdKey] > 0) {
            this.unalteredRowData = this.agGridService.getRows();
            this.columnDefs = this.createCols();
            console.log('-------Audit Data--------');
            console.log(this.columnDefs);
            console.log(this.unalteredRowData);
            this.gridOptions.api.setColumnDefs(this.columnDefs);
            if (this.gridOptions.columnDefs.length < 1 && this.columnDefs.length > 1){
              this.gridOptions.columnDefs = this.columnDefs;
            }
            this.gridOptions.api.sizeColumnsToFit();
            this.gridOptions.api.setGridAutoHeight(true);
            this.evaluateRowData();
            this.gridOptions.rowData = this.rowData;
            console.log(this.gridOptions.rowData);
            console.log(this.gridOptions.columnDefs);
            this.gridIsSetup = true;
          }
        }
      },
      (errorMessage) => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.loginService.setErrorCode(errorMessage.status);
      },
      () => {
        console.log(
          'Audit Log Backend callback: complete. The Audit Log Data should be displayed now.'
        );
      }
    );

    this.subscriptions.add(sub);
  }

  // Populate Location Data.
  private populateLocationData(): void {
    // tslint:disable-next-line:prefer-const
    let locObs: Observable<LocationResponseData>;
    locObs = this.agGridService.locationResponse();
    const sub = locObs.subscribe(
      (resData) => {
        console.log('Backend callback: next');
        const userIdKey = 'id';
        if (
          resData === undefined ||
          resData === null ||
          resData[0] === null ||
          resData[0] === undefined ||
          resData[0][userIdKey] === undefined ||
          resData[0][userIdKey] === null
        ) {
          this.columnDefs = this.createCols();
          this.unalteredRowData = [];
          this.fillExact();
        } else {
          if (resData[0][userIdKey] > 0) {
            this.columnDefs = this.createCols();
            this.unalteredRowData = this.agGridService.getRows();
            this.fillExact();
          }
        }
      },
      (errorMessage) => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.loginService.setErrorCode(errorMessage.status);
      },
      () => {
        console.log(
          'Backend callback: complete. The Data should be displayed now.'
        );
      }
    );

    this.subscriptions.add(sub);
  }

  // Make a Pareto graph based on the selected rows or all rows
  makePareto(): void {
    this.desiredValue = null;
    this.showPareto = false;

    if (this.gridType === 6){
      this.desiredValue = this.dateForm.controls.desiredValue.value;
      if (!this.desiredValue){
        this.modalService.setModalContext('No Selection matching parameters was found');
      }
      else {
        this.agGridService.getAnalyzedTokenReportByCasNumber(this.desiredValue).subscribe((value) => {
          if (value) {
            this.graphService.graphValues(value, this.gridType, true, this.desiredValue);
            this.modalService.setPopOutContext('pareto');
            this.showPareto = true;
          }
        });
      }
    }
    else {
      if (this.gridOptions.api.isAnyFilterPresent()){
        this.gridOptions.api.selectAllFiltered();
        const v3 = this.gridOptions.api.getSelectedRows();
        this.graphService.graphValues(v3, this.gridType, true, this.desiredValue);
        this.modalService.setPopOutContext('pareto');
        this.showPareto = true;
        this.gridOptions.api.deselectAllFiltered();
        return;
      }

      this.graphService.graphValues(this.rowData, this.gridType, true, this.desiredValue);
      this.modalService.setPopOutContext('pareto');
      this.showPareto = true;
    }
  }

  refineFoundAnalytes(): void {
    const temp = [];
    for (const v of this.foundAnalyteList){
      if (temp.length < 1 || !temp.find(x => x.cas_number === v.cas_number)){
        temp.push(v);
      }
    }
    this.foundAnalyteList = temp;
  }

  // Make a Histogram graph based on the selected rows or all rows
  makeHistogram(): void {
    this.showHistogram = false;
    if (this.gridType === 6){
      this.agGridService.getAnalyzedTokenData().subscribe((value) => {
        if (value) {
          this.graphService.graphValues(value, this.gridType, false, '');
          this.modalService.setPopOutContext('histogram');
          this.showHistogram = true;
        }
        else {
          this.modalService.setModalContext('No Relevant Values were found at this time.');
        }
      });
    }
    else {
      if (this.gridOptions.api.isAnyFilterPresent()){
        this.gridOptions.api.selectAllFiltered();
        const v3 = this.gridOptions.api.getSelectedRows();
        this.graphService.graphValues(v3, this.gridType, false, '');
        this.modalService.setPopOutContext('histogram');
        this.showHistogram = true;
        this.gridOptions.api.deselectAllFiltered();
        return;
      }

      this.graphService.graphValues(this.rowData, this.gridType, false, '');
      this.modalService.setPopOutContext('histogram');
      this.showHistogram = true;
    }
  }

  // Populate Role data.
  private populateRoleData(): void {
    // tslint:disable-next-line:prefer-const
    let roleObs: Observable<RoleResponseData>;
    roleObs = this.agGridService.RoleResponse();
    const sub = roleObs.subscribe(
      (resData) => {
        console.log('Backend callback: next');
        const userIdKey = 'id';
        if (
          resData === null ||
          resData === undefined ||
          resData[0][userIdKey] === undefined ||
          resData[0][userIdKey] === null
        ) {
          this.columnDefs = this.createCols();
          this.unalteredRowData = [];
          this.fillExact();
        } else {
          if (resData[0][userIdKey] > 0) {
            this.columnDefs = this.createCols();
            this.unalteredRowData = this.agGridService.getRows();
            this.fillExact();
          } else {
            this.error = 'Could not find values.';
          }
        }
      },
      (errorMessage) => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.loginService.setErrorCode(errorMessage.status);
      },
      () => {
        console.log(
          'Backend callback: complete. The Data should be displayed now.'
        );
      }
    );

    this.subscriptions.add(sub);
  }

  // Create cols based on the users selections.
  createCols(): any {
    this.columnSelections = [];
    const serviceCols = this.agGridService.getCols();
    let i = 0;
    for (const col of serviceCols) {
      this.columnSelections.push({
        columnIndex: i,
        columnName: col.headerName,
      });
      this.selectedItems.push({ columnIndex: i, columnName: col.headerName });
      i++;
    }

    this.disabled = false;
    // this.gridIsSetup = true;
    return serviceCols;
  }

  ngOnDestroy(): void {
    this.resetSubscriptions();
  }
}
