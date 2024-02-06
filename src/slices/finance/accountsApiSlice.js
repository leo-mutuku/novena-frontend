import { apiSlice } from "../apiSlice";
const ACCOUNTS_URL = "/api/v1/finance/accounts";

export const accountsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllAccounts: builder.query({
      query: (data) => ({
        url: `${ACCOUNTS_URL}/getallacounts`,
        method: "GET",
        body: data,
      }),
      providesTags: ["Account"],
    }),
    createAccount: builder.mutation({
      query: (data) => ({
        url: `${ACCOUNTS_URL}/createaccount`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Account"],
    }),
  }),
});

export const { useGetAllAccountsQuery, useCreateAccountMutation } =
  accountsApiSlice;
