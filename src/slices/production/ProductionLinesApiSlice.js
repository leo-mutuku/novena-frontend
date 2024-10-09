import { apiSlice } from "../apiSlice";
const PRODUCTIONLINE_URL = "/api/v1/production/productionlines";

export const ProductionLinesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    tagTypes: ["ProductionLines", "productionHeaders", "Store_items"],
    createProductionLine: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTIONLINE_URL}/createproductionline`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ProductionLines", "productionHeaders", "Store_items"],
    }),

    getAllProductionHeaders: builder.query({
      query: (data) => ({
        url: `${PRODUCTIONLINE_URL}/getallproductionheaders`,
        method: "GET",
        body: data,
      }),
      providesTags: ["ProductionLines", "productionHeaders", "Store_items"],
    }),
    getAllProductionHeadersInTransit: builder.query({
      query: (data) => ({
        url: `${PRODUCTIONLINE_URL}/getallproductionheaders`,
        method: "GET",
        body: data,
      }),
      providesTags: ["ProductionLines", "productionHeaders", "Store_items"],
    }),
    getAllProductionHeadersInTransit: builder.query({
      query: (data) => ({
        url: `${PRODUCTIONLINE_URL}/getallproductionheadersintransit`,
        method: "GET",
        body: data,
      }),
      providesTags: ["ProductionLines", "productionHeaders", "Store_items"],
    }),
    getAllPostedProductionHeaders: builder.query({
      query: (data) => ({
        url: `${PRODUCTIONLINE_URL}/getallpostedproductionheaders`,
        method: "GET",
        body: data,
      }),
      providesTags: ["ProductionLines", "productionHeaders", "Store_items"],
    }),
  }),
});

export const { useCreateProductionLineMutation } = ProductionLinesApiSlice;
