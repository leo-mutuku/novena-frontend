import { apiSlice } from "../apiSlice";
const STOCKADJUSTMENTAPI_URL = "/api/v1/store/stockadjustmentheaders";

export const stockAdjustmentHeaders = apiSlice.injectEndpoints({
  tagTypes: ["stockAdjustmentHeaders", "store_items"],
  endpoints: (builder) => ({
    getAllregisteredItems: builder.query({
      query: () => ({
        url: `${STOCKADJUSTMENTAPI_URL}/getallregistereditems`,
        method: "GET",
        body: data,
      }),
      providesTags: ["stockAdjustmentHeaders", "store_items"],
    }),
    getAllStockIssues: builder.query({
      query: () => ({
        url: `${STOCKADJUSTMENTAPI_URL}/getallstockissues`,
        method: "GET",
      }),
      providesTags: ["stockAdjustmentHeaders", "store_items"],
    }),
    getAllStockAdjustmentHeaders: builder.query({
      query: () => ({
        url: `${STOCKADJUSTMENTAPI_URL}/getallstockadjustmentHeaders`,
        method: "GET",
      }),
      providesTags: ["stockAdjustmentHeaders", "store_items"],
    }),
    createStockAdjustmentHeader: builder.mutation({
      query: (data) => ({
        url: `${STOCKADJUSTMENTAPI_URL}/createstockadjustmentheader`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["stockAdjustmentHeaders", "store_items"],
    }),
    createStockIssue: builder.mutation({
      query: (data) => ({
        url: `${STOCKADJUSTMENTAPI_URL}/createstockissue`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["stockAdjustmentHeaders", "store_items"],
    }),
  }),
});

export const {
  useGetAllStockIssuesQuery,
  useGetAllStockAdjustmentHeadersQuery,
  useGetAllregisteredItemsQuery,
  useCreateStockAdjustmentHeaderMutation,
  useCreateStockIssueMutation,
} = stockAdjustmentHeaders;
