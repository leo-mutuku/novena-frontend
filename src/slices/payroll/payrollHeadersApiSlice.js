import { apiSlice } from "../apiSlice";
const PRODUCTIONHEADER_URL = "/api/v1/payroll/payrollheaders";

export const payrollHeadersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createPayrollheader: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTIONHEADER_URL}/createpayrollheader`,
        method: "POST",
        body: data,
      }),
    }),

    getAllPayRollHeaders: builder.query({
      query: (data) => ({
        url: `${PRODUCTIONHEADER_URL}/getAllPayrollHeaders`,
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
} = payrollHeadersApiSlice;
