import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toggle: false,
};

const taskSlice = createSlice({
  initialState,
  name: "taskSlice",
  reducers: { 
    
  },
});


export default taskSlice.reducer;
