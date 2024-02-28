import { apiSlice } from "../apiSlice";
const PRODUCTIONHEADER_URL = "/api/v1/production/productionheaders";

export const productionHeaderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    tagTypes: ["ProductionLines", "productionHeaders"],
    createProductionHeader: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTIONHEADER_URL}/createproductionheader`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ProductionLines", "productionHeaders"],
    }),

    getAllPostedProductionHeaders: builder.query({
      query: (data) => ({
        url: `${PRODUCTIONHEADER_URL}/getallpostedproductionheaders`,
        method: "GET",
        body: data,
      }),
      providesTags: ["ProductionLines", "productionHeaders"],
    }),

    getAllProductionHeaders: builder.query({
      query: (data) => ({
        url: `${PRODUCTIONHEADER_URL}/getallproductionheaders`,
        method: "GET",
        body: data,
      }),
      providesTags: ["ProductionLines", "productionHeaders"],
    }),
    getAllProductionHeadersInTransit: builder.query({
      query: (data) => ({
        url: `${PRODUCTIONHEADER_URL}/getallproductionheaders`,
        method: "GET",
        body: data,
      }),
      providesTags: ["ProductionLines", "productionHeaders"],
    }),
    getAllProductionHeadersInTransit: builder.query({
      query: (data) => ({
        url: `${PRODUCTIONHEADER_URL}/getallproductionheadersintransit`,
        method: "GET",
        body: data,
      }),
      providesTags: ["ProductionLines", "productionHeaders"],
    }),
  }),
});

export const {
  useCreateProductionHeaderMutation,
  useGetAllProductionHeadersQuery,
  useGetAllProductionHeadersInTransitQuery,
  useGetAllPostedProductionHeadersQuery,
} = productionHeaderApiSlice;
