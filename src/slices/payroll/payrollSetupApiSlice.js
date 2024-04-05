import { apiSlice } from "../apiSlice";
const PAYROLLSETUP_URL = "/api/v1/payroll/payrollcategories";

export const payrollSetupApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createPayrollCategory: builder.mutation({
      query: (data) => ({
        url: `${PAYROLLSETUP_URL}/createpayrollcategory`,
        method: "POST",
        body: data,
      }),
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
  useCreatePayrollCategoryMutation,
  useGetAllPayrollcategoriesQuery,
} = payrollSetupApiSlice;
