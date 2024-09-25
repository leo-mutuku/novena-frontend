import { apiSlice } from "../apiSlice";
const STOCKADJUSTMENTAPI_URL = "/api/v1/store/stockadjustmentheaders";

export const stockAdjustmentHeaders = apiSlice.injectEndpoints({
  tagsType: ["stockAdjustmentHeaders"],
  endpoints: (builder) => ({
    getAllregisteredItems: builder.query({
      query: () => ({
        url: `${STOCKADJUSTMENTAPI_URL}/getallregistereditems`,
        method: "GET",
        body: data,
      }),
      providesTags: ["stockAdjustmentHeaders"],
    }),
    getAllStockIssues: builder.query({
      query: () => ({
        url: `${STOCKADJUSTMENTAPI_URL}/getallstockissues`,
        method: "GET",
      }),
      providesTags: ["stockAdjustmentHeaders"],
    }),
    getAllStockAdjustmentHeaders: builder.query({
      query: () => ({
        url: `${STOCKADJUSTMENTAPI_URL}/getallstockadjustmentHeaders`,
        method: "GET",
      }),
      providesTags: ["stockAdjustmentHeaders"],
    }),
    createStockAdjustmentHeader: builder.mutation({
      query: (data) => ({
        url: `${STOCKADJUSTMENTAPI_URL}/createstockadjustmentheader`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["stockAdjustmentHeaders"],
    }),
    createStockIssue: builder.mutation({
      query: (data) => ({
        url: `${STOCKADJUSTMENTAPI_URL}/createstockissue`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["stockAdjustmentHeaders"],
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
