import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import {appSlice} from "@/features/app/appSlice";
import {authSlice} from "@/features/auth/authSlice";
import {templateProjectApi} from "@/api/rtkTemplateProject";

// =========================================================================


export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        app: appSlice.reducer,
        [templateProjectApi.reducerPath]: templateProjectApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        }).concat()
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

setupListeners(store.dispatch);
