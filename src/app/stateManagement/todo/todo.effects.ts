import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as TodoActions from './todo.action'
import { catchError, map, merge, mergeMap, of, filter, switchMap, withLatestFrom } from "rxjs";
import { Todo } from "../../model/profile.type";
import { ApiService } from "../../services/api.service";
import { Store } from "@ngrx/store";
import { selectTodoId } from "../routes/router.selector";

@Injectable()
export class TodoEffects {
    private actions$ = inject(Actions);
    private http = inject(HttpClient);
    private api = inject(ApiService);
    private store = inject(Store);

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

    deleteTodo = createEffect(() =>
        this.actions$.pipe(
            ofType(TodoActions.deleteTodo),
            mergeMap(({ id }) =>
                this.api.deleteTodoApi(id).pipe(
                    map(() => TodoActions.deleteTodoSuccess({ id })), // ✅ return id we passed in
                    catchError((error) => 
                        // return of(TodoActions.deleteTodoRollback({ todo: { id, title: 'Recovered', completed: false } }));
                        of(TodoActions.deleteTodoFailure({ error: error.message }))
                    // of(TodoActions.deleteTodoFailure({ error: error.message }))
                    )
                )
            )
        )
    );
    loadTodoOnRouteChange = createEffect(() =>
        this.actions$.pipe(
            ofType('@ngrx/router-store/navigation'),
            withLatestFrom(this.store.select(selectTodoId)),
            filter(([_, id]: [any, any]) => !!id),
            switchMap(([_, id]: [any, any]) =>
                this.api.getTodoApi(id!).pipe(
                    map(todo => TodoActions.loadTodoSucces({ todos: [todo] })),
                    catchError(err => of(TodoActions.loadTodoFailure({ error: err.message })))
                )
            )
        )
    );
};
