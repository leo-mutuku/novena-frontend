import { apiSlice } from "../apiSlice";
const VENDORS_URL = "/api/v1/fleet/mialage";

export const mialageApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createMialage: builder.mutation({
      query: (data) => ({
        url: `${VENDORS_URL}/createmialage`,
        method: "POST",
        body: data,
      }),
      providesTags: ["Vendor"],
    }),
    getVendor: builder.query({
      query: (id) => `${VENDORS_URL}/getvendor${id}`,
      providesTags: ["Vendor"],
    }),
    getMileage: builder.query({
      query: (data) => ({
        url: `${VENDORS_URL}/getmileage`,
        method: "GET",
        body: data,
      }),
   
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
  useCreateMialageMutation,
  useGetMileageQuery,
  useUpdatevendorMutation,
  useGetVendorQuery,
} = mialageApiSlice;
