import {Analyte} from '../database/Models/database.model.analyte';

export interface ColumnHeader {
  headerName: string;
  field: string;
  width: number;
  height: number;
  sortable: boolean;
  visible: boolean;
}
export class ColumnDefsModel {
  private static cachedColumnDefs: Array<ColumnHeader[]>;

  static nameFilterParams = {
    filterOptions: ['contains', 'notContains', 'startsWith', 'endsWith', 'equals', 'empty'],
    textFormatter(result): string {
      if (result === null) { return null; }
      return result.toLowerCase();
    },
    debounceMs: 200,
    suppressAndOrCondition: true,
    resetButton: true
  };

  static dateFilterParams = {
    filterOptions: ['lessThan', 'lessThanOrEqual', 'greaterThan', 'greaterThanOrEqual', 'inRange'],
    comparator(result, cellValue): number {
      if (cellValue === null) { return -1; }
      const cellDate = new Date(cellValue);
      if (cellDate > result)                          { return 1; }
      if (cellDate < result)                          { return -1; }
      if (cellDate.getTime() === result.getTime())    { return 0; }
      return 0;
    },
    browserDatePicker: true,
    debounceMs: 200,
    minValidYear: 2020,
    resetButton: true
  };

  static numberFilterParams = {
    filterOptions: ['greaterThan', 'greaterThanOrEqual', 'lessThan', 'lessThanOrEqual', 'inRange', 'equals', 'empty'],
    debounceMs: 200,
    suppressAndOrCondition: true,
    resetButton: true
  };

  static GetCachedColumnDefinition(gridType: number): any[] {
    if (this.cachedColumnDefs === undefined) {
      this.cachedColumnDefs = [];
    }
    if (this.cachedColumnDefs[gridType] !== undefined) {
      return this.cachedColumnDefs[gridType];
    } else {
      return this.addCachedDefinition(gridType);
    }
  }

  private static addCachedDefinition(index: number): any[] {
    switch (index) {
      case 0:
        this.cachedColumnDefs[index] = this.getCustomDataDefinition();
        break;
      case 1:
      case 7:
      case 8:
      case 9:
      case 10:
      case 11:
      case 12:
        this.cachedColumnDefs[index] = this.getBadgeDataDefinition();
        break;
      case 2:
        // The Column Defs for analyte Exposure Rating is being handled based on component input in analyte-exposure.component
        this.cachedColumnDefs[index] = this.getAnalyteExposureRating();
        break;
      case 3:
        this.cachedColumnDefs[index] = this.getDataTableDataDefinition();
        break;
      case 4:
        this.cachedColumnDefs[index] = this.getRoleDataDefinition();
        break;
      case 5:
        this.cachedColumnDefs[index] = this.getUserManagementDefinition();
        break;
      case 6:
        this.cachedColumnDefs[index] = this.getSimpleBadgeDefinition();
        break;
      case 13:
        this.cachedColumnDefs[index] = this.getLocationDefinition();
        break;
      case 14:
        this.cachedColumnDefs[index] = this.getAuditDefinition();
        break;
      default:
        this.cachedColumnDefs[index] = [];
        break;
    }
    return this.cachedColumnDefs[index];
  }

