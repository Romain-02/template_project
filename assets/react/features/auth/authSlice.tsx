// axios
import axios from "axios";
// redux
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// types
import { User } from "@/types/User/User";

// ----------------------------------------------------------------------


type AuthState = {
    token: string | null;
    status: "pending" | "success" | "error" | null;
    user: User | null;
    error: string | null;
}

const getToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
        return token;
    }

    const domToken = document.getElementById("token");
    if (domToken) {
        const dataToken = domToken.getAttribute("data-token");
        if (dataToken && dataToken !== "") {
            localStorage.setItem("token", dataToken);
            return dataToken;
        }
    }
    return null;
};

export const getMe = createAsyncThunk(
    "auth/getMe",
    async (_,{ rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("No token found in local storage");
            }

            const responseUser = await axios.get("/api/user/get-me", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            return {
                user: responseUser.data
            }
        } catch (error: any
            ) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error.response.data);
        }
    });

const initialState: AuthState = {
    token: getToken(),
    status: null,
    user: JSON.parse(localStorage.getItem("user") ?? 'null'),
    error: null
};

export const login = createAsyncThunk(
    "auth/login",
    async ({ username, password }: { username: string, password: string }, { rejectWithValue }) => {
        try {
            const response = await axios.post("/api/login", { username, password });
            const responseUser = await axios.get("/api/user/get-me", { headers: { Authorization: `Bearer ${response.data.token}` } });

            return {
                refresh_token: response.data.refresh_token,
                token: response.data.token,
                user: responseUser.data
            };
        } catch (error: any) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error.response.data);
        }
    }
);

export const refreshToken = createAsyncThunk(
    "auth/refreshToken",
    async ({}, { rejectWithValue }) => {
        try {
            const response = await axios.post("/api/token/refresh", { refresh_token: localStorage.getItem("refresh_token") });
            const responseUser = await axios.get("/api/user/get-me", { headers: { Authorization: `Bearer ${response.data.token}` } });

            return {
                refresh_token: response.data.refresh_token,
                token: response.data.token,
                user: responseUser.data
            };
        } catch (error: any) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error.response.data);
        }
    }
);

export const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setToken: (state, action) => {
            localStorage.setItem("token", action.payload);
            state.token = action.payload;
        },
        setUser: (state, action) => {
            localStorage.setItem("user", JSON.stringify(action.payload));
            state.user = action.payload;
        },
        clearAuth: (state) => {
            state.token = null;
            state.status = null;
        },
        logout: (state) => {
            state.token = null;
            state.user = null;
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.token = null;
                state.status = "pending";
            })
            .addCase(login.fulfilled, (state, action) => {
                state.token = action.payload.token;
                state.user = action.payload.user;
                state.status = "success";
                state.error = null;

                localStorage.setItem("token", action.payload.token);
                localStorage.setItem("refresh_token", action.payload.refresh_token);
                localStorage.setItem("user", JSON.stringify(action.payload.user));
            })
            .addCase(login.rejected, (state, action) => {
                state.token = null;
                state.status = "error";
                // @ts-ignore
                state.error = action.payload?.message ?? "Error while trying to login";
            })
            .addCase(getMe.pending, (state) => {
                state.status = "pending";
                state.error = null;
            })
            .addCase(getMe.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.status = "success";
                state.error = null;
                localStorage.setItem("user", JSON.stringify(action.payload.user));

            })
            .addCase(getMe.rejected, (state, action) => {
                state.status = "error";
                state.error = action.error.message || "Failed to fetch User data";
            })
            .addCase(refreshToken.pending, (state) => {
                state.token = null;
                state.status = "pending";
            })
            .addCase(refreshToken.fulfilled, (state, action) => {
                state.token = action.payload.token;
                state.user = action.payload.user;
                state.status = "success";
                state.error = null;

                localStorage.setItem("token", action.payload.token);
                localStorage.setItem("refresh_token", action.payload.refresh_token);
                localStorage.setItem("user", JSON.stringify(action.payload.user));
            })
            .addCase(refreshToken.rejected, (state, action) => {
                state.token = null;
                state.status = "error";
                // @ts-ignore
                state.error = action.payload?.message ?? "Error while trying to refresh token";
                logout();
            });

    }
});

// Export des actions
export const {
    setToken,
    clearAuth,
    logout,
    setUser
} = authSlice.actions;

// Export du reducer
export default authSlice.reducer;
