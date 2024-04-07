import { apiSlice } from "../apiSlice";
const PAYROLLHEADER_URL = "/api/v1/payroll/payrollheaders";

export const payrollHeadersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    tagTypes: ["Payroll_headers"],
    createPayrollheader: builder.mutation({
      query: (data) => ({
        url: `${PAYROLLHEADER_URL}/createpayrollheader`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Payroll_headers"],
    }),

    getAllPayRollHeaders: builder.query({
      query: (data) => ({
        url: `${PAYROLLHEADER_URL}/getAllPayrollHeaders`,
        method: "GET",
        body: data,
      }),
      providesTags: ["Payroll_headers"],
    }),

    getPayrollHeaderGeneralCategory: builder.query({
      query: (data) => ({
        url: `${PAYROLLHEADER_URL}/getpayrollheadergeneralcategory`,
        method: "GET",
        body: data,
      }),
      providesTags: ["Payroll_headers"],
    }),
    getPayrollHeaderProductionCategory: builder.query({
      query: (data) => ({
        url: `${PAYROLLHEADER_URL}/getpayrollheaderproductioncategory`,
        method: "GET",
        body: data,
      }),
      providesTags: ["Payroll_headers"],
    }),
    getPayrollHeaderPackhouseCategory: builder.query({
      query: (data) => ({
        url: `${PAYROLLHEADER_URL}/getpayrollheaderpackhousecategory`,
        method: "GET",
        body: data,
      }),
      providesTags: ["Payroll_headers"],
    }),

    getPayrollHeaderSalesCategory: builder.query({
      query: (data) => ({
        url: `${PAYROLLHEADER_URL}/getpayrollheadersalescategory`,
        method: "GET",
        body: data,
      }),
      providesTags: ["Payroll_headers"],
    }),
    getAllPayrollHeadersById: builder.query({
      query: (id) => ({
        url: `${PAYROLLHEADER_URL}/getallpayrollheadersbyid/${id}`,
        method: "GET",
      }),
      providesTags: ["Payroll_headers"],
    }),

    startswith1: builder.query({
      query: (data) => ({
        url: `${PAYROLLHEADER_URL}/startswith1`,
        method: "GET",
        body: data,
      }),
      providesTags: ["Payroll_headers"],
    }),
    startswith2: builder.query({
      query: (data) => ({
        url: `${PAYROLLHEADER_URL}/startswith2`,
        method: "GET",
        body: data,
      }),
      providesTags: ["Payroll_headers"],
    }),
    startswith3: builder.query({
      query: (data) => ({
        url: `${PAYROLLHEADER_URL}/startswith3`,
        method: "GET",
        body: data,
      }),
      providesTags: ["Payroll_headers"],
    }),
    startswith4: builder.query({
      query: (data) => ({
        url: `${PAYROLLHEADER_URL}/startswith4`,
        method: "GET",
        body: data,
      }),
      providesTags: ["Payroll_headers"],
    }),
  }),
});

export const {
  useCreatePayrollheaderMutation,
  useGetAllPayRollHeadersQuery,
  useGetPayrollHeaderGeneralCategoryQuery,
  useGetAllPayrollHeadersByIdQuery,
  useGetPayrollHeaderProductionCategoryQuery,
  useGetPayrollHeaderPackhouseCategoryQuery,
  useGetPayrollHeaderSalesCategoryQuery,
  useStartswith1Query,
  useStartswith2Query,
  useStartswith3Query,
  useStartswith4Query,
} = payrollHeadersApiSlice;
