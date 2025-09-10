import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as UserActions from './auth.action'
import * as RegisterActions from './register.action'
import { catchError, map, merge, mergeMap, of, tap } from "rxjs";
import { Todo, UserResponseSuccess, UserResponseFailure, RegisterResponse } from "../../model/profile.type";
import { ApiService } from "../../services/api.service";
import { CookieService } from 'ngx-cookie-service';
import { Router } from "@angular/router";
import * as RouterActions from '../routes/route.actions'

@Injectable()
export class AuthEffects {
    private authService = inject(ApiService);
    private actions$ = inject(Actions);
    private cookieService = inject(CookieService);
    private router = inject(Router)

    loginUser = createEffect(() => 
        this.actions$.pipe(
            ofType(UserActions.loginUser),
            mergeMap(({ user }) => {
                return this.authService.login(user.email, user.password).pipe(
                    map((userResponse: UserResponseSuccess) => {
                        this.cookieService.set('token', userResponse.token)
                        return UserActions.loginUserSuccess({ userResponse });
                    }),
                    catchError((error) => {
                       
                        const failureResponse: UserResponseFailure = {
                            success: false,
                            message: error.message
                        };
                        return of(UserActions.loadUserFailed({ userResponse: failureResponse }));
                    })
                );
            })
        )
    );

    loginSuccess$ = createEffect(() => 
        this.actions$.pipe(
            ofType(UserActions.loginUserSuccess),
            map(() => 
                RouterActions.go({path:['/about']})
            )
        )
    )

    registerUser = createEffect(() => 
        this.actions$.pipe(
            ofType(RegisterActions.registerUser),
            mergeMap(({registerInput}) => {
                return this.authService.register(registerInput.username, registerInput.password, registerInput.email).pipe(
                    map((registerResponse:RegisterResponse) => {
                        return RegisterActions.registerUserSuccess({registerResponse})
                    }),

                    catchError((error) => {
                        const failureResponse:RegisterResponse = {
                            success:false,
                            message:error.error?.message
                        };
                        return of(RegisterActions.registerUserFailed({registerResponse: failureResponse}))
                    })
                )
            })
        )
    )

    loadUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.loadUser),
            mergeMap(() => {
                const token = this.cookieService.get('token');
                console.log('Token in effect: ', token)
                if (!token) {
                    return of(
                        UserActions.loadUserFailed({
                            userResponse: { success: false, message: 'No token' }
                        })
                    );
                }

                return this.authService.getProfile(token).pipe(
                    map((userResponse: UserResponseSuccess) =>
                    UserActions.loadUserSuccess({ userResponse })
                    ),
                    catchError((error) =>
                        of(
                            UserActions.loadUserFailed({
                            userResponse: { success: false, message: error.error?.message || 'Profile fetch failed' }
                            })
                        )
                    )
                );
            })
        )
    );
    logout = createEffect(() => 
        this.actions$.pipe(
            ofType(UserActions.logout),
                tap(() => this.cookieService.delete('token')),
                map(() => RouterActions.go({ path: ['/login'] }))
        ),
    )

}