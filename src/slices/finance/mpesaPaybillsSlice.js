import { apiSlice } from "../apiSlice";
const MPESAPAYBILLS_URL = "/api/v1/finance/mpesapaybills";
export const mpesaPaybillsSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    tagTypes: ["mpesa_paybills"],
    getAllMpesaPaybills: builder.query({
      query: (data) => ({
        url: `${MPESAPAYBILLS_URL}/getallmpesapaybills`,
        method: "GET",
        body: data,
      }),
    }),
    createMpesaPaybill: builder.mutation({
      query: (data) => ({
        url: `${MPESAPAYBILLS_URL}/creatempesapaybill`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetAllMpesaPaybillsQuery, useCreateMpesaPaybillMutation } =
  mpesaPaybillsSlice;
