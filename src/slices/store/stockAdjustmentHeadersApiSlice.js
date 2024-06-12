import { apiSlice } from "../apiSlice";
const STOCKADJUSTMENTAPI_URL = "/api/v1/store/itemregister";

export const stockAdjustmentHeaders = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllregisteredItems: builder.query({
      query: () => ({
        url: `${STOCKADJUSTMENTAPI_URL}/getallregistereditems`,
        method: "GET",
        body: data,
      }),
    }),
  }),
});

export const { useGetAllregisteredItemsQuery } = stockAdjustmentHeaders;