  private static getCustomDataDefinition(): any[] {
    return [
      {
        headerName: 'Assigned User',
        field: 'assigned_user',
        // width: 150,
        height: 50,
        sortable: true,
        visible: true,
        resizable: true,
        filter: 'agTextColumnFilter',
        filterParams: this.nameFilterParams,
      },
      {
        headerName: 'User Role',
        field: 'role',
        // width: 150,
        height: 50,
        sortable: true,
        visible: true,
        resizable: true,
        filter: 'agTextColumnFilter',
        filterParams: this.nameFilterParams,
      },
      {
        headerName: 'Group',
        field: 'group_id',
        // width: 150,
        height: 50,
        sortable: true,
        visible: true,
        resizable: true,
        filter: 'agNumberColumnFilter',
        filterParams: this.numberFilterParams,
      },
      {
        headerName: 'Manager',
        field: 'manager',
        // width: 150,
        height: 50,
        sortable: true,
        visible: true,
        resizable: true,
        filter: 'agTextColumnFilter',
        filterParams: this.nameFilterParams,
      },
      {
        headerName: 'Location',
        field: 'location',
        // width: 150,
        height: 50,
        sortable: true,
        visible: true,
        resizable: true,
        filter: 'agTextColumnFilter',
        filterParams: this.nameFilterParams,
      },
      {
        headerName: 'Badge Serial Number',
        field: 'badge_serial_number',
        // width: 150,
        height: 50,
        sortable: true,
        visible: true,
        resizable: true,
        filter: 'agTextColumnFilter',
        filterParams: this.nameFilterParams,
      },
      {
        headerName: 'Number of Tokens',
        field: 'number_of_tokens',
        // width: 150,
        height: 50,
        sortable: true,
        visible: true,
        resizable: true,
        filter: 'agNumberColumnFilter',
        filterParams: this.numberFilterParams,
      },
      {
        headerName: 'Batch Group',
        field: 'batch_group',
        // width: 150,
        height: 50,
        sortable: true,
        visible: true,
        resizable: true,
        filter: 'agTextColumnFilter',
        filterParams: this.nameFilterParams,
      },
      {
        headerName: 'Badge Status',
        field: 'badge_status',
        // width: 150,
        height: 50,
        sortable: true,
        visible: true,
        resizable: true,
        filter: 'agTextColumnFilter',
        filterParams: this.nameFilterParams,
      },
      {
        headerName: 'Activated Time',
        field: 'activated_time',
        // width: 150,
        height: 50,
        sortable: true,
        visible: true,
        resizable: true,
        filter: 'agDateColumnFilter',
        filterParams: this.dateFilterParams,
      },
      {
        headerName: 'Turned In Time',
        field: 'turned_in_time',
        // width: 150,
        height: 50,
        sortable: true,
        visible: true,
        resizable: true,
        filter: 'agDateColumnFilter',
        filterParams: this.dateFilterParams,
      },
      {
        headerName: 'Expiration Date',
        field: 'expiration_date',
        // width: 150,
        height: 50,
        sortable: true,
        visible: true,
        resizable: true,
        filter: 'agDateColumnFilter',
        filterParams: this.dateFilterParams,
      },
      {
        headerName: 'Analyst',
        field: 'analyst',
        // width: 150,
        height: 50,
        sortable: true,
        visible: true,
        resizable: true,
        filter: 'agTextColumnFilter',
        filterParams: this.nameFilterParams,
      },
      {
        headerName: 'Raw Data File',
        field: 'original_filename',
        // width: 150,
        height: 50,
        sortable: true,
        visible: true,
        resizable: true,
        filter: 'agTextColumnFilter',
        filterParams: this.nameFilterParams,
      },
      {
        headerName: 'Raw Comments',
        field: 'raw_comments',
        // width: 150,
        height: 50,
        sortable: true,
        visible: true,
        resizable: true,
        filter: 'agTextColumnFilter',
        filterParams: this.nameFilterParams,
      },
    ];
  }

