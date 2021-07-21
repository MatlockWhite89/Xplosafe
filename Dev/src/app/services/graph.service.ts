import {Injectable, OnDestroy} from '@angular/core';
import { Analyte } from '../database/Models/database.model.analyte';
import { Badge } from '../database/Models/database.model.badge';
import { User } from '../database/Models/database.model.user';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { environment } from '../../environments/environment';
import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';
import { AnalyzedToken } from '../database/Models/database.model.analyzedToken';
import { DatabaseModelLocation } from '../database/Models/database.model.location';
import { CustomResponseData } from '../database/Models/database.model.custom';
import { DataTableResponseData } from '../database/Models/database.model.data';
import { ColorSelectionModel } from '../shared/color-selection.model';

export interface Bar {
  id: string;
  colName: string;
  height: number;
  width: number;
  colour: any;
}

export interface Group {
  barGroupName: string;
  bars: Bar[];
}

@Injectable()
export class GraphService implements OnDestroy{
  bars: Bar[];
  groups: Group[];
  offset: number;
  dataPopulated: BehaviorSubject<boolean>;
  subscriptions: Subscription;
  populateNewValues: boolean;
  graphHeader?: string;
  units?: string;
  timeConversion = (1000 * 60 * 60 * 24); // Days
  timeIntervalString = 'Days';
  paretoGraph = false;
  colorModel: ColorSelectionModel;

  constructor(
    private userService: UserService,
    private http: HttpClient,
  ) {
    this.bars = [];
    this.groups = [];
    this.offset = 0;
    this.colorModel = new ColorSelectionModel();
    this.populateNewValues = false;
    this.dataPopulated = new BehaviorSubject<boolean>(false);
    this.subscriptions = new Subscription();
  }

  // Return the new Bars.
  getBars(): Bar[] {
    return this.bars;
  }

  // Return the new Groups.
  getGroups(): Group[] {
    return this.groups;
  }

  // Returns the graph header based on the formulated bars and groups values.
  getGraphHeader(): string {
    return this.graphHeader;
  }

  // Return the Units of measurement from the formulated bars and groups where applicable.
  getUnits(): string {
    return this.units;
  }

  // allows the component to set the Bar Information.
  setBars(bars: Bar[]): void {
    this.bars = bars;
    this.sortBars();
  }

  // Make Graph (Pareto or Histogram) based on the grid selections
  graphValues(rowInfo: any, gridType: number, isPareto: boolean, desiredValue: string): void {
    this.resetValues();
    this.paretoGraph = isPareto;
    switch (gridType){
      case 0:
        // Custom Grid.
        this.buildCustomData(rowInfo);
        break;
      case 1:
      case 7:
      case 8:
      case 9:
      case 10:
      case 11:
      case 12:
        // Badge Grid.
        this.buildBadgeData(rowInfo, gridType);
        break;
      case 2:
        // Analyte Grid.
        this.buildAnalyteData(rowInfo);
        break;
      case 3:
        // Data Table Grid.
        this.buildDataTableData(rowInfo);
        break;
      case 4:
        // Role Table Grid.
        // this.makeRolePareto(rowInfo);
        this.graphHeader = 'No Graph Available';
        this.dataPopulated.next(true);
        break;
      case 5:
        // Subordinates
        this.buildUserData(rowInfo);
        break;
      case 6:
        // completedBadges
        if (isPareto){
          // Pareto Graph based on analyzed Data.
          this.buildAnalyzedDataParetto(rowInfo, desiredValue);
        }
        else {
          // Histogram Graph based on analyzed Data.
          this.buildAverageAnalyteData(rowInfo);
        }
        break;
      case 13:
        // Location.
        this.buildLocationData(rowInfo);
        break;
      case 14:
        break;
      default:
        break;
    }
  }

  // Determines the width of all the bars based on the total number of bars to be displayed.
  determineBarWidth(length: number): number{
    if (!length) { return 1; }
    let widthModifier = 1;
    // the default width of a bar is 20px.
    // the width modifier will be what % of that 20px should be rendered based on the length of values.
    if (length > 100){
      widthModifier = (length / 1000);
    } else {
      widthModifier = 1 - (length / 100);
    }

    return widthModifier;
  }

