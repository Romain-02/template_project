import {createSlice} from "@reduxjs/toolkit";

// ----------------------------------------------------------------------

type TemplateState = {
    app: {}
}

const initialState: TemplateState = {
    app: {
    }
};

export const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
    },
});

export const {
} = appSlice.actions;

export default appSlice.reducer;
