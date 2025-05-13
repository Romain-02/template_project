import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import {appSlice} from "@/features/templateSlice/templateSlice";
import {authSlice} from "@/features/auth/authSlice";
import {templateApi} from "@/api/rtkTemplate";

// =========================================================================


export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        app: appSlice.reducer,
        [templateApi.reducerPath]: templateApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        }).concat()
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

setupListeners(store.dispatch);
