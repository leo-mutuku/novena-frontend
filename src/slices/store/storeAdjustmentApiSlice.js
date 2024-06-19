import { apiSlice } from "../apiSlice";
const URL = "/api/v1/store/storetransfer";

export const storeAdjustmentApiSlice = apiSlice.injectEndpoints({
  tagTypes: ["StoreAdjustments"],
  endpoints: (builder) => ({
    getAllStoreAdjustments: builder.query({
      query: (data) => ({
        url: `${URL}/getallstoretransfers`,
        method: "GET",
        body: data,
      }),
      providesTags: ["StoreAdjustments"],
    }),
    createStoreAdjustment: builder.mutation({
      query: (data) => ({
        url: `${URL}/createstoretransfer`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["StoreAdjustments"],
    }),
  }),
});

export const { useGetAllStoreRegisterQuery, useRegisterStoreMutation } =
  storeAdjustmentApiSlice;
