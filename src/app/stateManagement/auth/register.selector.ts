import { createFeatureSelector } from "@ngrx/store";
import { RegisterResponse } from "../../model/profile.type";

export const registerSelector = createFeatureSelector<RegisterResponse>('register');