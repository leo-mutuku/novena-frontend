import { apiSlice } from "../apiSlice";
const PRODUCTIONLINE_URL = "/api/v1/production/productionlines";

export const ProductionLinesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    tagTypes: ["ProductionLines", "productionHeaders"],
    createProductionLine: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTIONLINE_URL}/createproductionline`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ProductionLines", "productionHeaders"],
    }),

    getAllProductionHeaders: builder.query({
      query: (data) => ({
        url: `${PRODUCTIONLINE_URL}/getallproductionheaders`,
        method: "GET",
        body: data,
      }),
      providesTags: ["ProductionLines", "productionHeaders"],
    }),
    getAllProductionHeadersInTransit: builder.query({
      query: (data) => ({
        url: `${PRODUCTIONLINE_URL}/getallproductionheaders`,
        method: "GET",
        body: data,
      }),
      providesTags: ["ProductionLines", "productionHeaders"],
    }),
    getAllProductionHeadersInTransit: builder.query({
      query: (data) => ({
        url: `${PRODUCTIONLINE_URL}/getallproductionheadersintransit`,
        method: "GET",
        body: data,
      }),
      providesTags: ["ProductionLines", "productionHeaders"],
    }),
    getAllPostedProductionHeaders: builder.query({
      query: (data) => ({
        url: `${PRODUCTIONLINE_URL}/getallpostedproductionheaders`,
        method: "GET",
        body: data,
      }),
      providesTags: ["ProductionLines", "productionHeaders"],
    }),
  }),
});

export const { useCreateProductionLineMutation } = ProductionLinesApiSlice;
