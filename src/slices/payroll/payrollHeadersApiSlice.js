import { apiSlice } from "../apiSlice";
const PAYROLLHEADER_URL = "/api/v1/payroll/payrollheaders";

export const payrollHeadersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    tagTypes: ["Payroll_headers", "Payroll_lines"],
    createPayrollheader: builder.mutation({
      query: (data) => ({
        url: `${PAYROLLHEADER_URL}/createpayrollheader`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Payroll_headers", "Payroll_lines"],
    }),
    rejectSalary: builder.mutation({
      query: (data) => ({
        url: `${PAYROLLHEADER_URL}/rejectsalary`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Payroll_headers", "Payroll_lines"],
    }),
    paysalary: builder.mutation({
      query: (data) => ({
        url: `${PAYROLLHEADER_URL}/paysalary`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Payroll_headers", "Payroll_lines"],
    }),

    getAllPayRollHeaders: builder.query({
      query: (data) => ({
        url: `${PAYROLLHEADER_URL}/getAllPayrollHeaders`,
        method: "GET",
        body: data,
      }),
      providesTags: ["Payroll_headers", "Payroll_lines"],
    }),

    getPayrollHeaderGeneralCategory: builder.query({
      query: (data) => ({
        url: `${PAYROLLHEADER_URL}/getpayrollheadergeneralcategory`,
        method: "GET",
        body: data,
      }),
      providesTags: ["Payroll_headers", "Payroll_lines"],
    }),
    getPayrollHeaderProductionCategory: builder.query({
      query: (data) => ({
        url: `${PAYROLLHEADER_URL}/getpayrollheaderproductioncategory`,
        method: "GET",
        body: data,
      }),
      providesTags: ["Payroll_headers", "Payroll_lines"],
    }),
    getPayrollHeaderPackhouseCategory: builder.query({
      query: (data) => ({
        url: `${PAYROLLHEADER_URL}/getpayrollheaderpackhousecategory`,
        method: "GET",
        body: data,
      }),
      providesTags: ["Payroll_headers", "Payroll_lines"],
    }),
    getGeneratedPayrollHeaders: builder.query({
      query: (data) => ({
        url: `${PAYROLLHEADER_URL}/getgeneratedpayrollheaders`,
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
      providesTags: ["Payroll_headers", "Payroll_lines"],
    }),

    startswith1: builder.query({
      query: (data) => ({
        url: `${PAYROLLHEADER_URL}/startswith1`,
        method: "GET",
        body: data,
      }),
      providesTags: ["Payroll_headers", "Payroll_lines"],
    }),
    startswith2: builder.query({
      query: (data) => ({
        url: `${PAYROLLHEADER_URL}/startswith2`,
        method: "GET",
        body: data,
      }),
      providesTags: ["Payroll_headers", "Payroll_lines"],
    }),
    startswith3: builder.query({
      query: (data) => ({
        url: `${PAYROLLHEADER_URL}/startswith3`,
        method: "GET",
        body: data,
      }),
      providesTags: ["Payroll_headers", "Payroll_lines"],
    }),
    startswith4: builder.query({
      query: (data) => ({
        url: `${PAYROLLHEADER_URL}/startswith4`,
        method: "GET",
        body: data,
      }),
      providesTags: ["Payroll_headers", "Payroll_lines"],
    }),
  }),
});

export const {
  useRejectSalaryMutation,
  usePaysalaryMutation,
  useCreatePayrollheaderMutation,
  useGetAllPayRollHeadersQuery,
  useGetPayrollHeaderGeneralCategoryQuery,
  useGetGeneratedPayrollHeadersQuery,
  useGetAllPayrollHeadersByIdQuery,
  useGetPayrollHeaderProductionCategoryQuery,
  useGetPayrollHeaderPackhouseCategoryQuery,
  useGetPayrollHeaderSalesCategoryQuery,
  useStartswith1Query,
  useStartswith2Query,
  useStartswith3Query,
  useStartswith4Query,
} = payrollHeadersApiSlice;
