export interface GroupResponseData {
  id?: number;
  location_id?: number;
  manager_id?: number;
  date_created?: string;
  date_last_updated?: string;
}
export class Group {
  id?: number;
  // tslint:disable-next-line:variable-name
  manager_id?: number;
  // tslint:disable-next-line:variable-name
  location_id?: number;
  // tslint:disable-next-line:variable-name
  date_created?: string;
  // tslint:disable-next-line:variable-name
  date_last_updated?: string;

  constructor() {
    this.id = null;
    this.manager_id = null;
    this.location_id = null;
    this.date_created = null;
    this.date_last_updated = null;
  }

  getId(): number { return this.id; }
  getManagerId(): number { return this.manager_id; }
  getLocationId(): number { return this.location_id; }
  getDateCreated(): string { return this.date_created; }
  getDateLastUpdated(): string { return this.date_last_updated; }

  setId(value: number): void { this.id = value; }
  setManagerId(value: number): void { this.manager_id = value; }
  setLocationId(value: number): void { this.location_id = value; }
  setDateCreated(value: string): void { this.date_created = value; }
  setDateLastUpdated(value: string): void { this.date_last_updated = value; }
}
