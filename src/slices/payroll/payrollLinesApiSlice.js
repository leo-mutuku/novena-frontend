import { apiSlice } from "../apiSlice";
const PAYROLLLINES_URL = "/api/v1/payroll/payrollines";

export const payrollLinesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    tagTypes: ["Payroll_lines", "Payroll_headers"],
    validatePayroll: builder.mutation({
      query: (data) => ({
        url: `${PAYROLLLINES_URL}/validatepayroll`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Payroll_lines", "Payroll_headers"],
    }),

    bulkPrintPayslip: builder.mutation({
      query: (data) => ({
        url: `${PAYROLLLINES_URL}/bulkprintpayslip`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Payroll_lines", "Payroll_headers"],
    }),

    processPayroll: builder.mutation({
      query: (data) => ({
        url: `${PAYROLLLINES_URL}/processpayroll`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Payroll_lines", "Payroll_headers"],
    }),
    getPayrollEntries: builder.query({
      query: (id) => ({
        url: `${PAYROLLLINES_URL}/getpayrollentries/${id}`,
        method: "GET",
      }),
      providesTags: ["Payroll_lines", "Payroll_headers"],
    }),

    generatePayroll: builder.mutation({
      query: (data) => ({
        url: `${PAYROLLLINES_URL}/generatepayroll`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Payroll_lines", "Payroll_headers"],
    }),
    getPayrollDetails: builder.query({
      query: (data) => ({
        url: `${PAYROLLLINES_URL}/getpayrolldetails`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetPayrollEntriesQuery,
  useValidatePayrollMutation,
  useProcessPayrollMutation,
  useGeneratePayrollMutation,
  useBulkPrintPayslipMutation,
} = payrollLinesApiSlice;
