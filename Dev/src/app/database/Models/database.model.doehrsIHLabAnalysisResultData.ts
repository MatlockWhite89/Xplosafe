export interface DoehrsIHLabAnalysisResultDataResponse {
  id?: number;
  Lab?: number;
  LabSampleId?: string;
}

export class IHLabAnalysisResultData {
  id?: number;
  Lab?: number;
  LabSampleId?: string;

  constructor() {
    this.id = null;
    this.Lab = null;
    this.LabSampleId = null;
  }

  // Getters
  getId(): number { return this.id; }
  getLab(): number { return this.Lab; }
  getSample(): string { return this.LabSampleId; }

  // Setters
  setId(value: number): void { this.id = value; }
  setLab(value: number): void { this.Lab = value; }
  setSample(value: string): void { this.LabSampleId = value; }
}
