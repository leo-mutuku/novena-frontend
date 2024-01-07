import { apiSlice } from "../apiSlice";
const MPESATILLS_URL = "/api/v1/finance/mpesatills";

export const mpesaTillsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllMpesaTills: builder.query({
      query: (data) => ({
        url: `${MPESATILLS_URL}/getallmpesatills`,
        method: "GET",
        body: data,
      }),
    }),
    createMpesaTill: builder.mutation({
      query: (data) => ({
        url: `${MPESATILLS_URL}/creatempesatill`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetAllMpesaTillsQuery, useCreateMpesaTillMutation } =
  mpesaTillsApiSlice;
