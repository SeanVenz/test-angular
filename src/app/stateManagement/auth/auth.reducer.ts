import { createReducer, on } from "@ngrx/store";
import { User, UserResponseSuccess } from "../../model/profile.type";
import * as UserActions from './auth.action'


export const initialState: User | null = null;

export const userReducer = createReducer<UserResponseSuccess | null>(
    initialState,

    on(UserActions.loadUserSuccess, (state, { userResponse }) => {
        return userResponse;
    }),

    on(UserActions.loadUserFailed, (state, { userResponse }) => {
        console.error('User load failed:', userResponse);
        return null;
    })
)