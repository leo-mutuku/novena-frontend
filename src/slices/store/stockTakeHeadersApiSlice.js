import { apiSlice } from "../apiSlice";
const STOCKTAKEHEADER_URL = "/api/v1/store/stocktakeheaders";

export const stockTakeHeadersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getallstocktakeheaders: builder.query({
      query: (data) => ({
        url: `${STOCKTAKEHEADER_URL}/getallStockTakeHeaders`,
        method: "GET",
        body: data,
      }),
      providesTags: "store_items",
    }),
    createStockTakeHeader: builder.mutation({
      query: (data) => ({
        url: `${STOCKTAKEHEADER_URL}/createstocktakeheader`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: "store_items",
    }),
    validateStore: builder.mutation({
      query: (data) => ({
        url: `${STOCKTAKEHEADER_URL}/validatestore`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: "store_items",
    }),
  }),
});

export const {
  useGetallstocktakeheadersQuery,
  useCreateStockTakeHeaderMutation,
  useValidateStoreMutation,
} = stockTakeHeadersApiSlice;
