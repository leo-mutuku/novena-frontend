import { apiSlice } from "../apiSlice";
const ACCOUNTENTRIES_URL = "/api/v1/finance/accountentries";

export const cashAccountApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllAccountEntries: builder.query({
      query: (data) => ({
        url: `${ACCOUNTENTRIES_URL}/getallaccountentries`,
        method: "GET",
        body: data,
      }),
    }),
  }),
});

export const { useGetAllAccountEntriesQuery } = cashAccountApiSlice;
