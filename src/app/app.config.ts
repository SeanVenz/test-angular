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
import { TodoEffects } from './stateManagement/todo/todo.effects';
import { userReducer } from './stateManagement/auth/auth.reducer';
import { AuthEffects } from './stateManagement/auth/auth.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore({ counter: counterReducer, todos: todoReducer, user:userReducer }),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideEffects([TodoEffects, AuthEffects]),
  ],
};
