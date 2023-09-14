import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  displayShown: "Home",
};

const userSlice = createSlice({
  initialState,
  name: "userSlice",
  reducers: { 
    showHome : (state) => {
      state.displayShown = "Home"
    },
    showProfile : (state) => {     
      state.displayShown = "Profile"
    },
    
  },
});

export const {showHome, showProfile} = userSlice.actions
export default userSlice.reducer;
