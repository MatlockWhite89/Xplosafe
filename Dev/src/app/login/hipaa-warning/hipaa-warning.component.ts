import {Component} from '@angular/core';

import {LoginService} from '../../services/login.service';

@Component({
  selector: 'app-hipaa-warning',
  templateUrl: './hipaa-warning.component.html',
  styleUrls: ['./hipaa-warning.component.css']
})
export class HipaaWarningComponent {
  constructor(private loginService: LoginService) {
  }

  onAcceptHIPAA(): void {
    this.loginService.acceptHippaAgreement();
  }
}
