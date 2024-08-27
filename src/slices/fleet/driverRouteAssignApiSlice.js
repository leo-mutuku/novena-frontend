import { apiSlice } from "../apiSlice";
const DRIVERS_ROUTE_ASSIGN_URL = "/api/v1/fleet/driverrouteassigns";

export const driverRouteAssignApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addDriverRouteAssign: builder.mutation({
      query: (data) => ({
        url: `${DRIVERS_ROUTE_ASSIGN_URL}/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["DriverRouteAssign"],
    }),
    getAllDriversRouteAssign: builder.query({
      query: () => ({
        url: `${DRIVERS_ROUTE_ASSIGN_URL}/all`,
        method: "GET",
      }),
      keepUnusedDataFor: 5,
      providesTags: ["DriverRouteAssign"],
    }),
    getDriverRouteAssign: builder.query({
      query: (id) => `${DRIVERS_ROUTE_ASSIGN_URL}/${id}`,
      providesTags: ["DriverRouteAssign"],
    }),
    updateDriverRouteAssign: builder.mutation({
      query: ({ id, data }) => {
        // console.log("Updating Driver Data:", data); // Log the data here
        return {
          url: `${DRIVERS_ROUTE_ASSIGN_URL}/${id}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["DriverRouteAssign"],
      onSuccess: (data, variables, context) => {},
      onError: (error, variables, context) => {
        console.error("Error updating driver:", error);
      },
    }),
    deleteDriverRouteAssign: builder.mutation({
      query: (id) => ({
        url: `${DRIVERS_ROUTE_ASSIGN_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["DriverRouteAssign"],
    }),
  }),
});

export const {
  useAddDriverRouteAssignMutation,
  useGetAllDriversRouteAssignQuery,
  useGetDriverRouteAssignQuery,
  useDeleteDriverRouteAssignMutation,
  useUpdateDriverRouteAssignMutation,
} = driverRouteAssignApiSlice;
