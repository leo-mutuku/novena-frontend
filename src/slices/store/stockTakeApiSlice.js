import { apiSlice } from "../apiSlice";
const URL = "/api/v1/store/stocktake";

export const stockTakeApiSlice = apiSlice.injectEndpoints({
  tagTypes: ["StockTake"],
  endpoints: (builder) => ({
    getAllStockTake: builder.query({
      query: (data) => ({
        url: `${URL}/getallstocktake`,
        method: "GET",
        body: data,
      }),
      providesTags: ["StockTake"],
    }),
    createStockTake: builder.mutation({
      query: (data) => ({
        url: `${URL}/createstocktake`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["StockTake"],
    }),
  }),
});

export const { useGetAllStoreRegisterQuery, useRegisterStoreMutation } =
  stockTakeApiSlice;
