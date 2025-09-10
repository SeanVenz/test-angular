import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Todo } from "../../model/profile.type";
import { TodoState, selectAll, selectTotal } from './todo.reducer';

//get todo slice based on app.config
export const selectTodoState = createFeatureSelector<TodoState>('todos');

//use the selectAll from entity (kind of the same as getting all todos)
export const selectTodos = createSelector(selectTodoState, selectAll)

export const selectCompletedTodos = createSelector(selectTodos,
    (todos) => todos.filter(todo => todo.completed)
);

//the first property is like basing what your initial state is
export const selectPendingTodos = createSelector(selectTodos,
    (todos) => todos.filter(todo => !todo.completed)
);

export const getCompletedTodos = createSelector(selectCompletedTodos,
    (todos) => todos.length
)

// export const totalTodoCount = createSelector(selectTodos,
//     (todos) => todos.length
// )

export const totalTodoCount = createSelector(selectTodoState, selectTotal);

export const getCompletedProgress = createSelector(getCompletedTodos, totalTodoCount,
    (completed, total) => total > 0 ? Math.round((completed/total) * 100) : 0
)

export const selectLoading = createSelector(
    selectTodoState,
    (state) => state.loading
)

export const selectError = createSelector(
    selectTodoState,
    (state) => state.error
)

export const selectMessage = createSelector(
    selectTodoState,
    (state) => state.message
)