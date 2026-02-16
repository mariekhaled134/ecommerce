import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay, platformBrowser } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideSweetAlert2 } from "@sweetalert2/ngx-sweetalert2";
import { headerInterceptor } from './core/interceptors/headers/header-interceptor';
import { NgxSpinnerModule } from "ngx-spinner";
import{provideAnimations} from '@angular/platform-browser/animations'
import { loadingInterceptor } from './core/interceptors/loading/loading-interceptor';
import {provideTranslateService, } from "@ngx-translate/core";
import {provideTranslateHttpLoader} from "@ngx-translate/http-loader";
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes), provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch(),withInterceptors([headerInterceptor,loadingInterceptor])),
     provideTranslateService({
      loader: provideTranslateHttpLoader({
        prefix: '/i18n/',
        suffix: '.json'
      }),
      fallbackLang: 'ar',
      lang: 'en'
    }),
        // ... other providers
        provideSweetAlert2 ({
            // Optional configuration
            fireOnInit: false,
            dismissOnDestroy: true,
            
        }),
        provideToastr(),
      provideAnimations(),
        importProvidersFrom(NgxSpinnerModule)
  ]
};
