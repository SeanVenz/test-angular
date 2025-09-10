import { createAction, props } from "@ngrx/store";

export const go = createAction(
    '[Router] Go',
    props<{path:any[], query?: object, extras?:object}>()
)

export const back = createAction('[Router] Back');
export const forward = createAction('[Router] Forward')