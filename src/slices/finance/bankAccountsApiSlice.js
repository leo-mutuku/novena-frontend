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
    deleteBankAccount: builder.mutation({
      query: (data) => ({
        url: `${BANKS_URL}/deletebankaccount`,
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
  }),
});

export const {
  useGetAllBankAccountsQuery,
  useCreateBankMutation,
  useDeleteBankAccountMutation,
} = bankAccountsApiSlice;
