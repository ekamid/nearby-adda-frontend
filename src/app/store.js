import { configureStore } from "@reduxjs/toolkit";

import eventSlice from "@/app/features/EventSlice";

export const store = configureStore({
  reducer: {
    events: eventSlice,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({}).concat([]),
});
