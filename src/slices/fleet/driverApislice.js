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
      query: ({ id, data }) => {
        alert(id);
        alert(JSON.stringify(data));
        console.log("Updating Driver Data:", data); // Log the data here
        return {
          url: `${DRIVERS_URL}/${id}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["Driver"],
      onSuccess: (data, variables, context) => {
        console.log("Updated Driver Data:", data);
      },
      onError: (error, variables, context) => {
        console.error("Error updating driver:", error);
      },
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
