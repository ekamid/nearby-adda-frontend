import { configureStore } from "@reduxjs/toolkit";

import { authApi } from "@/app/api/authApi";
import { eventApi } from "@/app/api/eventApi";

import eventSlice from "@/app/features/EventSlice";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [eventApi.reducerPath]: eventApi.reducer,
    events: eventSlice,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([authApi.middleware, eventApi.middleware]),
});
