import { apiSlice } from "../apiSlice";
const PAYROLLCATEGORY_URL = "/api/v1/payroll/deductions";

export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    tagTypes: ["Deductions"],
    createDeductions: builder.mutation({
      query: (data) => ({
        url: `${PAYROLLCATEGORY_URL}/createdeductions`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Deductions"],
    }),

    getAlldeDuctions: builder.query({
      query: (data) => ({
        url: `${PAYROLLCATEGORY_URL}/getalldeductions`,
        method: "GET",
        body: data,
      }),
      providesTags: ["Deductions"],
    }),
    getPayrollCategoryById: builder.query({
      query: (id) => ({
        url: `${PAYROLLCATEGORY_URL}/getpayrollcategorybyid/${id}`,
        method: "GET",
      }),
      providesTags: ["Deductions"],
    }),
    updatePayrollCategory: builder.mutation({
      query: ({ category_id, data }) => ({
        url: `${PAYROLLCATEGORY_URL}/updatepayrollcategory/${category_id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Deductions"],
    }),
    deletePayrollCategory: builder.mutation({
      query: (id) => ({
        url: `${PAYROLLCATEGORY_URL}/deletepayrollcategory/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Deductions"],
    }),
  }),
});

export const { useCreateDeductionsMutation, useGetAlldeDuctionsQuery } =
  categoryApiSlice;
