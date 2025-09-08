// import { createReducer, on } from "@ngrx/store";
// import { Todo } from "../../model/profile.type";
// import { addTodo, removeTodo, toggleTodo } from "./todo.action";

// import { createReducer, on } from "@ngrx/store";
// import { Todo } from "../../model/profile.type";
// import * as TodoActions from './todo.action'

// export const initialState:Todo[] = [];

// let nextId = 1;

// export const todoReducer = createReducer(
//     initialState,

//     //handle add todo. use spread since state is immutable
//     on(addTodo, (state, {title}) => [
//         ...state,
//         {id:nextId++, title:title, completed:false}
//     ]),

//     // - Find the todo with the matching id and flip its "completed" boolean
//     on(toggleTodo, (state, {id}) => 
//         state.map(todo => 
//             todo.id === id ? {...todo, completed: !todo.completed} : todo
//         )
//     ),

//     //Filter todo with given Id
//     on(removeTodo, (state, {id}) => state.filter(todo => todo.id !== id))

// )

// export const initialState:Todo[] = [];

// export const todoReducer = createReducer(
//     initialState,

//     //Replace todo with one from API
//     on(TodoActions.loadTodoSucces, (state, {todos}) =>  todos ),

//     // Add Todo Returned by API when adding (appending)
//     on(TodoActions.addTodoSuccess, (state, {todo}) =>  [...state, todo])
// )

import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Todo } from "../../model/profile.type";
import { createReducer, on } from '@ngrx/store';
import * as TodoActions from './todo.action'

export interface TodoState extends EntityState<Todo>{
    loading:boolean;
    error: string | null;
}

export const adapter = createEntityAdapter<Todo>({
    selectId: (todo) => todo.id,
    sortComparer: (a,b) => a.title.localeCompare(b.title),
})

export const initialState:TodoState = adapter.getInitialState({
    loading:false,
    error:null
})

export const todoReducer = createReducer(
    initialState,

    on(TodoActions.loadTodo, (state) => ({
        ...state,
        loading:true
    })),

    on(TodoActions.loadTodoSucces, (state, {todos}) =>
        adapter.setAll(todos, {...state, loading:false})
    ),

    on(TodoActions.loadTodoFailure, (state, {error}) => ({
        ...state,
        loading:false,
        error
    })),

    on(TodoActions.addTodoSuccess, (state, {todo}) =>
        adapter.addOne(todo, {...state, loading:false})
    ),

    on(TodoActions.addTodoFailure, (state, {error}) => ({
        ...state,
        loading:false,
        error
    }))

)

// --- 5. Export selectors from adapter ---
export const {
  selectAll,      // gives array of todos
  selectEntities, // gives dictionary of todos
  selectIds,      // gives array of ids
  selectTotal,    // gives count
} = adapter.getSelectors();