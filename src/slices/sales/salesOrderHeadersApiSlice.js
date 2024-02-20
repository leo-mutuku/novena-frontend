import { apiSlice } from "../apiSlice";
const SALESORDERHEADER_URL = "/api/v1/sales/salesorderheaders";

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    tagTypes: ["Sales_order"],
    getSalesOrderHeaderById: builder.query({
      query: (id) => ({
        url: `${SALESORDERHEADER_URL}/getallsalesorderbyheaderid`,
        method: "GET",
        body: data,
      }),
      providesTags: ["Sales_order"],
    }),
    getAllSalesOrderHeaders: builder.query({
      query: (data) => ({
        url: `${SALESORDERHEADER_URL}/getallsalesordersheaders`,
        method: "GET",
        body: data,
      }),
      providesTags: ["Sales_order"],
    }),
    getAllSalesOrdersInTransit: builder.query({
      query: (data) => ({
        url: `${SALESORDERHEADER_URL}/getallsalesordersheadersintransit`,
        method: "GET",
        body: data,
      }),
      providesTags: ["Sales_order"],
    }),
    getAllPostedSalesOrders: builder.query({
      query: (data) => ({
        url: `${SALESORDERHEADER_URL}/getallpostedsalesorders`,
        method: "GET",
        body: data,
      }),
      providesTags: ["Sales_order"],
    }),
    createSalesOrderHeader: builder.mutation({
      query: (data) => ({
        url: `${SALESORDERHEADER_URL}/createsalesorderheader`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Sales_order"],
    }),
    postSalesOrder: builder.mutation({
      query: (data) => ({
        url: `${SALESORDERHEADER_URL}/postsalesorder`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Sales_order"],
    }),
  }),
});

export const {
  useCreateSalesOrderHeaderMutation,
  useGetAllSalesOrderHeadersQuery,
  useGetSalesOrderHeaderByIdQuery,
  useGetAllSalesOrdersInTransitQuery,
  useGetAllPostedSalesOrdersQuery,
  usePostSalesOrderMutation,
} = orderApiSlice;
