export interface SamplingRateResponseData {
  id: number;
  chemical_class_id: number;
  analyte_name: string;
  cas_number: string;
  analyte_id: number;
  osu_6_sampling_rate: string;
  detection_limit: string;
  date_last_updated: string;
}

export class SamplingRate {
  id: number;
  // tslint:disable-next-line:variable-name
  chemical_class_id: number;
  // tslint:disable-next-line:variable-name
  analyte_name: string;
  // tslint:disable-next-line:variable-name
  cas_number: string;
  // tslint:disable-next-line:variable-name
  analyte_id: number;
  // tslint:disable-next-line:variable-name
  osu_6_sampling_rate: string;
  // tslint:disable-next-line:variable-name
  detection_limit: string;
  // tslint:disable-next-line:variable-name
  date_last_updated: string;

  constructor() {
    this.id = 0;
    this.chemical_class_id = 0;
    this.analyte_name = '';
    this.cas_number = '';
    this.analyte_id = 0;
    this.detection_limit = '';
    this.osu_6_sampling_rate = '';
    this.date_last_updated = '';
  }

  // Getters
  getId(): number { return this.id; }
  getChemicalClassId(): number { return this.chemical_class_id; }
  getAnalyteName(): string { return this.analyte_name; }
  getCasNumber(): string { return this.cas_number; }
  getAnalyteId(): number { return this.analyte_id; }
  getDetectionLimit(): string { return this.detection_limit; }
  getOsu6SamplingRate(): string { return this.osu_6_sampling_rate; }
  getDateLastUpdated(): string { return this.date_last_updated; }

  // Setters
  setId(value: number): void { this.id = value; }
  setChemicalClassId(value: number): void { this.chemical_class_id = value; }
  setAnalyteName(value: string): void { this.analyte_name = value; }
  setCasNumber(value: string): void { this.cas_number = value; }
  setAnalyteId(value: number): void { this.analyte_id = value; }
  setDetectionLimit(value: string): void { this.detection_limit = value; }
  setOsu6SamplingRate(value: string): void { this.osu_6_sampling_rate = value; }
  setDateLastUpdated(value: string): void {this.date_last_updated = value; }
}
