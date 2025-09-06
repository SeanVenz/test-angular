import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as UserActions from './auth.action'
import { catchError, map, mergeMap, of } from "rxjs";
import { Todo, UserResponseSuccess } from "../../model/profile.type";
import { ApiService } from "../../services/api.service";

@Injectable()
export class AuthEffects {
    private authService = inject(ApiService);
    private actions$ = inject(Actions);

    loginUser = createEffect(() => 
        this.actions$.pipe(
            ofType(UserActions.loginUser),
            mergeMap(({ user }) => 
                this.authService.login(user.email, user.password).
                    pipe(
                        map((userResponse) => UserActions.loadUserSuccess({ userResponse })),
                        catchError((error) => 
                            of(UserActions.loadUserFailed({ userResponse: { success: false, message: error.message } }))
                        )
                )
            )
        )
    )
}