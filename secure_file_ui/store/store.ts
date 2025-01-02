import { configureStore } from "@reduxjs/toolkit"
import userContextSlice from "./user-context/user-context.reducer"

export const makeStore = () => {
    return configureStore({
        reducer: {
            [userContextSlice.name]: userContextSlice.reducer,
        }
    })
};

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];
export type RootState = ReturnType<AppStore['getState']>;