import { apiSlice } from "../apiSlice";
const SALESRETURNORDERHEADER = "/api/v1/sales/salesreturnorderheaders";

export const orderinvoiceApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllSalesReturnOrder: builder.query({
      query: (data) => ({
        url: `${SALESRETURNORDERHEADER}/getallsalesreturnorders`,
        method: "GET",
        body: data,
      }),
    }),
    createSalesRetrunOrderHeader: builder.mutation({
      query: (data) => ({
        url: `${SALESRETURNORDERHEADER}/createsalesreturnorder`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useCreateSalesRetrunOrderHeaderMutation,
  useGetAllSalesReturnOrderQuery,
} = orderinvoiceApiSlice;
