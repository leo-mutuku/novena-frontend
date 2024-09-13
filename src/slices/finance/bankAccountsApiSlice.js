import { apiSlice } from "../apiSlice";
const BANKS_URL = "/api/v1/finance/banks";

export const bankAccountsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    tagTypes: ["Banks"],
    getAllBankAccounts: builder.query({
      query: (data) => ({
        url: `${BANKS_URL}/getallbankaccounts`,
        method: "GET",
        body: data,
      }),
      providesTags: ["Banks"],
    }),
    getBankById: builder.query({
      query: (id) => ({
        url: `${BANKS_URL}/getbankaccountbyid/${id}`,
        method: "GET",
      }),
      providesTags: ["Banks"],
    }),
    getAllSalesBankRecepts: builder.query({
      query: (data) => ({
        url: `${BANKS_URL}/getallsalesbankrecepts`,
        method: "GET",
        body: data,
      }),
      providesTags: ["Banks"],
    }),
    deleteBankAccount: builder.mutation({
      query: (data) => ({
        url: `${BANKS_URL}/deletebankaccount`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Banks"],
    }),
    createBankSaleOrderReceipt: builder.mutation({
      query: (data) => ({
        url: `${BANKS_URL}/createbanksalesorderreceipt`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Banks"],
    }),
    salesBankReceiptReport: builder.mutation({
      query: (data) => ({
        url: `${BANKS_URL}/salesbankreceiptreport`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Banks"],
    }),
    createBankSupplierPayment: builder.mutation({
      query: (data) => ({
        url: `${BANKS_URL}/createbanksupplierpayment`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Banks"],
    }),
    reverseBankReceipt: builder.mutation({
      query: (data) => ({
        url: `${BANKS_URL}/reversebankreceipt`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Banks"],
    }),
    createBank: builder.mutation({
      query: (data) => ({
        url: `${BANKS_URL}/createbankaccount`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Banks"],
    }),
    updateBank: builder.mutation({
      query: (data) => ({
        url: `${BANKS_URL}/updatebank`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Banks"],
    }),
  }),
});

export const {
  useReverseBankReceiptMutation,
  useSalesBankReceiptReportMutation,
  useGetAllSalesBankReceptsQuery,
  useCreateBankSupplierPaymentMutation,
  useCreateBankSaleOrderReceiptMutation,
  useGetAllBankAccountsQuery,
  useCreateBankMutation,
  useDeleteBankAccountMutation,
  useGetBankByIdQuery,
  useUpdateBankMutation,
} = bankAccountsApiSlice;
