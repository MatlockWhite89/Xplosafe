export interface DoehrsSampleResponseData {
  id?: number;
  SampleId?: string;
  SampleFieldId?: string;
  LabSampleId?: string;
  SampleAnalyzedDate?: Date;
  ResultsReportedDate?: Date;
  ResultsReturnedDate?: Date;
  PostSampledWeight?: number;
  NetWeight?: number;
  LabSampleComments?: string;
}

export class DoehrsSample {
  id?: number;
  SampleId?: string;
  SampleFieldId?: string;
  LabSampleId?: string;
  SampleAnalyzedDate?: Date;
  ResultsReportedDate?: Date;
  ResultsReturnedDate?: Date;
  PostSampledWeight?: number;
  NetWeight?: number;
  LabSampleComments?: string;


  constructor() {
    this.id = 0;
    this.SampleId = '';
    this.LabSampleId = '';
    this.SampleAnalyzedDate = null;
    this.ResultsReportedDate = null;
    this.ResultsReturnedDate = null;
    this.PostSampledWeight = 0;
    this.NetWeight = 0;
    this.LabSampleComments = null;
  }

  // Getters
  getId(): number { return this.id; }
  getSampleId(): string { return this.SampleId; }
  getLabSampleId(): string { return this.LabSampleId; }
  getSampleAnalyzedDate(): Date { return this.SampleAnalyzedDate; }
  getResultsReportedDate(): Date { return this.ResultsReportedDate; }
  getResultsReturnedDate(): Date { return this.ResultsReturnedDate; }
  getPostSampledWeight(): number { return this.PostSampledWeight; }
  getNetWeight(): number { return this.NetWeight; }
  getLabSampleComments(): string { return this.LabSampleComments; }

  // Setters
  setId(value: number): void { this.id = value; }
  setSampleId(value: string): void { this.SampleId = value; }
  setLabSampleId(value: string): void { this.LabSampleId = value; }
  setSampleAnalyzedDate(value: Date): void { this.SampleAnalyzedDate = value; }
  setResultsReportedDate(value: Date): void { this.ResultsReportedDate = value; }
  setResultsReturnedDate(value: Date): void { this.ResultsReturnedDate = value; }
  setPostSampledWeight(value: number): void { this.PostSampledWeight = value; }
  setNetWeight(value: number): void { this.NetWeight = value; }
  setLabSampleComments(value: string): void { this.LabSampleComments = value; }
}