  // Add the bar to an unknownGroup. Used if there was missing or improperly formatted data in the DB.
  addToUnknownGroup(newBar: any): void {
    if (this.groups.some((group) => (group.barGroupName === 'unknownGroup'))) {
      this.groups.find((group) =>
        (group.barGroupName === 'unknownGroup')).bars.push(newBar);
    }
    else{
      // no group for this barGroupName exists add it in.
      const barsArray = [];
      barsArray.push(newBar);
      const newGroup = {barGroupName: 'unknownGroup', bars: barsArray};
      this.groups.push(newGroup);
    }
  }

  // Adds the bar to a known group.
  addToSpecifiedGroup(newBar: any, groupName: string): void {
    // find the corresponding Group based on the groupName.
    if (this.groups.some((group) => (group.barGroupName === groupName))) {
      // Add the Bar to the corresponding Group.
      this.groups.find((group) =>
        (group.barGroupName === groupName)).bars.push(newBar);
    }
    else{
      // no group for this groupName exists add it in.
      const barsArray = [];
      barsArray.push(newBar);
      const newGroup = {barGroupName: groupName, bars: barsArray};
      this.groups.push(newGroup);
    }
  }

  // Add a new bar.
  addNewBar(value: number, colName: string, widthModifier: number): Bar {
    let barHeight = 0;
    if (value) { barHeight = value; }
    const newBar =
      {
        id: '',
        colName,
        height: barHeight,
        colour: undefined,
        width: 20 * widthModifier,
      };

    this.bars.push(newBar);
    return newBar;
  }

  // Builds a specified paretto based on a selected casNumber.
  buildAnalyzedDataParetto(array: AnalyzedToken[], selectedCasNum: string): void {
    const valuesToEvaluate = [];
    for (const a of array)
    {
      if (!valuesToEvaluate.includes(a.badge_serial_number))
      {
        valuesToEvaluate.push(a.badge_serial_number);
      }
    }

    const averageResults = [];
    let analyteName = '';
    // Calculate the average of each of the analytes
    for (const badgeSerialNum of valuesToEvaluate) {
      let qtyFound = 0;
      let volConcentration = 0;
      let foundConcentration = 0;
      let units = '';
      let concentrationUnits = '';
      for (const a of array.filter(x => (x.badge_serial_number === badgeSerialNum) && x.cas_number === selectedCasNum)) {
        qtyFound += Number(a.recorded_value);
        volConcentration += Number(a.volume_concentration);
        foundConcentration += Number(a.found_concentration);
        units = a.recorded_units;
        concentrationUnits = a.concentration_units;
        this.units = concentrationUnits;
        analyteName = a.analyte_name;
      }
      const numValues = (array.filter(x => x.cas_number === selectedCasNum && x.badge_serial_number === badgeSerialNum)).length;
      averageResults.push({
        numValues,
        selectedCasNum,
        averageQtyFound: ((Math.round((qtyFound / numValues) * 100)) / 100),
        averageVolumeConcentration: ((Math.round((volConcentration / numValues) * 100)) / 100),
        averageFoundConcentration: ((Math.round((foundConcentration / numValues) * 100)) / 100),
        foundUnits: units,
        concentrationUnits,
        badgeSerialNum,
      });

      this.graphHeader = 'The Calculated Average of Analyte: ' + analyteName +
        '(' + selectedCasNum + ').';
    }

    for (const result of averageResults) {
      const newBar = this.addNewBar(
        result.averageQtyFound,
        result.badgeSerialNum,
        this.determineBarWidth(averageResults.length));

      if (result.badgeSerialNum) {
        this.addToSpecifiedGroup(newBar, 'Analyte: ' + result.analyteName + '(' + result.casNum + ')');
      } else {
        // The group value is null and should be added with other null valued analytes.
        this.addToUnknownGroup(newBar);
      }
    }
    this.populateNewValues = true;
    this.dataPopulated.next(this.populateNewValues);
    this.populateNewValues = false;
  }

