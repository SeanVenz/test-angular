import { createAction, props } from "@ngrx/store";
import { User, UserLogin, UserResponseFailure, UserResponseSuccess } from "../../model/profile.type";

export const loadUser  = createAction('[User] Load User')

export const loginUser = createAction('[User] Login user', 
    props<{user:UserLogin}>()
)

export const loginUserSuccess = createAction('[User] Login User Success',
    props<{userResponse:UserResponseSuccess}>()
)

export const loadUserSuccess = createAction('[User] Load User Success',
    props<{userResponse:UserResponseSuccess}>()
);

export const loadUserFailed = createAction('[User] Load User Failure',
    props<{userResponse:UserResponseFailure}>()
);

export const logout = createAction('[User] Logout')