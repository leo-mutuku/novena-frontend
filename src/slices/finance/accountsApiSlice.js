import { apiSlice } from "../apiSlice";
const ACCOUNTS_URL = "/api/v1/finance/accounts";

export const accountsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    tagTypes: ["Account"],
    getAllAccounts: builder.query({
      query: (data) => ({
        url: `${ACCOUNTS_URL}/getallacounts`,
        method: "GET",
        body: data,
      }),
      providesTags: ["Account"],
    }),
    getAccountById: builder.query({
      query: (id) => ({
        url: `${ACCOUNTS_URL}/getaccountbyid/${id}`,
        method: "GET",
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
    updateAccountById: builder.mutation({
      query: ({ id, data }) => ({
        url: `${ACCOUNTS_URL}/updateaccountbyid/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Account"],
    }),
  }),
});

export const {
  useGetAllAccountsQuery,
  useCreateAccountMutation,
  useUpdateAccountByIdMutation,
  useGetAccountByIdQuery,
} = accountsApiSlice;
