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
    getAllSalesCashRecepts: builder.query({
      query: (data) => ({
        url: `${URL}/getallsalescashrecepts`,
        method: "GET",
        body: data,
      }),
      providesTags: ["cashaccounts"],
      // refetchOnMountOrArgChange: true,
    }),
    getCashAccountById: builder.query({
      query: (id) => ({
        url: `${URL}/getcashaccountbyid/${id}`,
        method: "GET",
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
    reverseCashSalesOrderReceipt: builder.mutation({
      query: (data) => ({
        url: `${URL}/reversecashsalesorderreceipt`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["cashaccounts"],
    }),

    createCashSupplierPayment: builder.mutation({
      query: (data) => ({
        url: `${URL}/createcashsupplierpayment`,
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
    updateCashAccountBalance: builder.mutation({
      query: (data) => ({
        url: `${URL}/updatecashaccountbalance`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["cashaccounts"],
    }),
  }),
});

export const {
  useReverseCashSalesOrderReceiptMutation,
  useUpdateCashAccountBalanceMutation,
  useGetAllSalesCashReceptsQuery,
  useCreateCashSupplierPaymentMutation,
  useCreateCashAccountMutation,
  useCreateCashSalesOrderReceiptMutation,
  useGetAllCashAccountsQuery,
  useDeleteCashAccountMutation,
  useGetCashAccountByIdQuery,
} = cashAccountsApiSlice;
