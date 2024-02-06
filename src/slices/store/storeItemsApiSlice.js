import { apiSlice } from "../apiSlice";
const STOREITEMS_URL = "/api/v1/store/storeitems";

export const storeItemsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllStoreItems: builder.query({
      query: (data) => ({
        url: `${STOREITEMS_URL}/getallstoreitems`,
        method: "GET",
        body: data,
      }),
      providesTags: "store_items",
    }),
    createStoreItem: builder.mutation({
      query: (data) => ({
        url: `${STOREITEMS_URL}/createstoreitem`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: "store_items",
    }),
  }),
});

export const { useGetAllStoreItemsQuery, useCreateStoreItemMutation } =
  storeItemsApiSlice;
