import { Route } from '@angular/router';

export class DetailedRouteModel {
  route: Route;
  label: string;

  constructor(label: string, route: Route) {
    this.label = label;
    this.route = route;
  }
}
