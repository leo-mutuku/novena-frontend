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
    dailyProductionReport: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTIONHEADER_URL}/dailyproductionreport`,
        method: "POST",
        body: data,
      }),
      providesTags: ["ProductionLines", "productionHeaders"],
    }),
    productionCertificate: builder.query({
      query: (id) => ({
        url: `${PRODUCTIONHEADER_URL}/productioncertificate/${id}`,
        method: "GET",
      }),
      providesTags: ["ProductionLines", "productionHeaders"],
    }),
    cancelProductionHeader: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTIONHEADER_URL}/cancleproduction`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ProductionLines", "productionHeaders"],
    }),
    getLastBatchNumbers: builder.query({
      query: (data) => ({
        url: `${PRODUCTIONHEADER_URL}/getlastbatchnumbers`,
        method: "GET",
        body: data,
      }),
      providesTags: ["ProductionLines", "productionHeaders"],
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
  useProductionCertificateQuery,
  useCreateProductionHeaderMutation,
  useCancelProductionHeaderMutation,
  useDailyProductionReportMutation,
  useGetAllProductionHeadersQuery,
  useGetLastBatchNumbersQuery,
  useGetAllProductionHeadersInTransitQuery,
  useGetAllPostedProductionHeadersQuery,
} = productionHeaderApiSlice;
