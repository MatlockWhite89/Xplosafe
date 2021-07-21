import DateTimeFormat = Intl.DateTimeFormat;

export interface DoehrsChainOfCustodyResponseData {
  id?: number;
  RelinquishedBy?: string;
  RelinquishedDateTime?: DateTimeFormat;
  ReceivedBy?: string;
  ReceivedDateTime?: DateTimeFormat;
  Comments?: string;
  LabSampleId?: string;
}

export class DoehrsChainOfCustody {
  id?: number;
  RelinquishedBy?: string;
  RelinquishedDateTime?: DateTimeFormat;
  ReceivedBy?: string;
  ReceivedDateTime?: DateTimeFormat;
  Comments?: string;
  LabSampleId?: string;


  constructor() {
    this.id = 0;
    this.RelinquishedBy = '';
    this.RelinquishedDateTime = null;
    this.ReceivedBy = '';
    this.ReceivedDateTime = null;
    this.Comments = '';
    this.LabSampleId = null;
  }

  // Getters
  getId(): number { return this.id; }
  getRelinquishedBy(): string { return this.RelinquishedBy; }
  getRelinquishedDateTime(): DateTimeFormat { return this.RelinquishedDateTime; }
  getReceivedBy(): string { return this.ReceivedBy; }
  getReceivedDateTime(): DateTimeFormat { return this.ReceivedDateTime; }
  getComments(): string { return this.Comments; }
  getLabSampleId(): string { return this.LabSampleId; }

  // Setters
  setId(value: number): void { this.id = value; }
  setRelinquishedBy(value: string): void { this.RelinquishedBy = value; }
  setRelinquishedDateTime(value: DateTimeFormat): void { this.RelinquishedDateTime = value; }
  setReceivedBy(value: string): void { this.ReceivedBy = value; }
  setReceivedDateTime(value: DateTimeFormat): void { this.ReceivedDateTime = value; }
  setComments(value: string): void { this.Comments = value; }
  setLabSampleId(value: string): void { this.LabSampleId = value; }
}
