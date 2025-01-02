import { User } from "@/models/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IUserContext {
    initialized: boolean;
    user: User | null;
}

const userContextSlice = createSlice({
    name: 'userContext',
    initialState: {
        user: null,
        initialized: false
    } as IUserContext,
    reducers: {
        initializeUserContext(state, action: PayloadAction<User | null>) {
            state.initialized = true;
            state.user = action.payload;
        },
        logIn(state, action: PayloadAction<User>) {
            state.user = action.payload;
        },
        logOut(state) { 
            state.user = null;
        },
    }
});

export const { initializeUserContext, logIn, logOut } = userContextSlice.actions;
export default userContextSlice;