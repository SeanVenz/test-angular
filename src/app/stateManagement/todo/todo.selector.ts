import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Todo } from "../../model/profile.type";

//get todo slice based on app.config
export const selectTodos = createFeatureSelector<Todo[]>('todos');

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

export const totalTodoCount = createSelector(selectTodos,
    (todos) => todos.length
)

export const getCompletedProgress = createSelector(getCompletedTodos, totalTodoCount,
    (completed, total) => total > 0 ? Math.round((completed/total) * 100) : 0
)