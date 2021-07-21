import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { LoginService } from '../services/login.service';
import { UserService } from '../services/user.service';

@Injectable()
export class UserIdInterceptor implements HttpInterceptor {
  constructor(
    private loginService: LoginService,
    private userService: UserService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const user = this.userService.userValue;
    const isLoggedIn = user && this.loginService.isUserLoggedIn();
    const { url, method, headers, body } = request;
    const newBody = { ...body, activeUserId: user.userId };

    console.debug(method, url);
    // Lets login requests to pass through.
    if (url.endsWith('auth') && !isLoggedIn) {
      return next.handle(request);
    } else if (method === 'GET' && url.endsWith('maintenance')) {
      return next.handle(request);
    } else {
      const storedToken = this.userService.userAuthToken;
      if (storedToken === '') {
        console.debug('JSON Web Token not found.');
        return EMPTY;
      } else {
        if (!request.headers.has('Authorization')) {
          request = request.clone({
            setHeaders: {
              Authorization: storedToken,
            },
            body: newBody,
          });
        } else if (request.headers.get('Authorization') !== storedToken) {
          console.debug('Header Mismatch!');
          request = request.clone({
            setHeaders: {
              Authorization: undefined,
            },
          });
        }

        return next.handle(request);
      }
    }
  }
}
