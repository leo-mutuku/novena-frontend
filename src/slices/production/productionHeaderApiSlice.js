import { apiSlice } from "../apiSlice";
const PRODUCTIONHEADER_URL = "/api/v1/production/productionheaders";

export const productionHeaderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    tagTypes: ["ProductionLines", "productionHeaders", "Store_items"],
    createProductionHeader: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTIONHEADER_URL}/createproductionheader`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ProductionLines", "productionHeaders", "Store_items"],
    }),
    dailyProductionReport: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTIONHEADER_URL}/dailyproductionreport`,
        method: "POST",
        body: data,
      }),
      providesTags: ["ProductionLines", "productionHeaders", "Store_items"],
    }),
    productionCertificate: builder.query({
      query: (id) => ({
        url: `${PRODUCTIONHEADER_URL}/productioncertificate/${id}`,
        method: "GET",
      }),
      providesTags: ["ProductionLines", "productionHeaders", "Store_items"],
    }),
    cancelProductionHeader: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTIONHEADER_URL}/cancleproduction`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ProductionLines", "productionHeaders", "Store_items"],
    }),
    getLastBatchNumbers: builder.query({
      query: (data) => ({
        url: `${PRODUCTIONHEADER_URL}/getlastbatchnumbers`,
        method: "GET",
        body: data,
      }),
      providesTags: ["ProductionLines", "productionHeaders", "Store_items"],
    }),

    getAllPostedProductionHeaders: builder.query({
      query: (data) => ({
        url: `${PRODUCTIONHEADER_URL}/getallpostedproductionheaders`,
        method: "GET",
        body: data,
      }),
      providesTags: ["ProductionLines", "productionHeaders", "Store_items"],
    }),

    getAllProductionHeaders: builder.query({
      query: (data) => ({
        url: `${PRODUCTIONHEADER_URL}/getallproductionheaders`,
        method: "GET",
        body: data,
      }),
      providesTags: ["ProductionLines", "productionHeaders", "Store_items"],
    }),
    getAllProductionHeadersInTransit: builder.query({
      query: (data) => ({
        url: `${PRODUCTIONHEADER_URL}/getallproductionheaders`,
        method: "GET",
        body: data,
      }),
      providesTags: ["ProductionLines", "productionHeaders", "Store_items"],
    }),
    getAllProductionHeadersInTransit: builder.query({
      query: (data) => ({
        url: `${PRODUCTIONHEADER_URL}/getallproductionheadersintransit`,
        method: "GET",
        body: data,
      }),
      providesTags: ["ProductionLines", "productionHeaders", "Store_items"],
    }),
    reverseProduction: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTIONHEADER_URL}/reverseproduction`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ProductionLines", "productionHeaders", "Store_items"],
    }),
  }),
});

export const {
  useReverseProductionMutation,
  useProductionCertificateQuery,
  useCreateProductionHeaderMutation,
  useCancelProductionHeaderMutation,
  useDailyProductionReportMutation,
  useGetAllProductionHeadersQuery,
  useGetLastBatchNumbersQuery,
  useGetAllProductionHeadersInTransitQuery,
  useGetAllPostedProductionHeadersQuery,
} = productionHeaderApiSlice;
