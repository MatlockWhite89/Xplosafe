export interface UserResponseData {
  id?: number;
  username?: string;
  role?: number;
  password?: string;
  group_id?: number;
  location_id?: number;
  account_locked?: number;
  date_created?: string;
  date_last_updated?: string;
  date_password_expires?: string;
}

export class User {
  id?: number;
  username?: string;
  role?: number;
  password?: string;
  // tslint:disable-next-line:variable-name
  group_id?: number;
  // tslint:disable-next-line:variable-name
  location_id?: number;
  // tslint:disable-next-line:variable-name
  account_locked?: number;
  // tslint:disable-next-line:variable-name
  date_created?: string;
  // tslint:disable-next-line:variable-name
  date_last_updated?: string;
  // tslint:disable-next-line:variable-name
  date_password_expires?: string;

  constructor() {
    this.id = 0;
    this.username = '';
    this.role = 0;
    this.password = '';
    this.group_id = 0;
    this.location_id = 0;
    this.account_locked = 0;
    this.date_created = '';
    this.date_last_updated = '';
    this.date_password_expires = '';
  }

  // Getters
  getUserId(): number {
    return this.id;
  }
  getUserName(): string {
    return this.username;
  }
  getRole(): number {
    return this.role;
  }
  getPassword(): string {
    return this.password;
  }
  getGroupId(): number {
    return this.group_id;
  }
  getLocationId(): number {
    return this.location_id;
  }
  getDateCreated(): string {
    return this.date_created;
  }
  getDateLastUpdated(): string {
    return this.date_last_updated;
  }

  // Setters
  setUserId(newId: number): void {
    this.id = newId;
  }
  setUserName(user: string): void {
    this.username = user;
  }
  setRole(newRole: number): void {
    this.role = newRole;
  }
  setPassword(pass: string): void {
    this.password = pass;
  }
  setGroupId(group: number): void {
    this.group_id = group;
  }
  setLocationId(loc: number): void {
    this.location_id = loc;
  }
  setDateCreated(date: string): void {
    this.date_created = date;
  }
  setDateLastUpdated(date: string): void {
    this.date_last_updated = date;
  }
}
