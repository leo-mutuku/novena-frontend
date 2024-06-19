import { apiSlice } from "../apiSlice";
const URL = "/api/v1/finance/banktocash";

export const bankToCashAPiSlice = apiSlice.injectEndpoints({
  tags: ["BankToCash"],
  endpoints: (builder) => ({
    getAllBankToCash: builder.query({
      query: (data) => ({
        url: `${URL}/getallbanktocash`,
        method: "GET",
        body: data,
      }),
      providesTags: ["BankToCash"],
    }),
    createBankToCash: builder.mutation({
      query: (data) => ({
        url: `${URL}/createbanktocash`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["BankToCash"],
    }),
  }),
});

export const { useGetAllBankToCashQuery, useCreateBankToCashMutation } =
  bankToCashAPiSlice;
