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
    getAllDispatchedOrders: builder.query({
      query: (data) => ({
        url: `${SALESORDERHEADER_URL}/getalldispatchedorders`,
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
    getAllDailySales: builder.query({
      query: (data) => ({
        url: `${SALESORDERHEADER_URL}/getalldailysales`,
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
    archiveuPostedSalesOrder: builder.mutation({
      query: (data) => ({
        url: `${SALESORDERHEADER_URL}/archiveupostedsalesorder`,
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
    cancelOrder: builder.mutation({
      query: (data) => ({
        url: `${SALESORDERHEADER_URL}/cancelorder`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Sales_order"],
    }),
  }),
});

export const {
  useGetAllDailySalesQuery,
  useCancelOrderMutation,
  useGetAllDispatchedOrdersQuery,
  useCreateSalesOrderHeaderMutation,
  useGetAllSalesOrderHeadersQuery,
  useGetSalesOrderHeaderByIdQuery,
  useGetAllSalesOrdersInTransitQuery,
  useGetAllPostedSalesOrdersQuery,
  usePostSalesOrderMutation,
  useArchiveuPostedSalesOrderMutation,
} = orderApiSlice;
