export interface DataTableResponseData {
  id: number;
  data_table_type?: string;
  raw_data_id?: number;
  analyzed_data_id?: number;
  badge_id?: any;
  wearer?: any;
  wearer_id?: number;
  analyst?: string;
  analyst_id?: number;
  badge_serial_number?: string;
  raw_data?: string;
  raw_comments?: string;
  date_created?: string;
  date_last_updated?: string;
  original_filename?: string;
  raw_uploaded_by?: number;
  country?: string;
  city?: string;
  base?: string;
  state?: string;
}

export class Data {
  id: number;
  // tslint:disable-next-line:variable-name
  data_table_type?: string;
  // tslint:disable-next-line:variable-name
  raw_data_id?: number;
  // tslint:disable-next-line:variable-name
  badge_id?: any;
  // tslint:disable-next-line:variable-name
  wearer?: any;
  // tslint:disable-next-line:variable-name
  wearer_id?: number;
  // tslint:disable-next-line:variable-name
  analyst?: string;
  // tslint:disable-next-line:variable-name
  analyst_id?: number;
  // tslint:disable-next-line:variable-name
  badge_serial_number?: string;
  // tslint:disable-next-line:variable-name
  analyzed_data?: string;
  // tslint:disable-next-line:variable-name
  analyzed_comments?: string;
  // tslint:disable-next-line:variable-name
  raw_data?: string;
  // tslint:disable-next-line:variable-name
  raw_comments?: string;
  // tslint:disable-next-line:variable-name
  date_created?: string;
  // tslint:disable-next-line:variable-name
  date_last_updated?: string;
  // tslint:disable-next-line:variable-name
  original_filename?: string;
  // tslint:disable-next-line:variable-name
  raw_uploaded_by?: number;
  country?: string;
  city?: string;
  base?: string;
  state?: string;

  constructor() {
    this.id = null;
    this.data_table_type = null;
    this.raw_data_id = null;
    this.badge_id = null;
    this.wearer = null;
    this.wearer_id = null;
    this.analyst = null;
    this.analyst_id = null;
    this.badge_serial_number = null;
    this.analyzed_data = null;
    this.analyzed_comments = null;
    this.raw_data = null;
    this.raw_comments = null;
    this.date_created = null;
    this.date_last_updated = null;
    this.original_filename = null;
    this.raw_uploaded_by = null;
    this.country = null;
    this.city = null;
    this.base = null;
    this.state = null;
  }

  getId(): number {
    return this.id;
  }
  getDataTableType(): string {
    return this.data_table_type;
  }
  getRawDataId(): number {
    return this.raw_data_id;
  }
  getBadgeId(): any {
    return this.badge_id;
  }
  getWearer(): any {
    return this.wearer;
  }
  getWearerId(): number {
    return this.wearer_id;
  }
  getAnalyst(): string {
    return this.analyst;
  }
  getAnalystId(): number {
    return this.analyst_id;
  }
  getBadgeSerialNumber(): string {
    return this.badge_serial_number;
  }
  getAnalyzedData(): string {
    return this.analyzed_data;
  }
  getAnalyzedComments(): string {
    return this.analyzed_comments;
  }
  getRawData(): string {
    return this.raw_data;
  }
  getRawComments(): string {
    return this.raw_comments;
  }
  getDateCreated(): string {
    return this.date_created;
  }
  getDateLastUpdated(): string {
    return this.date_last_updated;
  }
  getRawUploadedBy(): number {
    return this.raw_uploaded_by;
  }
  getOriginalFilename(): string {
    return this.original_filename;
  }

  setId(value: number): void {
    this.id = value;
  }
  setDataTableType(value: string): void {
    this.data_table_type = value;
  }
  setRawDataId(value: number): void {
    this.raw_data_id = value;
  }
  setBadgeId(value: any): void {
    this.badge_id = value;
  }
  setWearer(value: any): void {
    this.wearer = value;
  }
  setWearerId(value: number): void {
    this.wearer_id = value;
  }
  setAnalyst(value: string): void {
    this.analyst = value;
  }
  setAnalystId(value: number): void {
    this.analyst_id = value;
  }
  setBadgeSerialNumber(value: string): void {
    this.badge_serial_number = value;
  }
  setAnalyzedData(value: string): void {
    this.analyzed_data = value;
  }
  setAnalyzedComments(value: string): void {
    this.analyzed_comments = value;
  }
  setRawData(value: string): void {
    this.raw_data = value;
  }
  setRawComments(value: string): void {
    this.raw_comments = value;
  }
  setDateCreated(value: string): void {
    this.date_created = value;
  }
  setDateLastUpdated(value: string): void {
    this.date_last_updated = value;
  }
  setRawUploadedBy(value: number): void {
    this.raw_uploaded_by = value;
  }
  setOriginalFilename(value: string): void {
    this.original_filename = value;
  }
}
