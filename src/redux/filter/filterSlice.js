import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "",
};

const filterSlice = createSlice({
  initialState,
  name: "filterSlice",
  reducers: { 
    addFilter: (state, action) => {
        state.status = action.payload;    
      },
  
  },
});


export const {addFilter} = filterSlice.actions
export default filterSlice.reducer;
