import { createSlice } from "@reduxjs/toolkit";

import { nearbyAddaData } from "@/utils/data";

const initialState = {
  events: [],
  pages: 0,
};

export const eventSlice = createSlice({
  initialState,
  name: "events",
  reducers: {
    setEvents: (state, action) => {
      console.log(action);
      state.events = action.payload.events;
      state.page = action.payload.page;
    },
  },
});

export default eventSlice.reducer;

export const { setEvents } = eventSlice.actions;
