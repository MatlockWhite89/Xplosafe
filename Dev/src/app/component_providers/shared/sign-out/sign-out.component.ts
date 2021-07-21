import { Component } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sign-out',
  templateUrl: './sign-out.component.html',
  styleUrls: ['./sign-out.component.css'],
})
export class SignOutComponent {
  subscriptions: Subscription;
  constructor(private loginService: LoginService) {}

  OnSignOut(): void {
    this.loginService.disconnectActiveUser();
  }
}
