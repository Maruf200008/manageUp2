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
    removeFilter: (state) => {
        state.status = ""    
      },
  
  },
});


export const {addFilter, removeFilter} = filterSlice.actions
export default filterSlice.reducer;
