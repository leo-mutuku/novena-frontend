import { apiSlice } from "../apiSlice";
const URL = "/api/v1/finance/bankaccountentries";

export const bankAccountEntriesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllBankAccountEntries: builder.query({
      query: (data) => ({
        url: `${URL}/getallbankaccountsentries`,
        method: "GET",
        body: data,
      }),
    }),
  }),
});

export const { useGetAllBankAccountEntriesQuery } = bankAccountEntriesApiSlice;
