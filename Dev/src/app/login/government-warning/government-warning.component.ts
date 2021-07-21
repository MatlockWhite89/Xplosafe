import {Component} from '@angular/core';

import {LoginService} from '../../services/login.service';

@Component({
  selector: 'app-government-warning',
  templateUrl: './government-warning.component.html',
  styleUrls: ['./government-warning.component.css']
})
export class GovernmentWarningComponent {
  constructor(private loginService: LoginService) {
  }

  onAccept(): void {
    this.loginService.acceptGovernmentWarning();
  }
}
