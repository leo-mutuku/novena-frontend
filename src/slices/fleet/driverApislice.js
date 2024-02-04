import { apiSlice } from "../apiSlice";
const DRIVERS_URL = "/api/v1/fleet/drivers";

export const driversApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addDriver: builder.mutation({
      query: (data) => ({
        url: `${DRIVERS_URL}/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Driver"],
    }),
    getDriver: builder.query({
      query: (id) => `${DRIVERS_URL}/${id}`,
      providesTags: ["Driver"],
    }),
    getAllDrivers: builder.query({
      query: (data) => ({
        url: `${DRIVERS_URL}/all`,
        method: "GET",
        body: data,
      }),
      providesTags: ["Driver"],
    }),
    updateDriver: builder.mutation({
      query: (id, data) => ({
        url: `${DRIVERS_URL}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Driver"],
    }),
    deleteDriver: builder.mutation({
      query: (id) => ({
        url: `${DRIVERS_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Driver"],
    }),
  }),
});

export const {
  useAddDriverMutation,
  useGetAllDriversQuery,
  useGetDriverQuery,
  useUpdateDriverMutation,
  useDeleteDriverMutation,
} = driversApiSlice;
