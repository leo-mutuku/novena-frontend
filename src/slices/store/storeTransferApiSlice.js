import { apiSlice } from "../apiSlice";
const URL = "/api/v1/store/storetransfer";

export const storeTransferApiSlice = apiSlice.injectEndpoints({
  tagTypes: ["StoreTransfers"],
  endpoints: (builder) => ({
    getAllStoreTransfer: builder.query({
      query: (data) => ({
        url: `${URL}/getallstoretransfers`,
        method: "GET",
        body: data,
      }),
      providesTags: ["StoreTransfers"],
    }),
    createStoreTransfer: builder.mutation({
      query: (data) => ({
        url: `${URL}/createstoretransfer`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["StoreTransfers"],
    }),
  }),
});

export const { useGetAllStoreRegisterQuery, useRegisterStoreMutation } =
  storeTransferApiSlice;
