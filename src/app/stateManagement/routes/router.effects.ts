import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, merge, mergeMap, of, tap } from "rxjs";
import { Todo } from "../../model/profile.type";
import { ApiService } from "../../services/api.service";
import { Router } from "@angular/router";
import { Location } from "@angular/common";
import * as RouterActions from './route.actions'

@Injectable()
export class RouterEffects {
    private actions$ = inject(Actions);
    private http = inject(HttpClient);
    private api = inject(ApiService)
    private router = inject(Router)
    private location = inject(Location)

    navigate$ = createEffect(() => 
        this.actions$.pipe(
            ofType(RouterActions.go),
            tap(({path, query, extras}) => {
                this.router.navigate(path, {queryParams: query, ...extras});
            })
        ),
        {dispatch:false}
    )

    back$ = createEffect(() =>
        this.actions$.pipe(
            ofType(RouterActions.back),
            tap(() => this.location.back())
        ),
        {dispatch:false}
    )

    forward$ = createEffect(() => 
        this.actions$.pipe(
            ofType(RouterActions.forward),
            tap(() => this.location.forward)
        ),
        {dispatch: false}
    )
    
}