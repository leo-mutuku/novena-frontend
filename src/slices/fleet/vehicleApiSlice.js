import { apiSlice } from "../apiSlice";
const ACCOUNTS_URL = "/api/v1/finance/accounts";

export const vehicleApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllAccounts: builder.query({
      query: (data) => ({
        url: `${ACCOUNTS_URL}/getallacounts`,
        method: "GET",
        body: data,
      }),
    }),
    createAccount: builder.mutation({
      query: (data) => ({
        url: `${ACCOUNTS_URL}/createaccount`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetAllAccountsQuery, useCreateAccountMutation } =
  vehicleApiSlice;
