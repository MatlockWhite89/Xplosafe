export interface BadgeResponseData {
  id: number;
  assigned_user: string;
  badge_status: number;
  activated_time?: any;
  turned_in_time?: any;
  expiration_date?: any;
  batch_group: string;
  badge_serial_number: string;
  number_of_tokens: number;
  date_created?: string;
  date_last_updated?: string;
  temperature_fahrenheit?: string;
  temperature_celsius?: string;
  relative_humidity?: string;
  vapors_exposed?: string;
  notes?: string;
}

export class Badge {
  // tslint:disable:variable-name
  id: number;
  assigned_user: string;
  badge_status: number;
  activated_time?: any;
  turned_in_time?: any;
  expiration_date?: any;
  batch_group: string;
  badge_serial_number: string;
  number_of_tokens: number;
  date_created?: string;
  date_last_updated?: string;
  temperature_fahrenheit?: string;
  temperature_celsius?: string;
  relative_humidity?: string;
  vapors_exposed?: string;
  notes?: string;
  // tslint:enable:variable-name

  constructor() {
    this.id = null;
    this.assigned_user = null;
    this.badge_status = null;
    this.activated_time = null;
    this.turned_in_time = null;
    this.expiration_date = null;
    this.batch_group = null;
    this.badge_serial_number = null;
    this.number_of_tokens = null;
    this.date_created = null;
    this.date_last_updated = null;
    this.temperature_fahrenheit = null;
    this.temperature_celsius = null;
    this.relative_humidity = null;
    this.vapors_exposed = null;
    this.notes = null;
  }

  getId(): number { return this.id; }
  getAssignedUser(): string { return this.assigned_user; }
  getBadgeStatus(): number { return this.badge_status; }
  getActivatedTime(): any { return this.activated_time; }
  getExpirationDate(): any { return this.expiration_date; }
  getTurnedInTime(): any { return this.turned_in_time; }
  getBatchGroup(): string { return this.batch_group; }
  getBadgeSerialNumber(): string { return this.badge_serial_number; }
  getNumberOfTokens(): number { return this.number_of_tokens; }
  getDateCreated(): string { return this.date_created; }
  getDateLastUpdated(): string { return this.date_last_updated; }
  getTemperatureFahrenheit(): string { return this.temperature_fahrenheit; }
  getTemperatureCelsius(): string { return this.temperature_celsius; }
  getRelativeHumidity(): string { return this.relative_humidity; }
  getVaporsExposed(): string { return this.vapors_exposed; }
  getNotes(): string { return this.notes; }

  setId(value: number): void { this.id = value; }
  setAssignedUser(value: string): void { this.assigned_user = value; }
  setBadgeStatus(value: number): void { this.badge_status = value; }
  setActivatedTime(value: any): void { this.activated_time = value; }
  setTurnedInTime(value: any): void { this.turned_in_time = value; }
  setExpirationdate(value: any): void { this.expiration_date = value; }
  setBatchGroup(value: string): void { this.batch_group = value; }
  setBadgeSerialNumber(value: string): void { this.badge_serial_number = value; }
  setNumberOfTokens(value: number): void { this.number_of_tokens = value; }
  setDateCreated(value: string): void { this.date_created = value; }
  setDateLastUpdated(value: string): void { this.date_last_updated = value; }
  setTemperatureFahrenheit(value: string): void { this.temperature_fahrenheit = value; }
  setTemperatureCelsius(value: string): void { this.temperature_celsius = value; }
  setRelativeHumidity(value: string): void { this.relative_humidity = value; }
  setVaporsExposed(value: string): void { this.vapors_exposed = value; }
  setNotes(value: string): void { this.notes = value; }
}
