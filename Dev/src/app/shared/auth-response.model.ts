import { NavRoute } from './nav-route.model';

export interface AuthResponseData {
  userId: number;
  role: number;
  group: number;
  locationId: number;
  username: string;
  hippaFlag: boolean;
  governmentFlag: boolean;
  accountLocked: boolean;
  passwordExpiredDate: any;
  maintenanceTime: any;
  maintenanceEndTime: any;
  routes: Array<NavRoute>;
  loginAttemptExceeded: boolean;
  jwt: any;
}

export class DefaultResponse implements AuthResponseData {
  accountLocked: boolean;
  governmentFlag: boolean;
  group: number;
  hippaFlag: boolean;
  locationId: number;
  maintenanceEndTime: any;
  maintenanceTime: any;
  passwordExpiredDate: any;
  role: number;
  routes: Array<NavRoute>;
  userId: number;
  username: string;
  loginAttemptExceeded: boolean;
  jwt: any;

  static getResponse(): AuthResponseData {
    return {
      userId: -1,
      role: -1,
      group: -1,
      locationId: -1,
      username: null,
      hippaFlag: false,
      governmentFlag: false,
      accountLocked: false,
      passwordExpiredDate: null,
      maintenanceTime: null,
      maintenanceEndTime: null,
      routes: null,
      loginAttemptExceeded: false,
      jwt: null,
    };
  }
}

export class WarningBannerResponse implements AuthResponseData {
  accountLocked: boolean;
  governmentFlag: boolean;
  group: number;
  hippaFlag: boolean;
  locationId: number;
  maintenanceEndTime: any;
  maintenanceTime: any;
  passwordExpiredDate: any;
  role: number;
  routes: Array<NavRoute>;
  userId: number;
  username: string;
  loginAttemptExceeded: boolean;
  jwt: any;

  static getResponse(): AuthResponseData {
    return {
      userId: undefined,
      role: -1,
      group: -1,
      locationId: -1,
      username: null,
      hippaFlag: false,
      governmentFlag: true,
      accountLocked: false,
      passwordExpiredDate: null,
      maintenanceTime: null,
      maintenanceEndTime: null,
      routes: null,
      loginAttemptExceeded: false,
      jwt: null,
    };
  }
}

export class HIPAABannerResponse implements AuthResponseData {
  accountLocked: boolean;
  governmentFlag: boolean;
  group: number;
  hippaFlag: boolean;
  locationId: number;
  maintenanceEndTime: any;
  maintenanceTime: any;
  passwordExpiredDate: any;
  role: number;
  routes: Array<NavRoute>;
  userId: number;
  username: string;
  loginAttemptExceeded: boolean;
  jwt: any;

  static getResponse(): AuthResponseData {
    return {
      userId: undefined,
      role: -1,
      group: -1,
      locationId: -1,
      username: null,
      hippaFlag: true,
      governmentFlag: true,
      accountLocked: false,
      passwordExpiredDate: null,
      maintenanceTime: null,
      maintenanceEndTime: null,
      routes: null,
      loginAttemptExceeded: false,
      jwt: null,
    };
  }
}
