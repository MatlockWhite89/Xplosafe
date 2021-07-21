import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { concat, forkJoin, merge, Observable, of, Subject } from 'rxjs';
import {
  concatAll,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  toArray,
} from 'rxjs/operators';
import {
  ReportService,
  TokenReportForm,
} from '../../../../../services/report.service';
import { BadgeService } from '../../../../../services/badge.service';
import { AnalyzedTokenResponseData } from '../../../../../database/Models/database.model.analyzedToken';
import { ModalWindowService } from '../../../../../services/modal-window.service';
import { Badge } from '../../../../../database/Models/database.model.badge';
import { Analyte } from '../../../../../database/Models/database.model.analyte';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../../../../services/user.service';
import { TokenType } from '../../../../../database/Models/database.mode.tokenType';
import { Method } from '../../../../../database/Models/database.model.method';
import {
  TargetAnalyte,
  TargetAnalyteResponse,
} from '../../../../../database/Models/database.mode.targetAnalyte';

export class RequestedCompound {
  // tslint:disable:variable-name
  readonly id: number;
  private _compound: string;
  private _quantityFound: number;
  private _unit: string;
  private _volume_concentration: number;
  private _found_concentration: number;
  private _concentration_units: string;
  private _analyzed_comments: string;
  private _cas_number: string;

  private _analyst_id: number;
  private _token_type: string;
  private _analysis_method: string;
  private _reporting_limit: string;

  newlyCreated: boolean;
  edited: boolean;
  // tslint:enable:variable-name
  constructor(temp: AnalyzedTokenResponseData | undefined) {
    // tslint:disable:no-console
    this.id = temp?.id;
    this._compound = temp?.analyte_name;
    this._quantityFound = Number(temp?.recorded_value ?? 0);
    this._unit = temp?.recorded_units ?? 'ug';
    this._volume_concentration = Number(temp?.volume_concentration ?? 0);
    this._found_concentration = Number(temp?.found_concentration ?? 0);
    this._concentration_units = temp?.concentration_units ?? 'PPM';
    this._analyzed_comments = temp?.analyzed_comments ?? '';
    this.newlyCreated = this.edited = temp === undefined;
    this._cas_number = temp?.cas_number ?? '';

    this._analyst_id = Number(temp?.analyst_id ?? 0);
    this._token_type = temp?.token_type ?? 'OSU-6';
    this._analysis_method = temp?.analysis_method ?? 'TD/GC-MS';
    this._reporting_limit = temp?.reporting_limit ?? null;
  }

  /*
   * Gets or Sets the concentration units.
   */
  get concentration_units(): string {
    return this._concentration_units;
  }

  set concentration_units(value: string) {
    this.edited = this.edited || value !== this._concentration_units;
    this._concentration_units = value;
  }

  /*
   * Gets or Sets the Reporting Limit.
   */
  get reporting_limit(): string {
    return this._reporting_limit;
  }

  set reporting_limit(value: string) {
    this.edited = this.edited || value !== this._reporting_limit;
    this._reporting_limit = value;
  }

  /*
   * Gets or Sets the Analysis Method.
   */
  get analysis_method(): string {
    return this._analysis_method;
  }

  set analysis_method(value: string) {
    this.edited = this.edited || value !== this._analysis_method;
    this._analysis_method = value;
  }

  /*
   * Gets or Sets the Token Type.
   */
  get token_type(): string {
    return this._token_type;
  }

  set token_type(value: string) {
    this.edited = this.edited || value !== this._token_type;
    this._token_type = value;
  }

  /*
   * Gets or Sets the analyst Id.
   */
  get analyst_id(): number {
    return this._analyst_id;
  }

  set analyst_id(value: number) {
    this.edited = this.edited || value !== this._analyst_id;
    this._analyst_id = value;
  }

  /*
   * Gets or Sets the found concentration.
   */
  get found_concentration(): number {
    return this._found_concentration;
  }

  set found_concentration(value: number) {
    this.edited = this.edited || value !== this._found_concentration;
    this._found_concentration = value;
  }

  /*
   * Gets or Sets the volume concentration.
   */
  get volume_concentration(): number {
    return this._volume_concentration;
  }

  set volume_concentration(value: number) {
    this.edited = this.edited || value !== this._volume_concentration;
    this._volume_concentration = value;
  }

  /*
   * Gets or Sets the unit.
   */
  get unit(): string {
    return this._unit;
  }

  set unit(value: string) {
    this.edited = this.edited || value !== this._unit;
    this._unit = value;
  }

  /*
   * Gets or Sets the cas_number.
   */
  get casNumber(): string {
    return this._cas_number;
  }

  set casNumber(value: string) {
    this.edited = this.edited || value !== this._cas_number;
    this._cas_number = value;
  }

  /*
   * Gets or Sets the quantity found.
   */
  get quantityFound(): number {
    return this._quantityFound;
  }

