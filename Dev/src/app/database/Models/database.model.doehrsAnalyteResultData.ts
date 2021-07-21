import DateTimeFormat = Intl.DateTimeFormat;

export interface DoehrsAnalyteResultDataResponseData {
  id: number;
  AnalyteIdentifier: string;
  CASNumber: string;
  AnalyteName: string;
  AnalyzedDateTime: DateTimeFormat;
  Inspirability: string;
  AnalyticalMethod: string;
  MassMeasuredResult: number;
  MassMeasuredResultQualifier: string;
  MassCorrectedResult: number;
  MassCorrectedResultQualifier: string;
  MassResultUnit: string;
  ConcentrationMeasuredResult: number;
  ConcentrationMeasuredResultQualifier: string;
  ConcentrationCorrectedResult: number;
  ConcentrationCorrectedResultQualifier: string;
  ConcentrationResultUnit: string;
  ResultNotDetected: boolean;
  ResultComments: string;
  ReportingLimit: number;
  ReportingLimitUnit: string;
}

export class DoehrsAnalyteResultData {
  id: number;
  AnalyteIdentifier: string;
  CASNumber: string;
  AnalyteName: string;
  AnalyzedDateTime: DateTimeFormat;
  Inspirability: string;
  AnalyticalMethod: string;
  MassMeasuredResult: number;
  MassMeasuredResultQualifier: string;
  MassCorrectedResult: number;
  MassCorrectedResultQualifier: string;
  MassResultUnit: string;
  ConcentrationMeasuredResult: number;
  ConcentrationMeasuredResultQualifier: string;
  ConcentrationCorrectedResult: number;
  ConcentrationCorrectedResultQualifier: string;
  ConcentrationResultUnit: string;
  ResultNotDetected: boolean;
  ResultComments: string;
  ReportingLimit: number;
  ReportingLimitUnit: string;


  constructor() {
    this.id = 0;
    this.AnalyteIdentifier = '';
    this.CASNumber = '';
    this.AnalyteName = '';
    this.AnalyzedDateTime = null;
    this.Inspirability = '';
    this.AnalyticalMethod = '';
    this.MassMeasuredResult = 0;
    this.MassMeasuredResultQualifier = '';
    this.MassCorrectedResult = 0;
    this.MassCorrectedResultQualifier = '';
    this.MassResultUnit = '';
    this.ConcentrationMeasuredResult = 0;
    this.ConcentrationMeasuredResultQualifier = '';
    this.ConcentrationCorrectedResult = 0;
    this.ConcentrationCorrectedResultQualifier = '';
    this.ConcentrationResultUnit = '';
    this.ResultNotDetected = false;
    this.ResultComments = '';
    this.ReportingLimit = 0;
    this.ReportingLimitUnit = '';
  }

  // Getters
  getId(): number { return this.id; }
  getAnalyteIdentifier(): string { return this.AnalyteIdentifier; }
  getCasNumber(): string { return this.CASNumber; }
  getAnalyteName(): string { return this.AnalyteName; }
  getAnalyzedDateTime(): DateTimeFormat { return this.AnalyzedDateTime; }
  getInspirability(): string { return this.Inspirability; }
  getAnalyticalMethod(): string { return this.AnalyticalMethod; }
  getMassMeasuredResult(): number { return this.MassMeasuredResult; }
  getMassMeasuredResultQualifier(): string { return this.MassMeasuredResultQualifier; }
  getMassCorrectedResult(): number { return this.MassCorrectedResult; }
  getMassCorrectedResultQualifier(): string { return this.MassCorrectedResultQualifier; }
  getMassResultUnit(): string { return this.MassResultUnit; }
  getConcentrationMeasuredResult(): number { return this.ConcentrationMeasuredResult; }
  getConcentrationMeasuredResultQualifier(): string { return this.ConcentrationMeasuredResultQualifier; }
  getConcentrationCorrectedResult(): number { return this.ConcentrationCorrectedResult; }
  getConcentrationCorrectedResultQualifier(): string { return this.ConcentrationCorrectedResultQualifier; }
  getConcnetrationResultUnit(): string { return this.ConcentrationResultUnit; }
  getResultNotDetected(): boolean { return this.ResultNotDetected; }
  getResultComments(): string { return this.ResultComments; }
  getReportingLimit(): number { return this.ReportingLimit; }
  getReportingLimitUnit(): string { return this.ReportingLimitUnit; }

  // Setters
  setId(value: number): void { this.id = value; }
  setAnalyteIdentifier(value: string): void { this.AnalyteIdentifier = value; }
  setCasNumber(value: string): void { this.CASNumber = value; }
  setAnalyteName(value: string): void { this.AnalyteName = value; }
  setAnalyzedDateTime(value: DateTimeFormat): void { this.AnalyzedDateTime = value; }
  setInspirability(value: string): void { this.Inspirability = value; }
  setAnalyticalMethod(value: string): void { this.AnalyticalMethod = value; }
  setMassMeasuredResult(value: number): void { this.MassMeasuredResult = value; }
  setMassMeasuredResultQualifier(value: string): void { this.MassMeasuredResultQualifier = value; }
  setMassCorrectedResult(value: number): void { this.MassCorrectedResult = value; }
  setMassCorrectedResultQualifier(value: string): void { this.MassCorrectedResultQualifier = value; }
  setMassResultUnit(value: string): void { this.MassResultUnit = value; }
  setConcentrationMeasuredResult(value: number): void { this.ConcentrationMeasuredResult = value; }
  setConcentrationMeasuredResultQualifier(value: string): void { this.ConcentrationMeasuredResultQualifier = value; }
  setConcentrationCorrectedResult(value: number): void { this.ConcentrationCorrectedResult = value; }
  setConcentrationCorrectedResultQualifier(value: string): void { this.ConcentrationCorrectedResultQualifier = value; }
  setConcnetrationResultUnit(value: string): void { this.ConcentrationResultUnit = value; }
  setResultNotDetected(value: boolean): void { this.ResultNotDetected = value; }
  setResultComments(value: string): void { this.ResultComments = value; }
  setReportingLimit(value: number): void { this.ReportingLimit = value; }
  setReportingLimitUnit(value: string): void { this.ReportingLimitUnit = value; }
}
