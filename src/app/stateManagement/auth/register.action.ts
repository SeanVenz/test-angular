import { createAction, props } from "@ngrx/store";
import { RegisterResponse, UserRegister } from "../../model/profile.type";

export const loadRegisteredUser = createAction('[Register] Load User');

export const registerUser = createAction('[Register] Register User', 
    props<{registerInput:UserRegister}>()
 )

export const registerUserSuccess = createAction('[Register] Register User Success',
    props<{registerResponse:RegisterResponse}>()
);

export const registerUserFailed = createAction('[Register] Register User Failed',
    props<{registerResponse:RegisterResponse}>()
)