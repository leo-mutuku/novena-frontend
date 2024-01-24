import { apiSlice } from "../apiSlice";
const STOREITEMS_URL = "/api/v1/store/storeitems";

export const stockTakeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllStoreItems: builder.query({
      query: (data) => ({
        url: `${STOREITEMS_URL}/getallstoreitems`,
        method: "GET",
        body: data,
      }),
    }),
    createStoreItem: builder.mutation({
      query: (data) => ({
        url: `${STOREITEMS_URL}/createstoreitem`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetAllStoreItemsQuery, useCreateStoreItemMutation } =
  stockTakeApiSlice;