  // Build Histogram AnalyteData.
  buildAverageAnalyteData(array: AnalyzedToken[]): void {
    const analytes = [];
    const badges = [];
    for (const a of array)
    {
      // go through and get all analytes found on all badges.
      if (!analytes.includes(a.cas_number)){
        analytes.push(a.cas_number);
      }

      // go through and get all badges found.
      if (!badges.includes(a.badge_serial_number)){
        badges.push(a.badge_serial_number);
      }
    }

    const averageResults = [];
    for (const badge of badges) {
      // Calculate the average of each of the analytes
      for (const casNum of analytes) {
        let qtyFound = 0;
        let volConcentration = 0;
        let foundConcentration = 0;
        let units = '';
        let concentrationUnits = '';
        let analyteName = '';
        const badgeSerialNum = badge;
        for (const a of array.filter(x => x.cas_number === casNum && x.badge_serial_number === badge)) {
          qtyFound += Number(a.recorded_value);
          volConcentration += Number(a.volume_concentration);
          foundConcentration += Number(a.found_concentration);
          units = a.recorded_units;
          this.units = units;
          analyteName = a.analyte_name;
          concentrationUnits = a.concentration_units;
        }
        const numValues = (array.filter(x => x.cas_number === casNum && x.badge_serial_number === badge)).length;
        averageResults.push({
          numValues,
          casNum,
          analyteName,
          averageQtyFound: ((Math.round((qtyFound / numValues) * 100)) / 100),
          averageVolumeConcentration: ((Math.round((volConcentration / numValues) * 100)) / 100),
          averageFoundConcentration: ((Math.round((foundConcentration / numValues) * 100)) / 100),
          foundUnits: units,
          concentrationUnits,
          badgeSerialNum,
        });
      }
    }

    for (const result of averageResults)
    {
      const newBar = this.addNewBar(
        result.averageQtyFound,
        result.analyteName + '(' + result.casNum + ')',
        this.determineBarWidth(averageResults.length));

      if (result.badgeSerialNum){
        this.addToSpecifiedGroup(newBar, 'BSN: ' + result.badgeSerialNum);
      }
      else{
        // The group value is null and should be added with other null valued analytes.
        this.addToUnknownGroup(newBar);
      }
    }

    // if (this.getUnits() === 'ug'){
    //   this.units = &micro;
    // }
    this.graphHeader = 'The Calculated Average of all Analytes Found on a Given Badge Across all Tokens in ' + this.getUnits();
    this.populateNewValues = true;
    this.dataPopulated.next(this.populateNewValues);
    this.populateNewValues = false;
  }

  // Build the Graphs based on Analyte Information.
  buildAnalyteData(array: Analyte[]): void {
    // Populate all Bars for the Given analyte Value.
    for (const analyte of array)
    {
      let value = Number(analyte.osha_pel_ppm);
      if (!value) {
        value = 0;
        continue;
      }
      const newBar = this.addNewBar(value, analyte.analyte_name, this.determineBarWidth(array.length));
      this.addToSpecifiedGroup(newBar, 'Analytes');
    }

    this.graphHeader = 'The OSHA PEL PPM value for all analytes.';
    this.units = 'PPM';
    this.populateNewValues = true;
    this.dataPopulated.next(this.populateNewValues);
    this.populateNewValues = false;
  }

