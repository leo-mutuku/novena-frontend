import { apiSlice } from "../apiSlice";
const BANKS_URL = "/api/v1/finance/banks";

export const bankAccountsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllBankAccounts: builder.query({
      query: (data) => ({
        url: `${BANKS_URL}/getallbankaccounts`,
        method: "GET",
        body: data,
      }),
    }),
    createBank: builder.mutation({
      query: (data) => ({
        url: `${BANKS_URL}/createbankaccount`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetAllBankAccountsQuery, useCreateBankMutation } =
  bankAccountsApiSlice;
