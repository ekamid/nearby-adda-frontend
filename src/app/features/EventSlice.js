import { createSlice } from "@reduxjs/toolkit";

import { nearbyAddaData } from "@/utils/data";

const initialState = {
  events: [...nearbyAddaData],
};

export const eventSlice = createSlice({
  initialState,
  name: "events",
  reducers: {},
});

export default eventSlice.reducer;

export const {} = eventSlice.actions;
