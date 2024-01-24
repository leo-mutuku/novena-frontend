import { apiSlice } from "../apiSlice";
const PRODUCTIONHEADER_URL = "/api/v1/production/productionheaders";

export const ProductionLinesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createProductionHeader: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTIONHEADER_URL}/createproductionheader`,
        method: "POST",
        body: data,
      }),
    }),

    getAllProductionHeaders: builder.query({
      query: (data) => ({
        url: `${PRODUCTIONHEADER_URL}/getallproductionheaders`,
        method: "GET",
        body: data,
      }),
    }),
    getAllProductionHeadersInTransit: builder.query({
      query: (data) => ({
        url: `${PRODUCTIONHEADER_URL}/getallproductionheaders`,
        method: "GET",
        body: data,
      }),
    }),
    getAllProductionHeadersInTransit: builder.query({
      query: (data) => ({
        url: `${PRODUCTIONHEADER_URL}/getallproductionheadersintransit`,
        method: "GET",
        body: data,
      }),
    }),
    getAllPostedProductionHeaders: builder.query({
      query: (data) => ({
        url: `${PRODUCTIONHEADER_URL}/getallpostedproductionheaders`,
        method: "GET",
        body: data,
      }),
    }),
  }),
});

export const {
  useCreateProductionHeaderMutation,
  useGetAllProductionHeadersQuery,
  useGetAllProductionHeadersInTransitQuery,
  useGetAllPostedProductionHeadersQuery,
} = ProductionLinesApiSlice;
