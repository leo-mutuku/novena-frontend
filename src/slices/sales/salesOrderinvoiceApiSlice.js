import { apiSlice } from "../apiSlice";
const SALESORDERINVOICE = "/api/v1/sales/salesorderinvoices";

export const orderinvoiceApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllSalesOrderInvoices: builder.query({
      query: (data) => ({
        url: `${SALESORDERINVOICE}/getallsalesorderinvoice`,
        method: "GET",
        body: data,
      }),
    }),
    getSalesOrderInvoiceById: builder.query({
      query: (id) => ({
        url: `${SALESORDERINVOICE}/getsalesorderinvoicebyid`,
        method: "GET",
        body: data,
      }),
    }),
    createSalesOrderInvoice: builder.mutation({
      query: (data) => ({
        url: `${SALESORDERINVOICE}/createsalesorderinvoice`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useCreateSalesOrderInvoiceMutation,
  useGetAllSalesOrderInvoicesQuery,
  useGetSalesOrderInvoiceByIdQuery,
} = orderinvoiceApiSlice;
