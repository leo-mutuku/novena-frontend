import { apiSlice } from "../apiSlice";
const ROUTES_URL = "/api/v1/fleet/routes";

export const routesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addRoute: builder.mutation({
      query: (data) => ({
        url: `${ROUTES_URL}/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Route"],
    }),
    getRoute: builder.query({
      query: (id) => `${ROUTES_URL}/${id}`,
      providesTags: ["Route"],
    }),
    getAllRoutes: builder.query({
      query: () => ({
        url: `${ROUTES_URL}/all`,
        method: "GET",
      }),
      keepUnusedDataFor: 5, //how long unused data should be kept in cache for mem utilization
      providesTags: ["Route"],
    }),
    updateRoute: builder.mutation({
      query: ({ id, data }) => {
        // console.log("Updating Route Data:", data); // Log the data here
        return {
          url: `${ROUTES_URL}/${id}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["Route"],
      onSuccess: (data, variables, context) => {},
      onError: (error, variables, context) => {
        console.error("Error updating Route:", error);
      },
    }),

    deleteRoute: builder.mutation({
      query: (id) => ({
        url: `${ROUTES_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Route"],
    }),
  }),
});

export const {
  useAddRouteMutation,
  useGetAllRoutesQuery,
  useGetRouteQuery,
  useUpdateRouteMutation,
  useDeleteRouteMutation,
} = routesApiSlice;
