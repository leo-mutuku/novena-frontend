import { apiSlice } from "../apiSlice";
const URL = "/api/v1/finance/cashaccountentries";

export const cashAccountEntries = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCashAccountEntries: builder.query({
      query: (data) => ({
        URL: `${URL}/getallcashaccountenties`,
        method: "GET",
        body: data,
      }),
    }),
  }),
});

export const { useGetAllCashAccountEntriesQuery } = cashAccountEntries;
