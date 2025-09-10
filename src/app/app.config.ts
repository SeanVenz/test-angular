import {
  ApplicationConfig,
  provideZoneChangeDetection,
  isDevMode,
} from '@angular/core';
import { provideRouter, withRouterConfig } from '@angular/router';

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
import { registerReducer } from './stateManagement/auth/register.reducer';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { RouterEffects } from './stateManagement/routes/router.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore({ counter: counterReducer, todos: todoReducer, user: userReducer, register: registerReducer, router:routerReducer }),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideEffects([TodoEffects, AuthEffects, RouterEffects]),
    provideRouterStore(),
    provideRouter(routes, withRouterConfig({onSameUrlNavigation: 'reload'}))
],
};
