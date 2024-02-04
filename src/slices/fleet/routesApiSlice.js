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
      providesTags: ["Route"],
    }),
    getRoute: builder.query({
      query: (id) => `${ROUTES_URL}/${id}`,
      providesTags: ["Route"],
    }),
    getAllRoutes: builder.query({
      query: (data) => ({
        url: `${ROUTES_URL}/all`,
        method: "GET",
        body: data,
      }),
    }),
    updateRoute: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `${ROUTES_URL}/${id}`,
        method: "PUT",
        body: rest,
      }),
      invalidatesTags: ["Route"],
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