  set quantityFound(value: number) {
    this.edited = this.edited || value !== this._quantityFound;
    this._quantityFound = value;
  }

  /*
   * Gets or Sets the quantity found.
   */
  get compound(): string {
    return this._compound;
  }

  set compound(value: string) {
    this._compound = value;
  }

  /*
   * Gets or Sets the quantity found.
   */
  get comments(): string {
    return this._analyzed_comments;
  }

  set comments(value: string) {
    this.edited = this.edited || value !== this._analyzed_comments;
    this._analyzed_comments = value;
  }
}

@Component({
  selector: 'app-analysis-results',
  templateUrl: './analysis-results.component.html',
  styleUrls: ['./analysis-results.component.css'],
})
export class AnalysisResultsComponent implements OnInit {
  @Input() tokenFormData: TokenReportForm;
  @Input() badgeList: Badge[];
  @Input() analyteList: Analyte[];
  @Input() methodList: Method[];
  @Input() tokenTypeList: TokenType[];
  @Output() state: EventEmitter<string> = new EventEmitter();
  @Output() compounds: EventEmitter<string[]> = new EventEmitter();
  private analyteSearch = new Subject();
  searchLike: string;
  results: { a_name: string; a_cas: string }[];
  selected: RequestedCompound[] = [];
  comments: string;

  constructor(
    private reportService: ReportService,
    private badgeService: BadgeService,
    private modalWindowService: ModalWindowService
  ) {}

  search(): void {
    this.analyteSearch.next(this.searchLike);
  }

  ngOnInit(): void {
    this.setupSearchResultObserver();
    this.getPreviouslyUploadedResults();
  }

  private getPreviouslyUploadedResults(): void {
    this.badgeService
      .getAnalyzedTokenReportResponse(
        this.tokenFormData.badge_serial_number,
        this.tokenFormData.tube_number
      )
      .subscribe({
        next: (values: AnalyzedTokenResponseData[]) => {
          for (const value of values) {
            this.selected.push(new RequestedCompound(value));
          }
          if (this.selected.length > 0) {
            this.state.emit('COMPLETED');
            this.compounds.emit(this.selected.map((x) => x.compound));
          } else {
            this.state.emit('DEFAULT');
          }
        },
        error: (err) => {
          // tslint:disable-next-line:no-console
          console.debug('Emitting ERROR! ', err);
          this.state.emit('ERROR');
        },
        complete: () => {},
      });
  }

  private setupSearchResultObserver(): void {
    this.analyteSearch
      .pipe(
        debounceTime(250),
        distinctUntilChanged(),
        switchMap((analyteLike: string) => {
          this.results = [];
          return merge(
            this.reportService.getAnalytesByName(analyteLike),
            this.reportService.getAnalytesByCasNumber(analyteLike)
          );
        }),
        concatAll()
      )
      .subscribe({
        next: (value: { a_name: string; a_cas: string }) => {
          this.results.push(value);
        },
        error: (err) => {
          console.debug('Emitting ERROR! ', err);
          this.state.emit('ERROR');
        },
        complete: () => {},
      });
  }

  addToSelected(option: { a_name: string; a_cas: string }): void {
    this.searchLike = '';
    this.analyteSearch.next(this.searchLike);
    const temp = new RequestedCompound(undefined);
    temp.compound = option.a_name;
    temp.casNumber = option.a_cas;
    this.reportService
      .createAnalyzedReport(this.tokenFormData, temp, this.comments)
      .subscribe(
        (value) => {},
        (err) => {
          console.log(err);
        },
        () => {
          this.addAnalyzedTokenToSelected(option.a_name);
        }
      );
  }

  determineTokenFormState(): boolean {
    return this.tokenFormData.token_state === 'Blank';
  }

  addAnalyzedTokenToSelected(analyteName: string): void {
    // The Following will get the new TokenAnalyzedTokenValue from the database.
    this.reportService
      .getSpecifiedAnalyzedTokenAnalyte(
        this.tokenFormData.badge_serial_number,
        this.tokenFormData.tube_number,
        analyteName
      )
      .subscribe(
        (value) => {
          const temp = new RequestedCompound(value[0]);
          if (!temp.id) {
            console.log('Error no value was returned for the given analyte');
            return;
          }
          this.selected.push(temp);
          this.state.emit('MODIFIED');
          this.compounds.emit(this.selected.map((x) => x.compound));
        },
        () => {},
        () => {}
      );
  }

  // Delete the Analyzed Token from Database and remove from the selected list of analytes.
  remove(compound: RequestedCompound): void {
    this.reportService
      .deleteAnalyzedReport(
        this.tokenFormData,
        this.selected[this.selected.indexOf(compound)]
      )
      .subscribe(
        () => {},
        (err) => {
          console.log(err);
        },
        () => {
          this.selected.splice(this.selected.indexOf(compound), 1);
          console.debug('Emitting MODIFIED');
          this.state.emit('MODIFIED');
        }
      );
  }

