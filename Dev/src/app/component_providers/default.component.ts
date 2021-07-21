import { Component } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  templateUrl: './default.component.html',
})
export class DefaultComponent {
  constructor(private userService: UserService) {}

  determineUserRole(): number {
    return this.userService.getActiveUser()?.role;
  }
}
