import { apiSlice } from "../apiSlice";
const URL = "/api/v1/finance/cashaccounts";

export const cashAccountsApiSlice = apiSlice.injectEndpoints({
  tags: ["cashaccounts"],
  endpoints: (builder) => ({
    getAllCashAccounts: builder.query({
      query: (data) => ({
        url: `${URL}/getallcashaccounts`,
        method: "GET",
        body: data,
      }),
      providesTags: ["cashaccounts"],
      // refetchOnMountOrArgChange: true,
    }),
    deleteCashAccount: builder.mutation({
      query: (data) => ({
        url: `${URL}/deletecashaccount`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["cashaccounts"],
    }),
    createCashSalesOrderReceipt: builder.mutation({
      query: (data) => ({
        url: `${URL}/createcashsalesorderreceipt`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["cashaccounts"],
    }),
    createCashAccount: builder.mutation({
      query: (data) => ({
        url: `${URL}/createcashaccount`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["cashaccounts"],
    }),
  }),
});

export const {
  useCreateCashAccountMutation,
  useCreateCashSalesOrderReceiptMutation,
  useGetAllCashAccountsQuery,
  useDeleteCashAccountMutation,
} = cashAccountsApiSlice;
