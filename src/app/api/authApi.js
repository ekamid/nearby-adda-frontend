import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/users`,
  }),

  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query(data) {
        return {
          url: "/login",
          method: "POST",
          body: data,
        };
      },
    }),

    registerUser: builder.mutation({
      query(data) {
        return {
          url: "/register",
          method: "POST",
          body: data,
          mode: "cors",
        };
      },
    }),
  }),
});

export const { useLoginUserMutation, useRegisterUserMutation } = authApi;
