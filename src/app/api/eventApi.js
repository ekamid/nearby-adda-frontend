import { getPathQueryParams } from "@/utils/helpers";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setEvents } from "../features/EventSlice";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const eventApi = createApi({
  reducerPath: "eventApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/events`,
    prepareHeaders: (headers, { getState }) => {
      // const token = getState().profile.token
      //   ? getState().profile.token
      //   : Cookies.get("token");
      // if (token) {
      //   headers.set("auth-token", `${token}`);
      // }
      // return headers;
    },
  }),

  endpoints: (builder) => ({
    getEvents: builder.query({
      query(arg) {
        const queryParams = getPathQueryParams({ arg });
        return {
          url: `?${queryParams}`,
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data: response } = await queryFulfilled;
          console.log(response.data.rows);
          dispatch(
            setEvents({
              events: response?.data?.rows,
              pages: response?.data?.pages,
            })
          );
        } catch (thrown) {
          console.error(thrown.error);
        }
      },
    }),
  }),
});

export const { useGetEventsQuery } = eventApi;
