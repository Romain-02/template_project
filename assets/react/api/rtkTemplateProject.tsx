import {createApi} from "@reduxjs/toolkit/query/react";
import {User} from "@/types/User/User";
import {baseQueryWithReauth} from "./authApi";

// =========================================================================

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
