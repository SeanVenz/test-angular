import {
  ApplicationConfig,
  provideZoneChangeDetection,
  isDevMode,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { counterReducer } from './stateManagement/counter/counter.reducer';
import { provideEffects } from '@ngrx/effects';
import { todoReducer } from './stateManagement/todo/todo.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore({ counter: counterReducer, todos: todoReducer }),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideEffects(),
  ],
};