  private static getBadgeDataDefinition(): any[] {
    return [
      // {
      //   headerName: 'Id',
      //   field: 'id',
      //   width: 75,
      //   height: 50,
      //   sortable: true,
      //   visible: true,
      // },
      {
        headerName: 'Serial Number',
        field: 'badge_serial_number',
        // width: 150,
        height: 50,
        sortable: true,
        visible: true,
        resizable: true,
        filter: 'agTextColumnFilter',
        filterParams: this.nameFilterParams,
      },
      {
        headerName: 'Assigned User',
        field: 'assigned_user',
        // width: 150,
        height: 50,
        sortable: true,
        visible: true,
        resizable: true,
        filter: 'agTextColumnFilter',
        filterParams: this.nameFilterParams,
      },
      {
        headerName: 'Tokens',
        field: 'number_of_tokens',
        // width: 50,
        height: 50,
        sortable: true,
        visible: true,
        resizable: true,
        filter: 'agNumberColumnFilter',
        filterParams: this.numberFilterParams,
      },
      {
        headerName: 'Batch Group',
        field: 'batch_group',
        // width: 50,
        height: 50,
        sortable: true,
        visible: true,
        resizable: true,
        filter: 'agTextColumnFilter',
        filterParams: this.nameFilterParams,
      },
      // {
      //   headerName: 'Data Id',
      //   field: 'data_id',
      //   width: 100,
      //   height: 50,
      //   sortable: true,
      //   visible: true,
      // },
      // {
      //   headerName: 'Status',
      //   field: 'badge_status',
      //   width: 75,
      //   height: 50,
      //   sortable: true,
      //   visible: true,
      // resizable: true,
      // },
      {
        headerName: 'Activated Time',
        field: 'activated_time',
        // width: 200,
        height: 50,
        sortable: true,
        visible: true,
        resizable: true,
        filter: 'agDateColumnFilter',
        filterParams: this.dateFilterParams,
      },
      {
        headerName: 'Turned In Time',
        field: 'turned_in_time',
        // width: 200,
        height: 50,
        sortable: true,
        visible: true,
        resizable: true,
        filter: 'agDateColumnFilter',
        filterParams: this.dateFilterParams,
      },
      {
        headerName: 'Expiration Date',
        field: 'expiration_date',
        // width: 200,
        height: 50,
        sortable: true,
        visible: true,
        resizable: true,
        filter: 'agDateColumnFilter',
        filterParams: this.dateFilterParams,
      },
    ];
  }

  private static getSimpleBadgeDefinition(): any[] {
    return [
      {
        headerName: 'Serial Number',
        field: 'badge_serial_number',
        // width: 150,
        height: 50,
        sortable: true,
        visible: true,
        resizable: true,
        filter: 'agTextColumnFilter',
        filterParams: this.nameFilterParams,
      },
      {
        headerName: 'Assigned User',
        field: 'assigned_user',
        // width: 150,
        height: 50,
        sortable: true,
        visible: true,
        resizable: true,
        filter: 'agTextColumnFilter',
        filterParams: this.nameFilterParams,
      },
      {
        headerName: 'Activated Time',
        field: 'activated_time',
        // width: 200,
        height: 50,
        sortable: true,
        visible: true,
        resizable: true,
        filter: 'agDateColumnFilter',
        filterParams: this.dateFilterParams,
      },
      {
        headerName: 'Turned In Time',
        field: 'turned_in_time',
        // width: 200,
        height: 50,
        sortable: true,
        visible: true,
        resizable: true,
        filter: 'agDateColumnFilter',
        filterParams: this.dateFilterParams,
      },
    ];
  }

  private static getAuditDefinition(): any[] {
    return [
      {
        headerName: 'Id',
        field: 'id',
        // width: 50,
        height: 100,
        sortable: true,
        visible: true,
        resizable: true,
        filter: 'agNumberColumnFilter',
        filterParams: this.numberFilterParams,
      },
      {
        headerName: 'Event Id',
        field: 'event_id',
        // width: 50,
        height: 100,
        sortable: true,
        visible: true,
        resizable: true,
        filter: 'agNumberColumnFilter',
        filterParams: this.numberFilterParams,
      },
      {
        headerName: 'User Id',
        field: 'user_id',
        // width: 50,
        height: 100,
        sortable: true,
        visible: true,
        resizable: true,
        filter: 'agNumberColumnFilter',
        filterParams: this.numberFilterParams,
      },
      {
        headerName: 'Log Data',
        field: 'log_data',
        // width: 150,
        height: 100,
        sortable: true,
        visible: true,
        resizable: true,
        filter: 'agTextColumnFilter',
        filterParams: this.nameFilterParams,
      },
      {
        headerName: 'Location Id',
        field: 'location',
        // width: 50,
        height: 100,
        sortable: true,
        visible: true,
        resizable: true,
        filter: 'agNumberColumnFilter',
        filterParams: this.numberFilterParams,
      },
      {
        headerName: 'IP Endpoint',
        field: 'ip_endpoint',
        // width: 50,
        height: 100,
        sortable: true,
        visible: true,
        resizable: true,
        filter: 'agTextColumnFilter',
        filterParams: this.nameFilterParams,
      },
      {
        headerName: 'Date Created',
        field: 'date_created',
        // width: 200,
        height: 100,
        sortable: true,
        visible: true,
        resizable: true,
        filter: 'agDateColumnFilter',
        filterParams: this.dateFilterParams,
      },
    ];
  }

