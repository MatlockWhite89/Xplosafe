import { NavRoute } from './nav-route.model';

export class User {
  userId: number;
  role: number;
  group: number;
  locationId: number;
  username: string;
  accountLocked: boolean;
  passwordExpiredDate: any;
  maintenanceTime: any;
  maintenanceEndTime: any;
  routes: Array<NavRoute>;
  loginAttemptExceeded: boolean;

  constructor(
    userId?: number | undefined,
    role?: number | undefined,
    group?: number | undefined,
    locationId?: number | undefined,
    username?: string | undefined,
    accountLocked?: boolean | undefined,
    passwordExpiredDate?: any | undefined,
    maintenanceTime?: any | undefined,
    maintenanceEndTime?: any | undefined,
    routes?: Array<NavRoute> | undefined,
    loginAttemptExceeded? : boolean | undefined,
  ) {
    this.userId = userId;
    this.username = username;
    this.locationId = locationId;
    this.group = group;
    this.role = role;
    this.accountLocked = accountLocked;
    this.passwordExpiredDate = passwordExpiredDate;
    this.maintenanceTime = maintenanceTime;
    this.maintenanceEndTime = maintenanceEndTime;
    this.routes = routes;
    this.loginAttemptExceeded = loginAttemptExceeded;
  }
}
