import {
    ApplicationConfig,
    provideBrowserGlobalErrorListeners,
    provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config';

import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { routes } from './app.routes';
import customPreset from './custom-preset';
import { AuthInterceptor } from './interceptors/interceptor.service';

export const appConfig: ApplicationConfig = {
    providers: [
        provideBrowserGlobalErrorListeners(),
        provideZonelessChangeDetection(),
        provideRouter(routes),
        provideClientHydration(withEventReplay()),
        provideHttpClient(withInterceptors([AuthInterceptor])),
        providePrimeNG({
            theme: {
                preset: customPreset,
                options: {
                    darkModeSelector: false,
                },
            },
        }),
        provideHttpClient(withFetch()),
    ],
};
