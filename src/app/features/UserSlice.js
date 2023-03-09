import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

export const userSlice = createSlice({
  initialState,
  name: "users",
  reducers: {},
});

export default userSlice.reducer;

export const {} = userSlice.actions;
