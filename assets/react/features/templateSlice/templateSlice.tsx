import {createSlice} from "@reduxjs/toolkit";
import {ApiData} from "@/types/api/ApiData";
import {AppObject} from "@/types/app/AppObject";
import {StatusState} from "../../types/status/StatusState";

// ----------------------------------------------------------------------

type TemplateState = {
    app: {
        appObject: AppObject
    }
    api: {
        data: ApiData,
        status: StatusState,
    },
}

const initialState: TemplateState = {
    app: {
        appObject: {
            championshipObjects: []
        },
    },
    api: {
        data: {},
        status: null,
    },
};

export const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setAppObject: (state, action) => {
            state.app.appObject = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
    },
});

export const {
    setAppObject
} = appSlice.actions;

export default appSlice.reducer;
