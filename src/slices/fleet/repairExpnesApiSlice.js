import { apiSlice } from "../apiSlice";
const VENDORS_URL = "/api/v1/fleet/repairexpenses";

export const vehicleApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createRepairExpense: builder.mutation({
      query: (data) => ({
        url: `${VENDORS_URL}/createrepairexpense`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Vendor"],
    }),
    repairBalanceReport: builder.mutation({
      query: (data) => ({
        url: `${VENDORS_URL}/repairbalancereport`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Vendor"],
    }),
    getRepairExpense: builder.query({
      query: (id) => `${VENDORS_URL}/getrepairexpense/${id}`,
      providesTags: ["Vendor"],
    }),
    getRepairExpenses: builder.query({
      query: (data) => ({
        url: `${VENDORS_URL}/getrepairexpenses`,
        method: "GET",
        body: data,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Vendor"],
    }),
    updateRepairExpense: builder.mutation({
      query: (data) => {
        return {
          url: `${VENDORS_URL}/updaterepqirexpense `,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Vendor"],
    }),
  }),
});

export const {
  useCreateRepairExpenseMutation,
  useGetRepairExpenseQuery,
  useGetRepairExpensesQuery,
  useUpdateRepairExpenseMutation,
  useRepairBalanceReportMutation,
} = vehicleApiSlice;
