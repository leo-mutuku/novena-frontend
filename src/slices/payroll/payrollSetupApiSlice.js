import { apiSlice } from "../apiSlice";
const PAYROLLSETUP_URL = "/api/v1/payroll/payrollsetups";

export const payrollSetupApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    tagTypes: ["Payroll_setup"],
    createStaffPayrollSetup: builder.mutation({
      query: (data) => ({
        url: `${PAYROLLSETUP_URL}/createstaffpayrollsetup`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Payroll_setup"],
    }),

    getAllPayrollcategories: builder.query({
      query: (data) => ({
        url: `${PAYROLLSETUP_URL}/getallpayrollcategories`,
        method: "GET",
        body: data,
      }),
    }),
  }),
});

export const {
  useCreateStaffPayrollSetupMutation,
  useGetAllPayrollcategoriesQuery,
} = payrollSetupApiSlice;
