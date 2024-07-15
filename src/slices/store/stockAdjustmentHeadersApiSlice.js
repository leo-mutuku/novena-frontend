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
    createStockAdjustmentHeader: builder.mutation({
      query: (data) => ({
        url: `${STOCKADJUSTMENTAPI_URL}/createstockadjustmentheader`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["stockAdjustmentHeaders"],
    }),
  }),
});

export const {
  useGetAllregisteredItemsQuery,
  useCreateStockAdjustmentHeaderMutation,
} = stockAdjustmentHeaders;
