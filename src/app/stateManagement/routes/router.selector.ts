import { createFeatureSelector } from "@ngrx/store";
import { getRouterSelectors } from '@ngrx/router-store';

export const selectRouter = createFeatureSelector<any>('router');

export const {
    selectRouteParams,
    selectRouteParam,
    selectQueryParams,
    selectQueryParam
} = getRouterSelectors(selectRouter);

// custom selector for todo id
export const selectTodoId = selectRouteParam('id')