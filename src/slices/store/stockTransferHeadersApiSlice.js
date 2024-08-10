import { apiSlice } from "../apiSlice";
const STOCKTRANSFERHEADERSURL = "/api/v1/store/storeitems";

export const stockTransferHeadersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllStoreItems: builder.query({
      query: (data) => ({
        url: `${STOCKTRANSFERHEADERSURL}/getallstoreitems`,
        method: "GET",
        body: data,
      }),
      providesTags: "store_items",
    }),
    createStoreItem: builder.mutation({
      query: (data) => ({
        url: `${STOCKTRANSFERHEADERSURL}/createstoreitem`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: "store_items",
    }),
  }),
});

export const { useGetAllStoreItemsQuery, useCreateStoreItemMutation } =
  stockTransferHeadersApiSlice;
