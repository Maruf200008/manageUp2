
import { configureStore } from "@reduxjs/toolkit"
import { apiSlice } from "./apiSlice"
import authSlice from "./auth/authSlice"
import filterSlice from "./filter/filterSlice"
import taskSlice from "./task/taskSlice"
export default configureStore({
    reducer: {
     [apiSlice.reducerPath] : apiSlice.reducer,
     auth : authSlice,
     task : taskSlice,
     filter : filterSlice
    },
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(apiSlice.middleware)
  })