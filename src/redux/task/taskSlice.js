import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toggle: "",
};

const taskSlice = createSlice({
  initialState,
  name: "taskSlice",
  reducers: { 
    showToggle : (state) => {
      state.toggle = true
    },
    hideToggle : (state) => {
      state.toggle = false
    }
  },
});

export const {showToggle, hideToggle} = taskSlice.actions
export default taskSlice.reducer;
