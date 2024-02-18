import { apiSlice } from "../apiSlice";
const VEHICLES_URL = "/api/v1/fleet/vehicles";

export const runsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addVehicleRun: builder.mutation({
      query: (data) => ({
        url: `${VEHICLES_URL}/start-journey`,
        method: "POST",
        body: data,
      }),
      providesTags: ["VehicleRun"],
    }),
    getAllVehicleRuns: builder.query({
      query: (data) => ({
        url: `${VEHICLES_URL}/vehicleruns/all`,
        method: "GET",
        body: data,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["VehicleRun"],
    }),
    getVehicleRun: builder.query({
      query: (id) => `${VEHICLES_URL}/run/${id}`,
      providesTags: ["VehicleRun"],
    }),
    updateVehicleRun: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `${VEHICLES_URL}/run/${id}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["VehicleRun"],
    }),
    deleteVehicleRun: builder.mutation({
      query: (id) => ({
        url: `${VEHICLES_URL}/run/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["VehicleRun"],
    }),
  }),
});

export const {
  useAddVehicleRunMutation,
  useGetAllVehicleRunsQuery,
  useDeleteVehicleRunMutation,
  useGetVehicleRunQuery,
  useUpdateVehicleRunMutation,
} = runsApiSlice;
