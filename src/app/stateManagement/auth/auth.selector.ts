import { createFeatureSelector } from "@ngrx/store";
import { User, UserResponseSuccess } from "../../model/profile.type";

export const selectUser = createFeatureSelector<UserResponseSuccess>('user');