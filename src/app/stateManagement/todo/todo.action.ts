import { createAction, props } from "@ngrx/store";

//add a payload (must create a todo with title)
export const addTodo = createAction('[Todo] Add Todo', 
    props<{title:string}>()
)

//toggle to do, base it on id to add its done
export const toggleTodo = createAction('[Todo] Toggle Todo', 
    props<{id:number}>()
)

//remove todo, add its id also as props and its to be passed
export const removeTodo = createAction('[Todo] Remove Todo',
    props<{id:number}>()
)