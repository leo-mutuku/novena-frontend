import { apiSlice } from "../apiSlice";
const STOCKTAKEHEADER_URL = "/api/v1/store/storeitems";

export const stockTakeHeadersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllStoreItems: builder.query({
      query: (data) => ({
        url: `${STOCKTAKEHEADER_URL}/getallstoreitems`,
        method: "GET",
        body: data,
      }),
      providesTags: "store_items",
    }),
    createStoreItem: builder.mutation({
      query: (data) => ({
        url: `${STOCKTAKEHEADER_URL}/createstoreitem`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: "store_items",
    }),
  }),
});

export const { useGetAllStoreItemsQuery, useCreateStoreItemMutation } =
  stockTakeHeadersApiSlice;
