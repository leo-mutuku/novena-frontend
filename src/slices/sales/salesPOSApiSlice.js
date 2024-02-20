import { apiSlice } from "../apiSlice";
const POS_URL = "/api/v1/sales/pos";

export const salesPOSApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    tagTypes: ["POS"],
    getOrserToPrint: builder.query({
      query: (id) => ({
        url: `${POS_URL}/posprintpostedsalesorderbyorderid/${id}`,
        method: "GET",
      }),
      providesTags: ["POS"],
    }),
    createPrintToPos: builder.mutation({
      query: (data) => ({
        url: `${POS_URL}/posprintpostedsalesorderbyorderid`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["POS"],
    }),
  }),
});

export const { useGetOrserToPrintQuery, useCreatePrintToPosMutation } =
  salesPOSApiSlice;
