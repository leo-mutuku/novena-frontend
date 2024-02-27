import { apiSlice } from "../apiSlice";
const MAINTENANCE_URL = "/api/v1/fleet/vehiclemaintenance";

export const maintenanceApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addMaintenance: builder.mutation({
      query: (data) => ({
        url: `${MAINTENANCE_URL}/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Maintenance"],
    }),
    getMaintenance: builder.query({
      query: (id) => `${MAINTENANCE_URL}/${id}`,
      providesTags: ["Maintenance"],
    }),
    getAllMaintenances: builder.query({
      query: () => ({
        url: `${MAINTENANCE_URL}/all`,
        method: "GET",
      }),
      keepUnusedDataFor: 5, //how long unused data should be kept in cache for mem utilization
      providesTags: ["Maintenance"],
    }),
    updateMaintenance: builder.mutation({
      query: ({ id, data }) => {
        // console.log("Updating Maintenance Data:", data); // Log the data here
        return {
          url: `${MAINTENANCE_URL}/${id}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["Maintenance"],
    }),
    deleteMaintenance: builder.mutation({
      query: (id) => ({
        url: `${MAINTENANCE_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Maintenance"],
    }),
  }),
});

export const {
  useAddMaintenanceMutation,
  useGetAllMaintenancesQuery,
  useGetMaintenanceQuery,
  useUpdateMaintenanceMutation,
  useDeleteMaintenanceMutation,
} = maintenanceApiSlice;
