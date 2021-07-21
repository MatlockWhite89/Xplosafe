export interface EventAuditResponseData {
  id: number;
  event: number;
  userId: number;
  logData: number;
  location: number;
  date_created: number;
}
// export class DatabaseModelEventAudit {
//   id: number;
//   event: number;
//   userId: number;
//   logData: number;
//   location: number;
//   date: number;
//
//   constructor() {
//     this.id = 0;
//     this.event = 0;
//     this.userId = 0;
//     this.logData = 0;
//     this.location = 0;
//     this.date = Date.now();
//   }
//
//   // Getters
//   getId(): number
//   {
//     return this.id;
//   }
//
//   getEvent(): number
//   {
//     return this.event;
//   }
//
//   getUserId(): number
//   {
//     return this.userId;
//   }
//
//   getLogData(): number
//   {
//     return this.logData;
//   }
//
//   getLocation(): number
//   {
//     return this.location;
//   }
//
//   getDate(): number
//   {
//     return this.date;
//   }
//
//   // Setters
//   setId(newId: number): void
//   {
//     this.id = newId;
//   }
//
//   setEvent(newEvent: number): void
//   {
//     this.event = newEvent;
//   }
//
//   setUserId(user: number): void
//   {
//     this.userId = user;
//   }
//
//   setLogData(data: number): void
//   {
//     this.logData = data;
//   }
//
//   setLocation(loc: number): void
//   {
//     this.location = loc;
//   }
//
//   setDate(newDate: number): void
//   {
//     this.date = newDate;
//   }
// }
