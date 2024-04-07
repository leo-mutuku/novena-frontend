import { apiSlice } from "../apiSlice";
const PRODUCTIONHEADER_URL = "/api/v1/payroll/payrollines";

export const payrollLinesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    tagTypes: ["Payroll_lines"],
    validatePayroll: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTIONHEADER_URL}/validatepayroll`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Payroll_lines"],
    }),

    bulkPrintPayslip: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTIONHEADER_URL}/bulkprintpayslip`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Payroll_lines"],
    }),

    processPayroll: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTIONHEADER_URL}/processpayroll`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Payroll_lines"],
    }),

    generatePayroll: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTIONHEADER_URL}/generatepayroll`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Payroll_lines"],
    }),
  }),
});

export const {
  useValidatePayrollMutation,
  useProcessPayrollMutation,
  useGeneratePayrollMutation,
  useBulkPrintPayslipMutation,
} = payrollLinesApiSlice;
