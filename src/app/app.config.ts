import { ApplicationConfig } from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding
} from '@angular/router';
import { provideHttpClient, withInterceptors} from '@angular/common/http';
import { routes } from './app.route';
import { apiInterceptor } from './interceptors/api-interceptor';
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
  routes,
  withComponentInputBinding()
),
    provideHttpClient(withInterceptors([apiInterceptor]))
  ]
};