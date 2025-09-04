import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as TodoActions from './todo.action'
import { catchError, map, mergeMap, of } from "rxjs";
import { Todo } from "../../model/profile.type";

@Injectable()
export class TodoEffects{
    constructor(private actions:Actions, private http: HttpClient){}

    //load Todo
    loadTodo = createEffect(() => 
        this.actions.pipe(
            ofType(TodoActions.loadTodo),
            mergeMap(() => 
                this.http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos?_limit=5').pipe(
                    map((todos) => TodoActions.loadTodoSucces({todos})),
                    catchError((error) => 
                        of(TodoActions.loadTodoFailure({error: error.message}))
                    )
                )
            )
        )
    )

    addTodo = createEffect(() => 
        this.actions.pipe(
            ofType(TodoActions.addTodoAPI),
            mergeMap(({title}) => 
                this.http.post<Todo>('https://jsonplaceholder.typicode.com/todos', {
                    title,
                    completed:false,
                    userId:1
                })
                .pipe(
                    map((todo) => TodoActions.addTodoSuccess({todo})),
                    catchError((error) => 
                        of(TodoActions.addTodoFailure({error:error.message}))
                    )
                )
            )
        )
    )
}