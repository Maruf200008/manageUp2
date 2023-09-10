import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: "",
  user: [],
};

const authSlice = createSlice({
  initialState,
  name: "authSlice",
  reducers: {
    userLogdin: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
    },
    userLogOut: (state) => {
      state.accessToken = undefined;
      state.user = undefined;
      localStorage.clear()
    },
  },
});

export const { userLogOut, userLogdin } = authSlice.actions;
export default authSlice.reducer;
