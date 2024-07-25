import { apiSlice } from "../apiSlice";
const SALES_EXPENSE_URL = "/api/v1/sales/salesexpense";

export const salesExpenseApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    tagTypes: ["salesExpense"],
    getSalesExpense: builder.query({
      query: (data) => ({
        url: `${SALES_EXPENSE_URL}/getsalesexpense`,
        method: "GET",
        body: data,
      }),
      providesTags: ["salesExpense"],
    }),
    createSalesExpense: builder.mutation({
      query: (data) => ({
        url: `${SALES_EXPENSE_URL}/createsalesexpense`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["salesExpense"],
    }),
  }),
});

export const { useCreateSalesExpenseMutation, useGetSalesExpenseQuery } =
  salesExpenseApiSlice;
