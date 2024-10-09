import { apiSlice } from "../apiSlice";
const SUPPLIERS_URL = "/api/v1/store/itemregister";

export const itemAdjustmentApiSlice = apiSlice.injectEndpoints({
  tagTypes: ["item_adjustment", "store_items"],
  endpoints: (builder) => ({
    getAllregisteredItems: builder.query({
      query: () => ({
        url: `${SUPPLIERS_URL}/getallregistereditems`,
        method: "GET",
        body: data,
      }),
    }),
  }),
});

export const { useGetAllregisteredItemsQuery } = itemAdjustmentApiSlice;