  private static getLocationDefinition(): any[] {
    return [
      {
        headerName: 'City',
        field: 'city',
        // width: 150,
        height: 50,
        sortable: true,
        visible: true,
        resizable: true,
        filter: 'agTextColumnFilter',
        filterParams: this.nameFilterParams,
      },
      {
        headerName: 'State',
        field: 'state',
        // width: 150,
        height: 50,
        sortable: true,
        visible: true,
        resizable: true,
        filter: 'agTextColumnFilter',
        filterParams: this.nameFilterParams,
      },
      {
        headerName: 'Country',
        field: 'country',
        // width: 200,
        height: 50,
        sortable: true,
        visible: true,
        resizable: true,
        filter: 'agTextColumnFilter',
        filterParams: this.nameFilterParams,
      },
      {
        headerName: 'Base',
        field: 'base',
        // width: 200,
        height: 50,
        sortable: true,
        visible: true,
        resizable: true,
        filter: 'agTextColumnFilter',
        filterParams: this.nameFilterParams,
      },
    ];
  }

  private static getUserManagementDefinition(): any[] {
    return [
      {
        headerName: 'Id',
        field: 'id',
        // width: 50,
        height: 50,
        sortable: true,
        visible: true,
        resizable: true,
        filter: 'agNumberColumnFilter',
        filterParams: this.numberFilterParams,
      },
      {
        headerName: 'Username',
        field: 'username',
        // width: 150,
        height: 50,
        sortable: true,
        visible: true,
        resizable: true,
        filter: 'agTextColumnFilter',
        filterParams: this.nameFilterParams,
      },
      {
        headerName: 'Role',
        field: 'role',
        // width: 50,
        height: 50,
        sortable: true,
        visible: true,
        resizable: true,
        filter: 'agNumberColumnFilter',
        filterParams: this.numberFilterParams,
      },
    ];
  }

  private static getAnalytesDataDefinition(): any[] {
    return [
      // {
      //   headerName: 'Id',
      //   field: 'id',
      //   width: 75,
      //   height: 50,
      //   sortable: true,
      //   visible: true,
      // },
      // // {
      // //   headerName: 'Compound Id',
      // //   field: 'compound_id',
      // //   width: 150,
      // //   height: 50,
      // //   sortable: true,
      // //   visible: true,
      // // },
      // {
      //   headerName: 'Chemical Class Id',
      //   field: 'chemical_class_id',
      //   width: 200,
      //   height: 50,
      //   sortable: true,
      //   visible: true,
      // },
      {
        headerName: 'Analyte Name',
        field: 'analyte_name',
        // width: 300,
        height: 50,
        sortable: true,
        visible: true,
        resizable: true,
        filter: 'agTextColumnFilter',
        filterParams: this.nameFilterParams,
      },
      // {
      //   headerName: 'Data Table Id',
      //   field: 'data_table_id',
      //   width: 150,
      //   height: 50,
      //   sortable: true,
      //   visible: true,
      // },
      // {
      //   headerName: 'Molecular Weight',
      //   field: 'molecular_weight',
      //   width: 150,
      //   height: 50,
      //   sortable: true,
      //   visible: true,
      // },
    ];
  }

