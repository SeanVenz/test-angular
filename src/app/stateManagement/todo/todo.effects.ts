import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as TodoActions from './todo.action'
import { catchError, map, merge, mergeMap, of } from "rxjs";
import { Todo } from "../../model/profile.type";
import { ApiService } from "../../services/api.service";

@Injectable()
export class TodoEffects {
    private actions$ = inject(Actions);
    private http = inject(HttpClient);
    private api = inject(ApiService)

    //load Todo
    loadTodos$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TodoActions.loadTodo),
            mergeMap(() =>
                this.api.getTodoFromApi().pipe(
                    map((todos) => TodoActions.loadTodoSucces({ todos })),
                    catchError((error) =>
                        of(TodoActions.loadTodoFailure({ error: error.message }))
                    )
                )
            )
        )
    );

    addTodo$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TodoActions.addTodoAPI),
            mergeMap(({ todo }) =>
                this.api.addTodoForApi(todo)
                .pipe(
                    map((todo) => TodoActions.addTodoSuccess({ todo })),
                    catchError((error) =>
                        of(TodoActions.addTodoFailure({ error: error.message }))
                    )
                )
            )
        )
    );

    editTodo = createEffect(() =>
        this.actions$.pipe(
            ofType(TodoActions.updateTodo),
            mergeMap(({todo}) => 
                this.api.editTodoApi(todo).pipe(
                    map((updated) => TodoActions.updateTodoSuccess({todo:updated})),
                    catchError((error) => 
                        of(TodoActions.updateTodoFailure({error: error.message}))
                    )
                )
            )
        )
    )
}