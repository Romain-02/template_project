import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {enqueueSnackbar} from "notistack";
import {refreshToken} from "@/features/auth/authSlice";
import {User} from "@/types/User/User";

// =========================================================================

const baseQuery = fetchBaseQuery({
    baseUrl: "/api/",
    prepareHeaders: (headers) => {
        const token = localStorage.getItem("token");
        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }
        return headers;
    }
});

export const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
        // api.dispatch({ types: "auth/logout" });
        api.dispatch(refreshToken());
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    }

    // Timeout error
    if (result.error && result.error.status === "TIMEOUT_ERROR" ) {
        enqueueSnackbar("La requête a pris trop de temps.", { variant: "error" });
    }
    return result;
};


export const templateProjectApi = createApi({
    reducerPath: "templateProjectApi",
    baseQuery: baseQueryWithReauth,
    endpoints: (build) => ({
        getMe: build.query<User, void>({
            query: () => ({
                url: 'getMe',
                headers: {
                    accept: "application/ld+json",
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }),
        }),
    })
});


export const {
    useGetMeQuery,
} = templateProjectApi;