  private static getAnalyteExposureRating(): any[] {
    return [
      {
        headerName: 'Cas Number',
        field: 'cas_number',
        width: 2,
        height: 50,
        sortable: true,
        visible: true,
        resizable: true,
        filter: 'agTextColumnFilter',
        filterParams: this.nameFilterParams,
      },
      {
        headerName: 'Analyte Name',
        field: 'analyte_name',
        width: 6,
        height: 50,
        sortable: true,
        visible: true,
        resizable: true,
        filter: 'agTextColumnFilter',
        filterParams: this.nameFilterParams,
      },
      {
        headerName: 'Date Last Updated',
        field: 'date_last_updated',
        width: 4,
        height: 50,
        sortable: true,
        visible: true,
        resizable: true,
        filter: 'agTextColumnFilter',
        filterParams: this.dateFilterParams,
      },
      {
        headerName: 'OSHA pel mg/m3',
        field: 'osha_pel_mg',
        width: 2,
        height: 50,
        sortable: true,
        visible: true,
        resizable: true,
        filter: 'agTextColumnFilter',
        filterParams: this.nameFilterParams,
      },
      {
        headerName: 'OSHA pel PPM',
        field: 'osha_pel_ppm',
        width: 2,
        height: 50,
        sortable: true,
        visible: true,
        resizable: true,
        filter: 'agTextColumnFilter',
        filterParams: this.nameFilterParams,
      },
      {
        headerName: 'CAL OSHA pel 8 Hr TWA C',
        field: 'cal_osha_pel_8_hour_twa_c',
        width: 2,
        height: 50,
        sortable: true,
        visible: true,
        resizable: true,
        filter: 'agTextColumnFilter',
        filterParams: this.nameFilterParams,
      },
      {
        headerName: 'CAL OSHA pel 8 Hr TWA',
        field: 'cal_osha_pel_8_hour_twa',
        width: 2,
        height: 50,
        sortable: true,
        visible: true,
        resizable: true,
        filter: 'agTextColumnFilter',
        filterParams: this.nameFilterParams,
      },
      {
        headerName: 'CAL OSHA pel 8 Hr TWA ST',
        field: 'cal_osha_pel_8_hour_twa_st',
        width: 2,
        height: 50,
        sortable: true,
        visible: true,
        resizable: true,
        filter: 'agTextColumnFilter',
        filterParams: this.nameFilterParams,
      },
      {
        headerName: 'NIOSH rel 10 Hr TWA C',
        field: 'niosh_rel_10_hour_twa_c',
        width: 2,
        height: 50,
        sortable: true,
        visible: true,
        resizable: true,
        filter: 'agTextColumnFilter',
        filterParams: this.nameFilterParams,
      },
      {
        headerName: 'NIOSH rel 10 Hr TWA',
        field: 'niosh_rel_10_hour_twa',
        width: 2,
        height: 50,
        sortable: true,
        visible: true,
        resizable: true,
        filter: 'agTextColumnFilter',
        filterParams: this.nameFilterParams,
      },
      {
        headerName: 'NIOSH rel 10 Hr TWA ST',
        field: 'niosh_rel_10_hour_twa_st',
        width: 2,
        height: 50,
        sortable: true,
        visible: true,
        resizable: true,
        filter: 'agTextColumnFilter',
        filterParams: this.nameFilterParams,
      },
      {
        headerName: 'ACGIH 2019 tlv 8 Hr TWA C',
        field: 'acgih_2019_tlv_8_hour_twa_c',
        width: 2,
        height: 50,
        sortable: true,
        visible: true,
        resizable: true,
        filter: 'agTextColumnFilter',
        filterParams: this.nameFilterParams,
      },
      {
        headerName: 'ACGIH 2019 tlv 8 Hr TWA',
        field: 'acgih_2019_tlv_8_hour_twa',
        width: 2,
        height: 50,
        sortable: true,
        visible: true,
        resizable: true,
        filter: 'agTextColumnFilter',
        filterParams: this.nameFilterParams,
      },
      {
        headerName: 'ACGIH 2019 tlv 8 Hr TWA ST',
        field: 'acgih_2019_tlv_8_hour_twa_st',
        width: 2,
        height: 50,
        sortable: true,
        visible: true,
        resizable: true,
        filter: 'agTextColumnFilter',
        filterParams: this.nameFilterParams,
      },
      {
        headerName: 'Sampling Rate mL/min',
        field: 'osu_6_sampling_rate',
        width: 2,
        height: 50,
        sortable: true,
        visible: true,
        resizable: true,
        filter: 'agTextColumnFilter',
        filterParams: this.nameFilterParams,
      },
      {
        headerName: 'Detection Limit',
        field: 'detection_limit',
        width: 2,
        height: 50,
        sortable: true,
        visible: true,
        resizable: true,
        filter: 'agTextColumnFilter',
        filterParams: this.nameFilterParams,
      },
    ];
  }

