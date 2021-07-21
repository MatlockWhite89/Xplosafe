export interface TokenResponseData {
  id?: number;
  batch_group_number?: number;
  tube_number?: number;
  badge_number?: number;
  type?: string;
  data_table_id?: number;
  state?: string;
  analyzed_data_id?: number;
  raw_data_id?: number;
  date_created?: string;
  date_last_updated?: string;
}
export class DatabaseModelToken {
  id?: number;
  // tslint:disable:variable-name
  batch_group_number?: number;
  tube_number?: number;
  badge_number?: number;
  type?: string;
  data_table_id?: number;
  state?: string;
  analyzed_data_id?: number;
  raw_data_id?: number;
  date_created?: string;
  date_last_updated?: string;

  constructor() {
    this.id = null;
    this.batch_group_number = null;
    this.tube_number = null;
    this.badge_number = null;
    this.type = null;
    this.state = null;
    this.data_table_id = null;
    this.analyzed_data_id = null;
    this.raw_data_id = null;
    this.date_created = null;
    this.date_last_updated = null;
  }

  // Getters
  getId(): number {
    return this.id;
  }
  getBatchGroupNumber(): number {
    return this.batch_group_number;
  }
  getTubeNumber(): number {
    return this.tube_number;
  }
  getBadgeNumber(): number {
    return this.badge_number;
  }
  getType(): string {
    return this.type;
  }
  getDataTableId(): number {
    return this.data_table_id;
  }
  getAnalyzedDataId(): number {
    return this.analyzed_data_id;
  }
  getRawDataId(): number {
    return this.raw_data_id;
  }
  getDateCreated(): string {
    return this.date_created;
  }
  getDateLastUpdated(): string {
    return this.date_last_updated;
  }
  getState(): string {
    return this.state;
  }

  // Setters
  setId(value: number): void {
    this.id = value;
  }
  setBatchGroupNumber(value: number): void {
    this.batch_group_number = value;
  }
  setTubeNumber(value: number): void {
    this.tube_number = value;
  }
  setBadgeNumber(value: number): void {
    this.badge_number = value;
  }
  setType(value: string): void {
    this.type = value;
  }
  setDataTableId(value: number): void {
    this.data_table_id = value;
  }
  setAnalyzedDataId(value: number): void {
    this.analyzed_data_id = value;
  }
  setRawDataId(value: number): void {
    this.raw_data_id = value;
  }
  setDateCreated(value: string): void {
    this.date_created = value;
  }
  setDateLastUpdated(value: string): void {
    this.date_last_updated = value;
  }
  setState(value: string): void {
    this.state = value;
  }
}