  // Build the Graphs based on Badge Information.
  buildBadgeData(array: Badge[], type: number): void {
    // Populate all Bars for the Given badge Values.
    for (const badge of array)
    {
      let val = 0;
      let newBar = null;
      let status = '';
      switch (type) {
        case 1:
          // All badges Manufacturer use.
          val = badge.number_of_tokens;
          this.graphHeader = 'The Number of tokens available across all badges.';
          this.units = 'Tokens';
          newBar = this.addNewBar(val, badge.badge_serial_number, this.determineBarWidth(array.length));
          if (badge.batch_group){
            this.addToSpecifiedGroup(newBar, 'Batch Group ' + badge.batch_group.toString());
          }
          else{
            // The group value is null and should be added with other null valued analytes.
            this.addToUnknownGroup(newBar);
          }
          break;
        case 7:
          // Wearer All badges.
          switch (badge.badge_status){
            case 1:
              // Should never have any values as the badge must be assigned to the user.
              break;
            case 2:
              status = 'Activated';
              val = Math.abs(Math.round(Number(
                (Date.now().valueOf() - new Date(badge.activated_time).valueOf()) / this.timeConversion)));
              break;
            case 3:
              status = 'Expired';
              val = Math.abs(Math.round(Number(
                (Date.now().valueOf() - new Date(badge.expiration_date).valueOf()) / this.timeConversion)));
              break;
            case 4:
              status = 'Completed';
              val = Math.abs(Math.round(Number(
                (Date.now().valueOf() - new Date(badge.turned_in_time).valueOf()) / this.timeConversion)));
              break;
            case 5:
              status = 'Quarantined';
              val = Math.abs(Math.round(Number(
                (Date.now().valueOf() - new Date(badge.date_last_updated).valueOf()) / this.timeConversion)));
              break;
            case 6:
              status = 'Damaged';
              val = Math.abs(Math.round(Number(
                (Date.now().valueOf() - new Date(badge.date_last_updated).valueOf()) / this.timeConversion)));
              break;
            case 7:
              status = 'Assigned';
              val = Math.abs(Math.round(Number(
                (Date.now().valueOf() - new Date(badge.date_last_updated).valueOf()) / this.timeConversion)));
              break;
          }
          this.graphHeader = 'Duration (' + this.timeIntervalString + ') The Badges Have Been In Their Current State.';
          this.units = 'Days';
          if (val > 365){
            continue;
          }
          newBar = this.addNewBar(val, badge.badge_serial_number, this.determineBarWidth(array.length));
          if (status !== ''){
            this.addToSpecifiedGroup(newBar, status);
          }
          else{
            // The group value is null and should be added with other null valued analytes.
            this.addToUnknownGroup(newBar);
          }
          break;
        case 8:
          // Manager All Badges Used in Edit Component.
          switch (badge.badge_status){
            case 1:
              status = 'Unassigned';
              val = Math.abs(Math.round(Number(
                (Date.now().valueOf() - new Date(badge.date_created).valueOf()) / this.timeConversion)));
              break;
            case 2:
              status = 'Activated';
              val = Math.abs(Math.round(Number(
                (Date.now().valueOf() - new Date(badge.activated_time).valueOf()) / this.timeConversion)));
              break;
            case 3:
              status = 'Expired';
              val = Math.abs(Math.round(Number(
                (Date.now().valueOf() - new Date(badge.expiration_date).valueOf()) / this.timeConversion)));
              break;
            case 4:
              status = 'Completed';
              val = Math.abs(Math.round(Number(
                (Date.now().valueOf() - new Date(badge.turned_in_time).valueOf()) / this.timeConversion)));
              break;
            case 5:
              status = 'Quarantined';
              val = Math.abs(Math.round(Number(
                (Date.now().valueOf() - new Date(badge.date_last_updated).valueOf()) / this.timeConversion)));
              break;
            case 6:
              status = 'Damaged';
              val = Math.abs(Math.round(Number(
                (Date.now().valueOf() - new Date(badge.date_last_updated).valueOf()) / this.timeConversion)));
              break;
            case 7:
              status = 'Assigned';
              val = Math.abs(Math.round(Number(
                (Date.now().valueOf() - new Date(badge.date_last_updated).valueOf()) / this.timeConversion)));
              break;
          }
          this.graphHeader = 'Duration (' + this.timeIntervalString + ') The Badges Have Been In Their Current State.';
          this.units = 'Days';
          if (val > 365){
            continue;
          }
          newBar = this.addNewBar(val, badge.badge_serial_number, this.determineBarWidth(array.length));
          if (status !== ''){
            this.addToSpecifiedGroup(newBar, status);
          }
          else{
            // The group value is null and should be added with other null valued analytes.
            this.addToUnknownGroup(newBar);
          }
          break;
        case 9:
          // Wearer Turn In Component.
          val = Math.abs(Math.round(Number(
            (Date.now().valueOf() - new Date(badge.activated_time).valueOf()) / this.timeConversion)));
          this.graphHeader = 'Duration (' + this.timeIntervalString + ') The Badges Have Been Activated.';
          this.units = 'Days';
          if (val > 365){
            continue;
          }
          newBar = this.addNewBar(val, badge.badge_serial_number, this.determineBarWidth(array.length));
          if (badge.batch_group){
            this.addToSpecifiedGroup(newBar, 'Batch Group ' + badge.batch_group.toString());
          }
          else{
            // The group value is null and should be added with other null valued analytes.
            this.addToUnknownGroup(newBar);
          }
          break;
        case 10:
          // Manager Issue Component.
          val = Math.abs(Math.round(Number(
            (Date.now().valueOf() - new Date(badge.date_created).valueOf()) / this.timeConversion)));
          this.graphHeader =
            'Duration (' + this.timeIntervalString + ') Subordinate Badges That Have Been Awaiting Issuance.';
          this.units = 'Days';
          if (val > 365){
            continue;
          }
          newBar = this.addNewBar(val, badge.badge_serial_number, this.determineBarWidth(array.length));
          if (badge.batch_group){
            this.addToSpecifiedGroup(newBar, 'Batch Group ' + badge.batch_group.toString());
          }
          else{
            // The group value is null and should be added with other null valued analytes.
            this.addToUnknownGroup(newBar);
          }
          break;
        case 11:
          // Manager Turn In Component.
          val = Math.abs(Math.round(Number(
            (Date.now().valueOf() - new Date(badge.activated_time).valueOf()) / this.timeConversion)));
          this.graphHeader = 'Duration (' + this.timeIntervalString + ') Subordinate Badges Have Been Activated.';
          this.units = 'Days';
          if (val > 365){
            continue;
          }
          newBar = this.addNewBar(val, badge.badge_serial_number, this.determineBarWidth(array.length));
          if (badge.batch_group){
            this.addToSpecifiedGroup(newBar, 'Batch Group ' + badge.batch_group.toString());
          }
          else{
            // The group value is null and should be added with other null valued analytes.
            this.addToUnknownGroup(newBar);
          }
          break;
        case 12:
          // Wearer Issue Component.
          val = Math.abs(Math.round(Number(
            (Date.now().valueOf() - new Date(badge.date_last_updated).valueOf()) / this.timeConversion)));
          this.graphHeader = 'Duration (' + this.timeIntervalString + ') The Badges Have Been Issued But Not Activated.';
          this.units = 'Days';
          if (val > 365){
            continue;
          }
          newBar = this.addNewBar(val, badge.badge_serial_number, this.determineBarWidth(array.length));
          if (badge.batch_group){
            this.addToSpecifiedGroup(newBar, 'Batch Group ' + badge.batch_group.toString());
          }
          else{
            // The group value is null and should be added with other null valued analytes.
            this.addToUnknownGroup(newBar);
          }
          break;
        default:
          break;
      }
    }

    this.populateNewValues = true;
    this.dataPopulated.next(this.populateNewValues);
    this.populateNewValues = false;
  }

