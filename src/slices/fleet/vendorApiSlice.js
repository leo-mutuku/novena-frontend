import { apiSlice } from "../apiSlice";
const VENDORS_URL = "/api/v1/fleet/vendors";

export const vehicleApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createVendor: builder.mutation({
      query: (data) => ({
        url: `${VENDORS_URL}/createvendor`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Vendor"],
    }),
    getVendorBalance: builder.mutation({
      query: (data) => ({
        url: `${VENDORS_URL}/getvendorbalance`,
        method: "POST",
        body: data,
      }),
      keepUnusedDataFor: 5,
      invalidatesTags: ["Vendor"],
    }),
    getVendor: builder.query({
      query: (id) => `${VENDORS_URL}/getvendor${id}`,
      providesTags: ["Vendor"],
    }),
    getVendors: builder.query({
      query: (data) => ({
        url: `${VENDORS_URL}/getvendors`,
        method: "GET",
        body: data,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Vendor"],
    }),
    getVendorsEntries: builder.query({
      query: (data) => ({
        url: `${VENDORS_URL}/getvendorsentries`,
        method: "GET",
        body: data,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Vendor"],
    }),
    updatevendor: builder.mutation({
      query: (data) => {
        return {
          url: `${VENDORS_URL}/updatevendor`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Vendor"],
    }),
  }),
});

export const {
  useCreateVendorMutation,
  useGetVendorsQuery,
  useUpdatevendorMutation,
  useGetVendorQuery,
  useGetVendorsEntriesQuery,
  useGetVendorBalanceMutation,
} = vehicleApiSlice;