  // Used to automatically set the Unit and convert the quantityFound.
  determineQuantityFound(index: number): void {
    if (this.selected[index].quantityFound) {
      if (
        this.selected[index].quantityFound > 100 &&
        this.selected[index].unit === 'ug'
      ) {
        this.selected[index].quantityFound =
          this.selected[index].quantityFound / 1000;
        this.selected[index].concentration_units = 'PPM';
        this.selected[index].unit = 'ug';
      }
      if (
        this.selected[index].quantityFound < 0.1 &&
        this.selected[index].unit === 'ng'
      ) {
        this.selected[index].quantityFound =
          this.selected[index].quantityFound * 1000;
        this.selected[index].concentration_units = 'PPB';
        this.selected[index].unit = 'ng';
      }
    }
  }

  // Changes the quantityFound value based on the unit.
  reevaluateQuantityFound(index: number): void {
    console.debug('QuantityFound: ' + this.selected[index].quantityFound);
    console.debug('Units: ' + this.selected[index].unit);
    if (this.selected[index].quantityFound) {
      if (this.selected[index].unit === 'ug') {
        this.selected[index].quantityFound =
          this.selected[index].quantityFound / 1000;
        this.selected[index].concentration_units = 'PPM';
        this.selected[index].unit = 'ug';
      }
      if (this.selected[index].unit === 'ng') {
        this.selected[index].quantityFound =
          this.selected[index].quantityFound * 1000;
        this.selected[index].concentration_units = 'PPB';
        this.selected[index].unit = 'ng';
      }

      console.debug(
        'Converted QuantityFound: ' + this.selected[index].quantityFound
      );
      this.quantityFoundCalculations(index, this.selected[index].quantityFound);
      console.debug(
        'Converted QuantityFound After recalculations: ' +
          this.selected[index].quantityFound
      );
    }
  }

  // Used to automatically set the Unit and convert the quantityFound.
  determineConcentrationFound(index: number): void {
    if (this.selected[index].found_concentration) {
      if (this.selected[index].concentration_units === 'PPM') {
        this.selected[index].found_concentration =
          this.selected[index].found_concentration / 1000;
      } else {
        this.selected[index].found_concentration =
          this.selected[index].found_concentration * 1000;
      }
    }
  }

  // This will make the mathematical determinations based on QuantityFound.
  quantityFoundCalculations(index: number, quantityFound: number): void {
    const selectedBadge = this.badgeList.find(
      (x) => x.badge_serial_number === this.tokenFormData.badge_serial_number
    );
    const selectedAnalyte = this.analyteList.find(
      (x) => x.cas_number === this.selected[index].casNumber
    );
    let concentrationVolume = 0;
    let concentration = 0;
    const molecularWeight = Number(selectedAnalyte.molecular_weight);
    const temperature = Number(selectedBadge.temperature_fahrenheit);
    let samplingRate = Number(selectedAnalyte.sampling_rate);
    const molarVolume = Number(22.4); // Currently using the 22.4L/mol generic Volume of a gas.
    const td = new Date(selectedBadge.turned_in_time).valueOf();
    const ad = new Date(selectedBadge.activated_time).valueOf();

    if (!samplingRate || samplingRate === 0) {
      samplingRate = 1;
    }

    this.determineQuantityFound(index);

    let exposureTime = Number((td - ad) / (60 * 1000)); // time in minutes
    console.log(td);
    console.log(ad);
    console.log(exposureTime);
    console.log(samplingRate);
    if (exposureTime < 0) {
      exposureTime = Math.abs(exposureTime);
    }

    if (
      samplingRate &&
      exposureTime &&
      samplingRate !== 0 &&
      exposureTime !== 0
    ) {
      concentrationVolume =
        (quantityFound * 1000) / (samplingRate * exposureTime);
      concentration =
        (1000 * concentrationVolume * molarVolume) / molecularWeight;
    }

    concentrationVolume = Math.round(concentrationVolume * 10000) / 10000;
    concentration = Math.round(concentration * 10000) / 10000;
    this.selected[index].found_concentration = concentration;
    this.selected[index].volume_concentration = concentrationVolume;
  }

  submit(): void {
    if (this.selected.every((x) => !x.edited && !x.newlyCreated)) {
      console.debug('All requested compounds are not new and unedited.');
      return this.state.emit('COMPLETED');
    } else {
      let completedCount = 0;
      for (const requestedCompound of this.selected) {
        this.reportService
          .updateAnalyzedReport(
            this.tokenFormData,
            requestedCompound,
            this.comments
          )
          .subscribe(
            () => {},
            (err) => {
              console.log(err);
            },
            () => {
              completedCount++;
              if (completedCount === this.selected.length) {
                this.modalWindowService.setModalContext('Success!!');
                console.debug('Emitting COMPLETED');
                this.state.emit('COMPLETED');
              }
            }
          );
      }
    }
  }
  // tslint:enable:no-console
}
