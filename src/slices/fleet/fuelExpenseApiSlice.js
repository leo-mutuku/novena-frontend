import { apiSlice } from "../apiSlice";
const VENDORS_URL = "/api/v1/fleet/fuelexpenses";

export const vehicleApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createFuelExpense: builder.mutation({
      query: (data) => ({
        url: `${VENDORS_URL}/createfuelexpense`,
        method: "POST",
        body: data,
      }),
      providesTags: ["Vendor"],
    }),
    fuelBalanceReport: builder.mutation({
      query: (data) => ({
        url: `${VENDORS_URL}/fuelbalancereport`,
        method: "POST",
        body: data,
      }),
      providesTags: ["Vendor"],
    }),
    getFuelExpense: builder.query({
      query: (id) => `${VENDORS_URL}/getfuelexpense/${id}`,
      providesTags: ["Vendor"],
    }),
    getAllCashSupplierPayments: builder.query({
      query: (data) => ({
        url: `${VENDORS_URL}/getallcashSupplierpayments`,
        method: "GET",
        body: data,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Vendor"],
    }),
    getFuelExpenses: builder.query({
      query: (data) => ({
        url: `${VENDORS_URL}/getfuelexpenses`,
        method: "GET",
        body: data,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Vendor"],
    }),
    updateFuelExpense: builder.mutation({
      query: (data) => {
        return {
          url: `${VENDORS_URL}/updatefuelexpense `,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Vendor"],
    }),
  }),
});

export const {
  useGetAllCashSupplierPaymentsQuery,
  useCreateFuelExpenseMutation,
  useGetFuelExpenseQuery,
  useUpdateFuelExpenseMutation,
  useGetFuelExpensesQuery,
  useFuelBalanceReportMutation,
} = vehicleApiSlice;
