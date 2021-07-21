export interface AnalyzedTokenResponseData {
  id?: number;
  cas_number?: string;
  analyte_name?: string;
  recorded_value?: string;
  badge_serial_number?: string;
  token_id?: number;
  data_table_id?: number;
  analyst_id?: number;
  token_type?: string;
  analysis_method?: string;
  recorded_units?: string;
  reporting_limit?: string;
  volume_concentration?: string;
  found_concentration?: string;
  concentration_units?: string;
  molar_volume?: string;
  sampling_rate?: string;
  molecular_weight?: string;
  analyzed_comments?: string;
  date_created?: string;
  date_last_updated?: string;
}

export class AnalyzedToken {
  id?: number;
  // tslint:disable-next-line:variable-name
  cas_number?: string;
  // tslint:disable-next-line:variable-name
  analyte_name?: string;
  // tslint:disable-next-line:variable-name
  recorded_value?: string;
  // tslint:disable-next-line:variable-name
  badge_serial_number?: string;
  // tslint:disable-next-line:variable-name
  token_id?: number;
  // tslint:disable-next-line:variable-name
  data_table_id?: number;
  // tslint:disable-next-line:variable-name
  analyst_id?: number;
  // tslint:disable-next-line:variable-name
  token_type?: string;
  // tslint:disable-next-line:variable-name
  analysis_method?: string;
  // tslint:disable-next-line:variable-name
  recorded_units?: string;
  // tslint:disable-next-line:variable-name
  reporting_limit?: string;
  // tslint:disable-next-line:variable-name
  volume_concentration?: string;
  // tslint:disable-next-line:variable-name
  found_concentration?: string;
  // tslint:disable-next-line:variable-name
  concentration_units?: string;
  // tslint:disable-next-line:variable-name
  molar_volume?: string;
  // tslint:disable-next-line:variable-name
  sampling_rate?: string;
  // tslint:disable-next-line:variable-name
  molecular_weight?: string;
  // tslint:disable-next-line:variable-name
  analyzed_comments?: string;
  // tslint:disable-next-line:variable-name
  date_created?: string;
  // tslint:disable-next-line:variable-name
  date_last_updated?: string;

  constructor() {
    this.id = null;
    this.cas_number = null;
    this.analyte_name = null;
    this.recorded_value = null;
    this.badge_serial_number = null;
    this.token_id = null;
    this.data_table_id = null;
    this.analyst_id = null;
    this.token_type = null;
    this.analysis_method = null;
    this.reporting_limit = null;
    this.volume_concentration = null;
    this.found_concentration = null;
    this.concentration_units = null;
    this.analyzed_comments = null;
    this.date_created = null;
    this.date_last_updated = null;
    this.molar_volume = null;
    this.sampling_rate = null;
    this.molecular_weight = null;
  }

  getId(): number { return this.id; }
  getCasNumber(): string { return this.cas_number; }
  getAnalyteName(): string { return this.analyte_name; }
  getRecordedValue(): string { return this.recorded_value; }
  getBadgeSerialNumber(): string { return this.badge_serial_number; }
  getTokenId(): number { return this.token_id; }
  getDataId(): number { return this.data_table_id; }
  getAnalystId(): any { return this.analyst_id; }
  getTokenType(): string { return this.token_type; }
  getAnalysisMethod(): string { return this.analysis_method; }
  getReportingLimit(): string { return this.reporting_limit; }
  getVolumeConcentration(): string { return this.volume_concentration; }
  getFoundConcentration(): string { return this.found_concentration; }
  getConcentrationUnits(): string { return this.concentration_units; }
  getAnalyzedComments(): any { return this.analyzed_comments; }
  getDateCreated(): string { return this.date_created; }
  getDateLastUpdated(): string { return this.date_last_updated; }
  getMolarVolume(): string { return this.molar_volume; }
  getSamplingRate(): string { return this.sampling_rate; }
  getMolecularWeight(): string { return this.molecular_weight; }

  setId(value: number): void { this.id = value; }
  setCasNumber(value: string): void { this.cas_number = value; }
  setAnalyteName(value: string): void { this.analyte_name = value; }
  setRecordedValue(value: string): void { this.recorded_value = value; }
  setBadgeSerialNumber(value: string): void { this.badge_serial_number = value; }
  setTokenId(value: number): void { this.token_id = value; }
  setDataId(value: number): void { this.data_table_id = value; }
  setAnalystId(value: number): void { this.analyst_id = value; }
  setTokenType(value: string): void { this.token_type = value; }
  setAnalysisMethod(value: string): void { this.analysis_method = value; }
  setReportingLimit(value: string): void { this.reporting_limit = value; }
  setVolumeConcentration(value: string): void { this.volume_concentration = value; }
  setFoundConcentration(value: string): void { this.found_concentration = value; }
  setConcentrationUnits(value: string): void { this.concentration_units = value; }
  setAnalyzedComments(value: string): void { this.analyzed_comments = value; }
  setDateCreated(value: string): void { this.date_created = value; }
  setDateLastUpdated(value: string): void { this.date_last_updated = value; }
  setMolarVolume(value: string): void { this.molar_volume = value; }
  setSamplingRate(value: string): void { this.sampling_rate = value; }
  setMolecularWeight(value: string): void { this.molecular_weight = value; }
}
