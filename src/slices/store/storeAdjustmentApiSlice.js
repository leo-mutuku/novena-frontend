import { apiSlice } from "../apiSlice";
const URL = "/api/v1/store/storetransfer";

export const storeAdjustmentApiSlice = apiSlice.injectEndpoints({
  tagTypes: ["StoreAdjustments", "Store_items"],
  endpoints: (builder) => ({
    getAllStoreAdjustments: builder.query({
      query: (data) => ({
        url: `${URL}/getallstoretransfers`,
        method: "GET",
        body: data,
      }),
      providesTags: ["StoreAdjustments", "Store_items"],
    }),
    createStoreAdjustment: builder.mutation({
      query: (data) => ({
        url: `${URL}/createstoretransfer`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["StoreAdjustments", "Store_items"],
    }),
  }),
});

export const { useGetAllStoreRegisterQuery, useRegisterStoreMutation } =
  storeAdjustmentApiSlice;
