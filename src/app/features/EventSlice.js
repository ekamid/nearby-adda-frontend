import { createSlice } from "@reduxjs/toolkit";

import { nearbyAddaData } from "@/utils/data";

const initialState = {
  events: [],
  pages: 0,
  fetchingEvents: false,
  selectedEvent: null,
};

export const eventSlice = createSlice({
  initialState,
  name: "events",
  reducers: {
    setEvents: (state, action) => {
      state.events = action.payload.events;
      state.page = action.payload.page;
    },

    setFetching: (state, action) => {
      state.fetchingEvents = action.payload;
    },

    setSelectedEvent: (state, action) => {
      state.selectedEvent = action.payload;
    },
  },
});

export default eventSlice.reducer;

export const { setEvents, setFetching, setSelectedEvent } = eventSlice.actions;
