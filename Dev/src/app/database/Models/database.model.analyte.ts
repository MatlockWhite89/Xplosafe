export interface AnalyteResponseData {
  id: number;
  chemical_class_id: number;
  analyte_name: string;
  data_table_id: number;
  cas_number: string;
  osha_pel_ppm: string;
  osha_pel_mg: string;
  cal_osha_pel_8_hour_twa: string;
  cal_osha_pel_8_hour_twa_st: string;
  cal_osha_pel_8_hour_twa_c: string;
  niosh_rel_10_hour_twa: string;
  niosh_rel_10_hour_twa_st: string;
  niosh_rel_10_hour_twa_c: string;
  acgih_2019_tlv_8_hour_twa: string;
  acgih_2019_tlv_8_hour_twa_st: string;
  acgih_2019_tlv_8_hour_twa_c: string;
  date_last_updated: string;
  detection_limit: string;
  osu_6_sampling_rate: string;
  molecular_weight: string;
  reporting_limit: string;
  sampling_rate: string;
  // molecular_weight: string;
}

export class Analyte {
  id: number;
  // tslint:disable:variable-name
  chemical_class_id: number;
  analyte_name: string;
  data_table_id: number;
  cas_number: string;
  osha_pel_ppm: string;
  osha_pel_mg: string;
  cal_osha_pel_8_hour_twa: string;
  cal_osha_pel_8_hour_twa_st: string;
  cal_osha_pel_8_hour_twa_c: string;
  niosh_rel_10_hour_twa: string;
  niosh_rel_10_hour_twa_st: string;
  niosh_rel_10_hour_twa_c: string;
  acgih_2019_tlv_8_hour_twa: string;
  acgih_2019_tlv_8_hour_twa_st: string;
  acgih_2019_tlv_8_hour_twa_c: string;
  date_last_updated: string;
  detection_limit: string;
  osu_6_sampling_rate: string;
  molecular_weight: string;
  reporting_limit: string;
  sampling_rate: string;
  // tslint:enable:variable-name

  constructor() {
    this.id = 0;
    this.chemical_class_id = 0;
    this.analyte_name = '';
    this.data_table_id = 0;
    this.cas_number = '';
    this.osha_pel_ppm = '';
    this.osha_pel_mg = '';
    this.cal_osha_pel_8_hour_twa = '';
    this.cal_osha_pel_8_hour_twa_st = '';
    this.cal_osha_pel_8_hour_twa_c = '';
    this.niosh_rel_10_hour_twa = '';
    this.niosh_rel_10_hour_twa_st = '';
    this.niosh_rel_10_hour_twa_c = '';
    this.acgih_2019_tlv_8_hour_twa = '';
    this.acgih_2019_tlv_8_hour_twa_st = '';
    this.acgih_2019_tlv_8_hour_twa_c = '';
    this.date_last_updated = '';
    this.detection_limit = '';
    this.osu_6_sampling_rate = '';
    this.molecular_weight = '';
    this.reporting_limit = '';
    this.sampling_rate = '';
  }

  // Getters
  getId(): number { return this.id; }
  getChemicalClassId(): number { return this.chemical_class_id; }
  getAnalyteName(): string { return this.analyte_name; }
  getDataTableId(): number { return this.data_table_id; }
  getCasNumber(): string { return this.cas_number; }
  getOshaPPM(): string { return this.osha_pel_ppm; }
  getOshaMg(): string { return this.osha_pel_mg; }
  getOshatwa(): string { return this.cal_osha_pel_8_hour_twa; }
  getOshatwaSt(): string { return this.cal_osha_pel_8_hour_twa_st; }
  getOshatwaC(): string { return this.cal_osha_pel_8_hour_twa_c; }
  getNioshTwa(): string { return this.niosh_rel_10_hour_twa; }
  getNioshTwaSt(): string { return this.niosh_rel_10_hour_twa_st; }
  getNioshTwaC(): string { return this.niosh_rel_10_hour_twa_c; }
  getAcgihTwa(): string { return this.acgih_2019_tlv_8_hour_twa; }
  getAcgihTwaSt(): string { return this.acgih_2019_tlv_8_hour_twa_st; }
  getAcgihTwaC(): string { return this.acgih_2019_tlv_8_hour_twa_c; }
  getDateLastUpdated(): string { return this.date_last_updated; }
  getDetectionLimit(): string { return this.detection_limit; }
  getOsu6SamplingRate(): string { return this.osu_6_sampling_rate; }
  getMolecularWeight(): string { return this.molecular_weight; }
  getReportingLimit(): string { return this.reporting_limit; }
  getSamplingRate(): string { return this.sampling_rate; }

  // Setters
  setId(value: number): void { this.id = value; }
  setChemicalClassId(value: number): void { this.chemical_class_id = value; }
  setAnalyteName(value: string): void { this.analyte_name = value; }
  setDataTableId(value: number): void { this.data_table_id = value; }
  setCasNumber(value: string): void { this.cas_number = value; }
  setOshaPPM(value: string): void { this.osha_pel_ppm = value; }
  setOshaMg(value: string): void { this.osha_pel_mg = value; }
  setOshaTwa(value: string): void { this.cal_osha_pel_8_hour_twa = value; }
  setOshaTwaSt(value: string): void { this.cal_osha_pel_8_hour_twa_st = value; }
  setOshaTwaC(value: string): void { this.cal_osha_pel_8_hour_twa_c = value; }
  setNioshTwa(value: string): void { this.niosh_rel_10_hour_twa = value; }
  setNioshTwaSt(value: string): void { this.niosh_rel_10_hour_twa_st = value; }
  setNioshTwaC(value: string): void { this.niosh_rel_10_hour_twa_c = value; }
  setAcgihTwa(value: string): void { this.acgih_2019_tlv_8_hour_twa = value; }
  setAcgihTwaSt(value: string): void { this.acgih_2019_tlv_8_hour_twa_st = value; }
  setAcgihTwaC(value: string): void { this.acgih_2019_tlv_8_hour_twa_c = value; }
  setDateLastUpdated(value: string): void {this.date_last_updated = value; }
  setDetectionLimit(value: string): void { this.detection_limit = value; }
  setOsu6SamplingRate(value: string): void { this.osu_6_sampling_rate = value; }
  setMolecularWeight(value: string): void { this.molecular_weight = value; }
  setReportingLimit(value: string): void { this.reporting_limit = value; }
  setSamplingRate(value: string): void { this.sampling_rate = value; }
}
