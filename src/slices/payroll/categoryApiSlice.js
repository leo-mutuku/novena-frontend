import { apiSlice } from "../apiSlice";
const PAYROLLCATEGORY_URL = "/api/v1/payroll/payrollcategories";

export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    tagTypes: ["Payroll_category"],
    createPayrollCategory: builder.mutation({
      query: (data) => ({
        url: `${PAYROLLCATEGORY_URL}/createpayrollcategory`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Payroll_category"],
    }),

    getAllPayrollcategories: builder.query({
      query: (data) => ({
        url: `${PAYROLLCATEGORY_URL}/getallpayrollcategories`,
        method: "GET",
        body: data,
      }),
      providesTags: ["Payroll_category"],
    }),
    getPayrollCategoryById: builder.query({
      query: (id) => ({
        url: `${PAYROLLCATEGORY_URL}/getpayrollcategorybyid/${id}`,
        method: "GET",
      }),
      providesTags: ["Payroll_category"],
    }),
    updatePayrollCategory: builder.mutation({
      query: ({ category_id, data }) => ({
        url: `${PAYROLLCATEGORY_URL}/updatepayrollcategory/${category_id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Payroll_category"],
    }),
    deletePayrollCategory: builder.mutation({
      query: (id) => ({
        url: `${PAYROLLCATEGORY_URL}/deletepayrollcategory/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Payroll_category"],
    }),
  }),
});

export const {
  useCreatePayrollCategoryMutation,
  useGetAllPayrollcategoriesQuery,
  useGetPayrollCategoryByIdQuery,
  useUpdatePayrollCategoryMutation,
  useDeletePayrollCategoryMutation,
} = categoryApiSlice;
