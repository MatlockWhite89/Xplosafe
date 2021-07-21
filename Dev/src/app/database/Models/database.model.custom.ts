export interface CustomResponseData {
  // Badge grid values.
  badge_serial_number?: string;
  assigned_user?: string;
  badge_status?: number;
  activated_time?: string;
  turned_in_time?: string;
  batch_group?: number;
  number_of_tokens?: number;
  analyst?: string;
  original_filename?: string;
  raw_comments?: string;
  date_created?: string;
  date_last_updated?: string;
  expiration_date?: string;

  // User grid values.
  username?: string;
  role?: string;
  group_id?: number;
  location?: string;
  manager?: string;
}

export class Custom {
  // Badge grid values.
  // tslint:disable:variable-name
  badge_serial_number?: string;
  assigned_user?: string;
  badge_status?: number;
  activated_time?: string;
  turned_in_time?: string;
  batch_group?: number;
  number_of_tokens?: number;
  analyst?: string;
  original_filename?: string;
  raw_comments?: string;
  date_created?: string;
  date_last_updated?: string;
  expiration_date?: string;

  // User grid values.
  username?: string;
  role?: string;
  group_id?: number;
  location?: string;
  manager?: string;

  constructor() {
    // Badge grid values.
    // tslint:disable:variable-name
    this.badge_serial_number = null;
    this.assigned_user = null;
    this.badge_status = null;
    this.activated_time = null;
    this.turned_in_time = null;
    this.batch_group = null;
    this.number_of_tokens = null;
    this.analyst = null;
    this.original_filename = null;
    this.raw_comments = null;
    this.date_created = null;
    this.date_last_updated = null;
    this.expiration_date = null;

    // User grid values.
    this.username = null;
    this.role = null;
    this.group_id = null;
    this.location = null;
    this.manager = null;
  }

  getBadgeSerialNumber(): string { return this.badge_serial_number; }
  getAssignedUser(): string { return this.assigned_user; }
  getBadgeStatus(): number { return this.badge_status; }
  getActivatedTime(): string { return this.activated_time; }
  getTurnedInTime(): string { return this.turned_in_time; }
  getBatchGroup(): number { return this.batch_group; }
  getNumberOfTokens(): number { return this.number_of_tokens; }
  getAnalyst(): string { return this.analyst; }
  getOriginalFilename(): string { return this.original_filename; }
  getRawComments(): string { return this.raw_comments; }
  getDateCreated(): string { return this.date_created; }
  getDateLastUpdated(): string { return this.date_last_updated; }
  getExpirationDate(): string { return this.expiration_date; }

  getUsername(): string { return this.username; }
  getRole(): string { return this.role; }
  getgroupId(): number { return this.group_id; }
  getLocation(): string { return this.location; }
  getManager(): string { return this.manager; }

  setBadgeSerialNumber(value: string): void { this.badge_serial_number = value; }
  setAssignedUser(value: string): void { this.assigned_user = value; }
  setBadgeStatus(value: number): void { this.badge_status = value; }
  setActivatedTime(value: string): void { this.activated_time = value; }
  setTurnedInTime(value: string): void { this.turned_in_time = value; }
  setBatchGroup(value: number): void { this.batch_group = value; }
  setNumberOfTokens(value: number): void { this.number_of_tokens = value; }
  setAnalyst(value: string): void { this.analyst = value; }
  setOriginalFilename(value: string): void { this.original_filename = value; }
  setRawComments(value: string): void { this.raw_comments = value; }
  setDateCreated(value: string): void { this.date_created = value; }
  setDateLastUpdated(value: string): void { this.date_last_updated = value; }
  setExpirationDate(value: string): void { this.expiration_date = value; }

  setUsername(value: string): void { this.username = value; }
  setRole(value: string): void { this.role = value; }
  setgroupId(value: number): void { this.group_id = value; }
  setLocation(value: string): void { this.location = value; }
  setManager(value: string): void { this.manager = value; }
}
