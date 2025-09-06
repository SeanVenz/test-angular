import { createReducer, on } from '@ngrx/store';
import { RegisterResponse } from '../../model/profile.type'
import * as RegisterActions from './register.action'

export const initialState : RegisterResponse = {
    message:null,
    success:false
};

export const registerReducer = createReducer(
    initialState,

    on(RegisterActions.registerUser, (state) => state),

    on(RegisterActions.registerUserSuccess, (state, {registerResponse}) => registerResponse),

    on(RegisterActions.registerUserFailed, (state, {registerResponse}) => registerResponse)
)