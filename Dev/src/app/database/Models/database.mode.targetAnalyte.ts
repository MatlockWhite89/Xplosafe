export interface TargetAnalyteResponse {
  id?: number;
  badge_serial_number?: string;
  token_id?: string;
  target_analyte_name?: string;
  target_cas_number?: string;
  token_type?: string;
}

export class TargetAnalyte {
  // tslint:disable:variable-name
  id?: number;
  badge_serial_number?: string;
  token_id?: string;
  target_analyte_name?: string;
  target_cas_number?: string;
  token_type?: string;

  constructor() {
    this.id = null;
    this.badge_serial_number = null;
    this.token_id = null;
    this.target_analyte_name = null;
    this.target_cas_number = null;
    this.token_type = null;
  }

  getId(): number { return this.id; }
  getBadgeSerialNumber(): string { return this.badge_serial_number; }
  getTokenId(): string { return this.token_id; }
  getTargetAnalyteName(): string { return this.target_analyte_name; }
  getTargetCasNumber(): string { return this.target_cas_number; }
  getTokenType(): string { return this.token_type; }

  setId(value: number): void { this.id = value; }
  setBadgeSerialNumber(value: string): void { this.badge_serial_number = value; }
  setTokenId(value: string): void { this.token_id = value; }
  setTargetAnalyteName(value: string): void { this.target_analyte_name = value; }
  setTargetCasNumber(value: string): void { this.target_cas_number = value; }
  setTokenType(value: string): void { this.token_type = value; }
}
