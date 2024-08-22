import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore } from '@ngrx/store';
import { ClientsReducer, clientsStateFeatureKey } from './modules/clients/state';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects, EffectsModule } from '@ngrx/effects';
import {ClientEffect} from "./modules/clients/state/index";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), provideAnimationsAsync(),
    provideRouter(routes, withComponentInputBinding()),
    provideStore({
       'clientsState' : ClientsReducer
    }),

    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
]
};
