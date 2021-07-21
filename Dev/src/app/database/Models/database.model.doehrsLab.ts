import DateTimeFormat = Intl.DateTimeFormat;

export interface DoehrsLabResponseData {
  id: number;
  LabName: string;
  LabCode: string;
  POCName: string;
  POCEmail: string;
  POCPhone: string;
}

export class DoehrsLab {
  id: number;
  LabName: string;
  LabCode: string;
  POCName: string;
  POCEmail: string;
  POCPhone: string;


  constructor() {
    this.id = 0;
    this.LabName = '';
    this.LabCode = '';
    this.POCName = '';
    this.POCEmail = '';
    this.POCPhone = '';
  }

  // Getters
  getId(): number { return this.id; }
  getLabName(): string { return this.LabName; }
  getLabCode(): string { return this.LabCode; }
  getPOCName(): string { return this.POCName; }
  getPOCEmail(): string { return this.POCEmail; }
  getPOCPhone(): string { return this.POCPhone; }

  // Setters
  setId(value: number): void { this.id = value; }
  setLabName(value: string): void { this.LabName = value; }
  setLabCode(value: string): void { this.LabCode = value; }
  setPOCName(value: string): void { this.POCName = value; }
  setPOCEmail(value: string): void { this.POCEmail = value; }
  setPOCPhone(value: string): void { this.POCPhone = value; }
}
