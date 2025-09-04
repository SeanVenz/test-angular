// import { createAction, props } from "@ngrx/store";

import { createAction, props } from "@ngrx/store";
import { Todo } from "../../model/profile.type";

// //add a payload (must create a todo with title)
// export const addTodo = createAction('[Todo] Add Todo', 
//     props<{title:string}>()
// )

// //toggle to do, base it on id to add its done
// export const toggleTodo = createAction('[Todo] Toggle Todo', 
//     props<{id:number}>()
// )

// //remove todo, add its id also as props and its to be passed
// export const removeTodo = createAction('[Todo] Remove Todo',
//     props<{id:number}>()
// )


//TODO WITH HTTP CALL

//LOAD TODOS
export const loadTodo = createAction('[Todo] Load Todos')

export const loadTodoSucces = createAction('[Todo] Load Todos Success', 
    props<{todos:Todo[]}>()
)

export const loadTodoFailure = createAction('[Todo] Load Todos Failure',
    props<{error:string}>()
)

export const addTodoAPI = createAction('[Todo] Add Todo', 
    props<{title:string}>()
)

export const addTodoSuccess = createAction('[Todo] Add Todo Success', 
    props<{todo:Todo}>()
)

export const addTodoFailure = createAction('[Todo] Add Todo Failure',
    props<{error:string}>()
)