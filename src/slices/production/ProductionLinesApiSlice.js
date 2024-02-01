import { apiSlice } from "../apiSlice";
const PRODUCTIONLINE_URL = "/api/v1/production/productionlines";

export const ProductionLinesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createProductionLine: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTIONLINE_URL}/createproductionline`,
        method: "POST",
        body: data,
      }),
    }),

    getAllProductionHeaders: builder.query({
      query: (data) => ({
        url: `${PRODUCTIONLINE_URL}/getallproductionheaders`,
        method: "GET",
        body: data,
      }),
    }),
    getAllProductionHeadersInTransit: builder.query({
      query: (data) => ({
        url: `${PRODUCTIONLINE_URL}/getallproductionheaders`,
        method: "GET",
        body: data,
      }),
    }),
    getAllProductionHeadersInTransit: builder.query({
      query: (data) => ({
        url: `${PRODUCTIONLINE_URL}/getallproductionheadersintransit`,
        method: "GET",
        body: data,
      }),
    }),
    getAllPostedProductionHeaders: builder.query({
      query: (data) => ({
        url: `${PRODUCTIONLINE_URL}/getallpostedproductionheaders`,
        method: "GET",
        body: data,
      }),
    }),
  }),
});

export const { useCreateProductionLineMutation } = ProductionLinesApiSlice;
