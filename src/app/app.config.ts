import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { JwtModule } from '@auth0/angular-jwt';
import { HttpClientErrorInterceptorService } from './services/common/http-client-error-interceptor.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withFetch(), withInterceptorsFromDi(),),
    {
      provide: 'baseUrl',
      useValue: 'https://localhost:7166/api',
    },
    provideAnimations(),
    provideToastr(),
    importProvidersFrom(
      JwtModule.forRoot({
        config: {
          tokenGetter: tokenGetter,
          allowedDomains: ["https://localhost:7166", "http://localhost:5008"],
        }
      })
    ),
    {
      provide: HTTP_INTERCEPTORS, useClass: HttpClientErrorInterceptorService, multi: true
    }, provideAnimationsAsync()
  ],
};

export function tokenGetter(){
  return localStorage.getItem("access_token");
}