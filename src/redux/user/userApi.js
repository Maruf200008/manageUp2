import { apiSlice } from "../apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (name) => `/users?name_like=${name}`,
    }),
    editUser: builder.mutation({
      query: ({ id, data }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: data,
      }),          
      // async onQueryStarted(args, { dispatch, queryFulfilled }) {
      //   console.log(args)
      //   // const tasksResult = dispatch(
      //   //   apiSlice.util.updateQueryData('getUser', undefined, (draft) => {
      //   //    console.log(JSON.stringify(draft))  
      //   //     return draft = draft.map((task) => {
      //   //     if( task?.id == args?.id) {
      //   //       return args?.data
      //   //     }
      //   //     return task
      //   //    } )
          
         
      //   //   }),  
      //   // )
      //   // try {
      //   //   await queryFulfilled
      //   // } catch {
      //   //   tasksResult.undo()
      //   // }

      //   // update single task value

      //   // const taskResult = dispatch(
         
      //   //   apiSlice.util.updateQueryData('getTask', args?.id, (draft) => {
      //   //   return args?.data
        
      //   //   }),  
      //   // )
      //   // try {
      //   //   await queryFulfilled
      //   // } catch {
      //   //   taskResult.undo()
      //   // }

      // },
      
    })
   
  }),
});

export const {
  useGetUserQuery,
  useEditUserMutation
} = userApi;
