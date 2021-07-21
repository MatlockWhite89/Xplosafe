import { Component, OnDestroy } from '@angular/core';
import { LoginService } from '../services/login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css'],
})
export class PageNotFoundComponent {
  errorMessage: string;
  errorCode: number;

  constructor(
    private loginService: LoginService,
    private router: Router)
  {
    this.errorCode = this.loginService.getErrorCode();
    if (this.errorCode !== 0)
    {
      this.determineError();
    }
  }

  setErrorMessage(value: string): void
  {
    this.errorMessage = value;
  }

  determineError(): void
  {
    switch (this.errorCode){
      case (400):
        this.errorMessage = 'Client Side Error: malformed syntax or file size is too large.';
        break;
      case (401):
        this.errorMessage = 'Unauthorized Access Attempt: User does not have access to restricted content.';
        break;
      case (403):
        this.errorMessage = 'Server Side Error: Server has actively refused permissions to this client.';
        break;
      case (404):
        this.errorMessage = 'Page Not Found: The requested page could not be found.';
        break;
      case (408):
        this.errorMessage = 'Request Time Out: Server has taken too long to respond.';
        break;
      default:
        this.errorMessage = 'The requested URL /ErroneousUrl was not found on this server. That\'s all we know.';
        break;
    }
  }

  returnToPreviousPage(): void {
    const url = this.loginService.getReturnUrl();
    url.trimRight();
    this.router.navigate([url]);
  }
}
