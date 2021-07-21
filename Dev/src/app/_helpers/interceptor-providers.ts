import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserIdInterceptor } from './user-id.interceptor';

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: UserIdInterceptor, multi: true },
];
