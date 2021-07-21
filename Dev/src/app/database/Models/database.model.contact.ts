export interface ContactResponseData {
  id: number;
  user_id: number;
  email: string;
  phone_number: string;
  date_created: string;
  date_last_updated: string;
}

export class Contact {
  id?: number;
  // tslint:disable-next-line:variable-name
  user_id?: number;
  email?: string;
  // tslint:disable-next-line:variable-name
  phone_number?: string;
  // tslint:disable-next-line:variable-name
  date_created?: string;
  // tslint:disable-next-line:variable-name
  date_last_updated?: string;

  constructor() {
    this.id = null;
    this.user_id = null;
    this.email = null;
    this.phone_number = null;
    this.date_created = null;
    this.date_last_updated = null;
  }

  // Getters
  getId(): number { return this.id; }
  getUserId(): number { return this.user_id; }
  getEmail(): string { return this.email; }
  getPhoneNumber(): string { return this.phone_number; }
  getDateCreated(): string { return this.date_created; }
  getDateLastUpdated(): string { return this.date_last_updated; }

  // Setters
  setId(newId: number): void { this.id = newId; }
  setUserId(newUserId: number): void { this.user_id = newUserId; }
  setEmail(newEmail: string): void { this.email = newEmail; }
  setPhoneNumber(pNumber: string): void { this.phone_number = pNumber; }
  setDateCreated(date: string): void { this.date_created = date; }
  setDateLastUpdated(date: string): void { this.date_last_updated = date; }
}
