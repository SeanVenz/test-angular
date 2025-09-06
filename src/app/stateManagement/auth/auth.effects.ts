import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as UserActions from './auth.action'
import * as RegisterActions from './register.action'
import { catchError, map, merge, mergeMap, of } from "rxjs";
import { Todo, UserResponseSuccess, UserResponseFailure, RegisterResponse } from "../../model/profile.type";
import { ApiService } from "../../services/api.service";

@Injectable()
export class AuthEffects {
    private authService = inject(ApiService);
    private actions$ = inject(Actions);

    loginUser = createEffect(() => 
        this.actions$.pipe(
            ofType(UserActions.loginUser),
            mergeMap(({ user }) => {
                return this.authService.login(user.email, user.password).pipe(
                    map((userResponse: UserResponseSuccess) => {
                        return UserActions.loadUserSuccess({ userResponse });
                    }),
                    catchError((error) => {
                       
                        const failureResponse: UserResponseFailure = {
                            success: false,
                            message: error.error?.message
                        };
                        return of(UserActions.loadUserFailed({ userResponse: failureResponse }));
                    })
                );
            })
        )
    );

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
}