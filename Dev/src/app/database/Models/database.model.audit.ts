export interface AuditResponseData {
  id: number;
  event_id: number;
  user_id: number;
  log_data: string;
  location: number;
  date_created: string;
  ip_endpoint: string;
}
export class DatabaseModelAudit {
  // tslint:disable:variable-name
  id: number;
  event_id: number;
  user_id: number;
  log_data: string;
  location: number;
  date_created: string;
  ip_endpoint: string;

  constructor() {
    this.id = 0;
    this.event_id = 0;
    this.user_id = 0;
    this.log_data = '';
    this.location = 0;
    this.date_created = '';
    this.ip_endpoint = '';
  }

  // Getters
  getId(): number
  {
    return this.id;
  }

  getEvent(): number
  {
    return this.event_id;
  }

  getUserId(): number
  {
    return this.user_id;
  }

  getLogData(): string
  {
    return this.log_data;
  }

  getLocation(): number
  {
    return this.location;
  }

  getDate(): string
  {
    return this.date_created;
  }

  getIpEndpoint(): string
  {
    return this.ip_endpoint;
  }

  // Setters
  setId(newId: number): void
  {
    this.id = newId;
  }

  setEvent(newEvent: number): void
  {
    this.event_id = newEvent;
  }

  setUserId(newUserId: number): void
  {
    this.user_id = newUserId;
  }

  setLogData(newLogData: string): void
  {
    this.log_data = newLogData;
  }

  setLocation(newLocation: number): void
  {
    this.location = newLocation;
  }

  setDate(newDate: string): void
  {
    this.date_created = newDate;
  }

  setIpEndpoint(value: string): void {
    this.ip_endpoint = value;
  }
}