  // Build the Graphs based on User Information.
  buildUserData(array: User[]): void {
    for (const user of array.filter(x => x.group_id))
    {
      // count the number of users that belong to each of the locations and generate a new Bar for each location and Groups on Group Id
      if (this.groups && !this.groups.find(x => x.bars.find(y => y.colName === (user.username.toString())))){
        const newBar = this.addNewBar(
          array.filter(x => x.username === user.username).length,
          user.username,
          this.determineBarWidth(array.length));
        if (user.group_id){
          this.addToSpecifiedGroup(newBar, this.roleName(user.role));
        }
        else{
          this.addToUnknownGroup(newBar);
        }
      }
    }

    this.graphHeader = 'Number of Subordinates';
    this.units = 'Count';
    this.populateNewValues = true;
    this.dataPopulated.next(this.populateNewValues);
    this.populateNewValues = false;
  }

  // Build the Graphs based on Custom Data Information.
  buildCustomData(array: CustomResponseData[]): void {
    for (const custom of array.filter(x => x.badge_status))
    {
      // count the number of badges that belong to each of the assigned Users
      // and generate a new Bar for each user and Groups on badge status.
      if (!custom.assigned_user) {
        if (this.groups && !this.groups.find(x => x.bars.find(y => y.colName === ('unassigned')))) {
          const newBar = this.addNewBar(
            array.filter(x => x.assigned_user === null || x.assigned_user === undefined).length,
            'unassigned',
            this.determineBarWidth(2));

          if (custom.badge_status) {
            this.addToSpecifiedGroup(newBar, custom.badge_status.toString());
          } else {
            this.addToUnknownGroup(newBar);
          }
        }
      }
      else{
        if (this.groups && !this.groups.find(x => x.bars.find(y => y.colName === (custom.assigned_user.toString())))){
          const newBar = this.addNewBar(
            array.filter(x => x.assigned_user === custom.assigned_user).length,
            custom.assigned_user.toString(),
            this.determineBarWidth(array.filter(x => x.assigned_user === custom.assigned_user).length));
          if (custom.badge_status){
            this.addToSpecifiedGroup(newBar, custom.badge_status.toString());
          }
          else{
            this.addToUnknownGroup(newBar);
          }
        }
      }
    }

    this.graphHeader = 'Each Users badges and states';
    this.units = 'Count';
    this.populateNewValues = true;
    this.dataPopulated.next(this.populateNewValues);
    this.populateNewValues = false;
  }

