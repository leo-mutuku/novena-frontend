import { apiSlice } from "../apiSlice";
const DRIVERS_VEHICLE_ASSIGN_URL = "/api/v1/fleet/drivervehicleassigns";

export const driverVehicleAssignApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addDriverVehicleAssign: builder.mutation({
      query: (data) => ({
        url: `${DRIVERS_VEHICLE_ASSIGN_URL}/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["DriverVehicleAssign"],
    }),
    getAllDriversVehicleAssign: builder.query({
      query: () => ({
        url: `${DRIVERS_VEHICLE_ASSIGN_URL}/all`,
        method: "GET",
      }),
      keepUnusedDataFor: 5,
      providesTags: ["DriverVehicleAssign"],
    }),
    getDriverVehicleAssign: builder.query({
      query: (id) => `${DRIVERS_VEHICLE_ASSIGN_URL}/${id}`,
      providesTags: ["DriverVehicleAssign"],
    }),
    updateDriverVehicleAssign: builder.mutation({
      query: ({ id, data }) => {
        // console.log("Updating Driver Data:", data); // Log the data here
        return {
          url: `${DRIVERS_VEHICLE_ASSIGN_URL}/${id}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["DriverVehicleAssign"],
      onSuccess: (data, variables, context) => {},
      onError: (error, variables, context) => {
        console.error("Error updating driver:", error);
      },
    }),
    deleteDriverVehicleAssign: builder.mutation({
      query: (id) => ({
        url: `${DRIVERS_VEHICLE_ASSIGN_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["DriverVehicleAssign"],
    }),
  }),
});

export const {
  useAddDriverVehicleAssignMutation,
  useGetAllDriversVehicleAssignQuery,
  useGetDriverVehicleAssignQuery,
  useUpdateDriverVehicleAssignMutation,
  useDeleteDriverVehicleAssignMutation,
} = driverVehicleAssignApiSlice;
