import { apiSlice } from "../apiSlice";
const URL = "/api/v1/finance/cashtobank";

export const cahsToBankApiSlice = apiSlice.injectEndpoints({
  tags: ["CashToBank"],
  endpoints: (builder) => ({
    getAllCashToBank: builder.query({
      query: (data) => ({
        url: `${URL}/getallcashtobank`,
        method: "GET",
        body: data,
      }),
      providesTags: ["CashToBank"],
    }),
    createCashToBank: builder.mutation({
      query: (data) => ({
        url: `${URL}/createbanktocash`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["CashToBank"],
    }),
    cashToBankTransfer: builder.mutation({
      query: (data) => ({
        url: `${URL}/cashtobanktransfer`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["CashToBank"],
    }),
  }),
});

export const {
  useCashToBankTransferMutation,
  useGetAllCashToBankQuery,
  useCreateCashToBankMutation,
} = cahsToBankApiSlice;
