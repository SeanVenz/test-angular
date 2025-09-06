import { createFeatureSelector, createSelector } from "@ngrx/store";
import { User, UserResponseSuccess } from "../../model/profile.type";
import { AuthState } from "./auth.reducer";

export const selectAuthState = createFeatureSelector<AuthState>('user');

export const selectUser = createSelector(
    selectAuthState,
    (state) => state.user
)

export const selectAuthError = createSelector(
    selectAuthState,
    (state) => state.error
)

export const selectAuthLoading = createSelector(
    selectAuthState,
    (state) => state.loading
)