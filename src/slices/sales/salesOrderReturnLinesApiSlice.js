import { apiSlice } from "../apiSlice";
const SALESRETURNORDER = "/api/v1/sales/salesreturnorderheaders";

export const salesOrderReturnApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    tagTypes: ["sales_return"],
    getAllSalesReturnOrder: builder.query({
      query: (data) => ({
        url: `${SALESRETURNORDER}/getallsalesreturnorders`,
        method: "GET",
        body: data,
      }),
    }),
    createSalesReturnOrder: builder.mutation({
      query: (data) => ({
        url: `${SALESRETURNORDER}/createsalesreturnorder`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["sales_return"],
    }),
    createSalesOrderReverse: builder.mutation({
      query: (data) => ({
        url: `${SALESRETURNORDER}/createsalesorderreverse`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["sales_return"],
    }),
  }),
});

export const {
  useCreateSalesOrderReverseMutation,
  useCreateSalesReturnOrderMutation,
} = salesOrderReturnApiSlice;
