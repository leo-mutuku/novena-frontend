import { apiSlice } from "../apiSlice";
const ACCOUNTENTRIES_URL = "/api/v1/finance/accountentries";

export const accountsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllAccountEntries: builder.query({
      query: (data) => ({
        url: `${ACCOUNTENTRIES_URL}/getallaccountentries`,
        method: "GET",
        body: data,
      }),
    }),
    // createAccount: builder.mutation({
    //   query: (data) => ({
    //     url: `${ACCOUNTENTRIES_URL}/createaccount`,
    //     method: "POST",
    //     body: data,
    //   }),
    // }),
  }),
});

export const { useGetAllAccountEntriesQuery } = accountsApiSlice;