  // Build the Graphs based on Location Information.
  buildLocationData(array: DatabaseModelLocation[]): void {
    for (const loc of array.filter(x => x.country))
    {
      // count the number of locations that belong to each of the countries and generate a new Bar for each country and Groups on country
      if (this.groups && !this.groups.find(x => x.bars.find(y => y.colName === (loc.city.toString())))){
        const newBar = this.addNewBar(
          array.filter(x => x.city === loc.city).length,
          loc.city.toString(),
          this.determineBarWidth(array.length));

        if (loc.country){
          this.addToSpecifiedGroup(newBar, loc.country.toString());
        }
        else{
          this.addToUnknownGroup(newBar);
        }
      }
    }

    this.graphHeader = 'Number of Locations by District';
    this.units = 'Count';
    this.populateNewValues = true;
    this.dataPopulated.next(this.populateNewValues);
    this.populateNewValues = false;
  }

  // Build the Graphs based on Data Table Information.
  buildDataTableData(array: DataTableResponseData[]): void {
    for (const data of array)
    {
      // count the number of Badges that have had their raw data uploaded
      if (this.groups && !this.groups.find(x => x.bars.find(y => y.colName === data.base))){
        const newBar = this.addNewBar(
          array.filter(x => x.base === data.base).length,
          data.base,
          this.determineBarWidth(array.filter(x => x.wearer).length));
        if (array.filter(x => x.base)){
          this.addToSpecifiedGroup(newBar, data.base);
        }
        else{
          this.addToUnknownGroup(newBar);
        }
      }
    }

    this.graphHeader = 'Raw Files Uploaded Badges by base';
    this.units = 'Count';
    this.populateNewValues = true;
    this.dataPopulated.next(this.populateNewValues);
    this.populateNewValues = false;
  }

  // Resets the values and clears out the Pareto and Histogram Graphs.
  resetValues(): void {
    this.bars = [];
    this.groups = [];
    this.populateNewValues = false;
    this.paretoGraph = false;
    this.units = null;
    this.graphHeader = null;
    this.dataPopulated.next(this.populateNewValues);
    this.subscriptions.unsubscribe();
  }

  // Get Analyzed Token Reports from backend based on Badge Serial Number.
  getAnalyzedTokenReportResponse(): Observable<any> {
    const user = this.userService.getActiveUser();
    if (user?.userId === undefined) {
      return;
    }
    return this.http
      .get<User[]>(
        `${environment.apiUrl}/getAnalyzedTokens/` + user.userId
      );
  }

  // Sort the bars from highest height to lowest.
  sortBars(): void
  {
    this.bars.sort((a, b) => a.height < b.height ? -1 : a.height > b.height ? 1 : 0);
    this.bars.reverse();
    let i = 1;
    for (const b of this.bars)
    {
      b.id = 'rect' + i;
      i++;
    }
  }

  // Gets the Role Name for display purposes.
  roleName(value: number): string {
    switch (value){
      case 1:
        return 'wearer';
        break;
      case 2:
        return 'manufacturer';
        break;
      case 3:
        return 'scientist';
        break;
      case 4:
        return 'analyst';
        break;
      case 5:
        return 'manager';
        break;
      case 6:
        return 'administrator';
        break;
      case 7:
        return 'auditor';
        break;
      case 8:
        return 'developer';
        break;
      default:
        return '';
        break;
    }
  }

  // Remove the subscriptions on destroy.
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
