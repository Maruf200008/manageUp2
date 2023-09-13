import { apiSlice } from "../apiSlice";

export const taskApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => "/task",
    }),
    getTask: builder.query({
      query: (id) => `/task/${id}`,
    }),
    addNewTask: builder.mutation({
      query: (data) => ({
        url: "/task",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          apiSlice.util.updateQueryData('getTasks', undefined, (draft) => {
            console.log(JSON.stringify(args))
            draft.push(args)
          })
        )
        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      }, 
    }),
    EditTask: builder.mutation({
      query: ({ id, data }) => ({
        url: `/task/${id}`,
        method: "PUT",
        body: data,
      }),

              // update all task value

      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        const tasksResult = dispatch(
          apiSlice.util.updateQueryData('getTasks', undefined, (draft) => {
           console.log(JSON.stringify(draft))  
            return draft = draft.map((task) => {
            if( task?.id == args?.id) {
              return args?.data
            }
            return task
           } )
          
         
          }),  
        )
        try {
          await queryFulfilled
        } catch {
          tasksResult.undo()
        }

        // update single task value

        const taskResult = dispatch(
         
          apiSlice.util.updateQueryData('getTask', args?.id, (draft) => {
          return args?.data
        
          }),  
        )
        try {
          await queryFulfilled
        } catch {
          taskResult.undo()
        }

      },
      
    }),

    deleteTask: builder.mutation({
      query: (id) => ({
        url: `/task/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          apiSlice.util.updateQueryData('getTasks', undefined, (draft) => {
            return draft.filter((task) => task.id !== args);   
          })
        )
        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      },
    }),
  }),
});

export const {
  useGetTasksQuery,
  useAddNewTaskMutation,
  useDeleteTaskMutation,
  useEditTaskMutation,
  useGetTaskQuery
} = taskApi;
