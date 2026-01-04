import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { routes } from './app.routes';
import { authInterceptor } from './core/auth/auth-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(BrowserModule, FormsModule),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([authInterceptor])
    )
  ]
};
