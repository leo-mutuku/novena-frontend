import { apiSlice } from "../apiSlice";
const SALESRETURNORDERHEADER = "/api/v1/sales/salesreturnorderheaders";

export const orderinvoiceApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    tagTypes: ["Store_items", "return_header"],
    getAllSalesReturnOrder: builder.query({
      query: (data) => ({
        url: `${SALESRETURNORDERHEADER}/getallsalesreturnorders`,
        method: "GET",
        body: data,
      }),
      providesTags: ["Store_items", "return_header"],
    }),
    createSalesRetrunOrderHeader: builder.mutation({
      query: (data) => ({
        url: `${SALESRETURNORDERHEADER}/createsalesreturnorder`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Store_items", "return_header"],
    }),
  }),
});

export const {
  useCreateSalesRetrunOrderHeaderMutation,
  useGetAllSalesReturnOrderQuery,
} = orderinvoiceApiSlice;
