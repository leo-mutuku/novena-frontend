import { apiSlice } from "../apiSlice";
const VEHICLES_URL = "/api/v1/fleet/vehicles";

export const vehicleApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addVehicle: builder.mutation({
      query: (data) => ({
        url: `${VEHICLES_URL}/create`,
        method: "POST",
        body: data,
      }),
      providesTags: ["Vehicle"],
    }),
    getVehicle: builder.query({
      query: (id) => `${VEHICLES_URL}/${id}`,
      providesTags: ["Vehicle"],
    }),
    getAllVehicles: builder.query({
      query: (data) => ({
        url: `${VEHICLES_URL}/all`,
        method: "GET",
        body: data,
      }),
    }),
    updateVehicle: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `${VEHICLES_URL}/${id}`,
        method: "PUT",
        body: rest,
      }),
      invalidatesTags: ["Vehicle"],
    }),
    deleteVehicle: builder.mutation({
      query: (id) => ({
        url: `${VEHICLES_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Vehicle"],
    }),
  }),
});

export const {
  useAddVehicleMutation,
  useDeleteVehicleMutation,
  useGetAllVehiclesQuery,
  useUpdateVehicleMutation,
  useGetVehicleQuery,
} = vehicleApiSlice;
