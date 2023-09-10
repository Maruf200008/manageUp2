import { apiSlice } from "../apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (email) => `/users?email_like=${email}`,
    }),
   
  }),
});

export const {
  useGetUserQuery
} = userApi;
