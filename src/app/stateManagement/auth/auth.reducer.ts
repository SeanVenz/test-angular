import { createReducer, on } from "@ngrx/store";
import { User, UserResponseSuccess } from "../../model/profile.type";
import * as UserActions from './auth.action'

export interface AuthState{
    user: UserResponseSuccess | null;
    error: string | null
    loading:boolean;
}

export const initialState: AuthState = {
    user:null,
    error:null,
    loading:false
}

export const userReducer = createReducer<AuthState>(
    initialState,

    on(UserActions.loginUser, (state) => {
        console.log('Reducer: loginUser action');
        return {
            ...state,
            loading:true,
            error:null
        };
    }),

    on(UserActions.loadUserSuccess, (state, {userResponse}) => {
        console.log('Reducer: loadUserSuccess action', userResponse);
        return {
            ...state,
            user:userResponse,
            loading: false,
            error:null
        };
    }),

    on(UserActions.loadUserFailed, (state, {userResponse}) => {
        console.log('Reducer: loadUserFailed action', userResponse);
        return {
            ...state,
            user: null,
            loading:false,
            error: userResponse.message
        };
    })
)