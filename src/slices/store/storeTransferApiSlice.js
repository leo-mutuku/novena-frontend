import { apiSlice } from "../apiSlice";
const URL = "/api/v1/store/storetransfer";

export const storeTransferApiSlice = apiSlice.injectEndpoints({
  tagTypes: ["StoreTransfers", "Store_items"],
  endpoints: (builder) => ({
    getAllStoreTransfer: builder.query({
      query: (data) => ({
        url: `${URL}/getallstoretransfers`,
        method: "GET",
        body: data,
      }),
      providesTags: ["StoreTransfers", "Store_items"],
    }),
    createStoreTransfer: builder.mutation({
      query: (data) => ({
        url: `${URL}/createstoretransfer`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["StoreTransfers", "Store_items"],
    }),
  }),
});

export const { useGetAllStoreRegisterQuery, useRegisterStoreMutation } =
  storeTransferApiSlice;
