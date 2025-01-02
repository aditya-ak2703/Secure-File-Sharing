import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const selectUserContext = createSelector(
    (state: RootState) => state,
    (state: RootState) => state.userContext
);

export const selectUser = createSelector(
    selectUserContext,
    (state) => state.user
);

export const selectUserIsInitialized = createSelector(
    selectUserContext,
    (state) => state.initialized
);