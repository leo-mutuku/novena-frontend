import { apiSlice } from "../apiSlice";
const SALESORDERLINES_URL = "/api/v1/sales/salesorderlines";

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    tagTypes: ["Sales_orderLines", "Store_items"],

    getSalesOrderLineByHeaderId: builder.query({
      query: (header_id) => ({
        url: `${SALESORDERLINES_URL}/getallsalesorderbylineid`,
        method: "GET",
        body: data,
      }),
      providesTags: ["Sales_orderLines", "Store_items"],
    }),
    getSalesLinesByHeaderId: builder.query({
      query: (sales_order_number) => ({
        url: `${SALESORDERLINES_URL}/getallsalesorderslinesbysalesordernumber/${sales_order_number}`,
        method: "GET",
      }),
      providesTags: ["Sales_orderLines", "Store_items"],
    }),
    detailedSPOrderReport: builder.mutation({
      query: (data) => ({
        url: `${SALESORDERLINES_URL}/detailedsporderreport`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Sales_orderLines", "Store_items"],
    }),

    createSalesOrderLine: builder.mutation({
      query: (data) => ({
        url: `${SALESORDERLINES_URL}/createsalesorderline`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Sales_orderLines", "Store_items"],
    }),
  }),
});

export const {
  useDetailedSPOrderReportMutation,
  useCreateSalesOrderLineMutation,
  useGetSalesOrderLineByHeaderIdQuery,
  useGetSalesLinesByHeaderIdQuery,
} = orderApiSlice;
