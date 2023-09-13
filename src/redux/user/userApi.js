import { apiSlice } from "../apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (name) => `/users?name_like=${name}`,
    }),
   
  }),
});

export const {
  useGetUserQuery
} = userApi;
