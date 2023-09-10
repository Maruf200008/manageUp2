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
        url: "/task",
        method: "PUT",
        body: data,
      }),
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