  private static getDataTableDataDefinition(): any[] {
    return [
      // {headerName: 'Id', field: 'id', width: 75, height: 50, sortable: true, visible: true},
      {
        headerName: 'Badge Serial #',
        field: 'badge_serial_number',
        width: 100,
        height: 50,
        sortable: true,
        visible: true,
        resizable: true,
        filter: 'agTextColumnFilter',
        filterParams: this.nameFilterParams,
      },
      // {
      //   headerName: 'Data Type',
      //   field: 'data_table_type',
      //   // width: 100,
      //   height: 50,
      //   sortable: true,
      //   visible: true,
      //   resizable: true,
      //   filter: 'agTextColumnFilter',
      //   filterParams: this.nameFilterParams,
      // },
      // {headerName: 'Raw Data Table', field: 'raw_data_id', width: 200, height: 50, sortable: true, visible: true},
      {
        headerName: 'Base',
        field: 'base',
        width: 100,
        height: 50,
        sortable: true,
        visible: false,
        resizable: true,
        filter: 'agTextColumnFilter',
        filterParams: this.nameFilterParams,
      },
      {
        headerName: 'City',
        field: 'city',
        width: 100,
        height: 50,
        sortable: true,
        visible: true,
        resizable: true,
        filter: 'agTextColumnFilter',
        filterParams: this.nameFilterParams,
      },
      {
        headerName: 'Country',
        field: 'country',
        width: 50,
        height: 50,
        sortable: true,
        visible: false,
        resizable: true,
        filter: 'agTextColumnFilter',
        filterParams: this.nameFilterParams,
      },
      {
        headerName: 'State',
        field: 'state',
        width: 50,
        height: 50,
        sortable: true,
        visible: false,
        resizable: true,
        filter: 'agTextColumnFilter',
        filterParams: this.nameFilterParams,
      },
      {
        headerName: 'Assigned User',
        field: 'wearer',
        width: 100,
        height: 50,
        sortable: true,
        visible: true,
        resizable: true,
        filter: 'agTextColumnFilter',
        filterParams: this.nameFilterParams,
      },
      // {headerName: 'Wearer Id', field: 'wearer_id', width: 100, height: 50, sortable: true, visible: true},
      {
        headerName: 'Uploaded By',
        field: 'analyst',
        width: 100,
        height: 50,
        sortable: true,
        visible: true,
        resizable: true,
        filter: 'agTextColumnFilter',
        filterParams: this.nameFilterParams,
      },
      // {
      //   headerName: 'Analyzed Data',
      //   field: 'analyzed_data',
      //   width: 300,
      //   height: 50,
      //   sortable: true,
      //   visible: true,
      // },
      // {headerName: 'Analyzed Comments', field: 'analyzed_comments', width: 100, height: 50, sortable: true, visible: true},
      {
        headerName: 'Raw Data',
        field: 'original_filename',
        width: 300,
        height: 50,
        sortable: true,
        visible: true,
        resizable: true,
        filter: 'agTextColumnFilter',
        filterParams: this.nameFilterParams
      },
      // {headerName: 'Raw Comments', field: 'raw_comments', width: 100, height: 50, sortable: true, visible: true},
    ];
  }

  private static getRoleDataDefinition(): any[] {
    return [
      // {
      //   headerName: 'Id',
      //   field: 'id',
      //   width: 80,
      //   height: 50,
      //   sortable: true,
      //   visible: true,
      // },
      {
        headerName: 'Position',
        field: 'position',
        // width: 100,
        height: 50,
        sortable: true,
        visible: true,
        resizable: true,
        filter: 'agTextColumnFilter',
        filterParams: this.nameFilterParams
      },
    ];
  }
}
