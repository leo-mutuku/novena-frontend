import { apiSlice } from "../apiSlice";
const SALESORDERHEADER_URL = "/api/v1/sales/salesorderheaders";

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    tagTypes: ["Sales_order", "Store_items"],
    getSalesOrderHeaderById: builder.query({
      query: (id) => ({
        url: `${SALESORDERHEADER_URL}/getallsalesorderbyheaderid`,
        method: "GET",
        body: data,
      }),
      providesTags: ["Sales_order", "Store_items"],
    }),
    getAllDispatchedOrders: builder.query({
      query: (data) => ({
        url: `${SALESORDERHEADER_URL}/getalldispatchedorders`,
        method: "GET",
        body: data,
      }),
      providesTags: ["Sales_order", "Store_items"],
    }),
    getAllSalesOrderHeaders: builder.query({
      query: (data) => ({
        url: `${SALESORDERHEADER_URL}/getallsalesordersheaders`,
        method: "GET",
        body: data,
      }),
      providesTags: ["Sales_order", "Store_items"],
    }),
    getAllSalesOrdersInTransit: builder.query({
      query: (data) => ({
        url: `${SALESORDERHEADER_URL}/getallsalesordersheadersintransit`,
        method: "GET",
        body: data,
      }),
      providesTags: ["Sales_order", "Store_items"],
    }),
    getAllDailySales: builder.query({
      query: (data) => ({
        url: `${SALESORDERHEADER_URL}/getalldailysales`,
        method: "GET",
        body: data,
      }),
      providesTags: ["Sales_order", "Store_items"],
    }),
    getAllPostedSalesOrders: builder.query({
      query: (data) => ({
        url: `${SALESORDERHEADER_URL}/getallpostedsalesorders`,
        method: "GET",
        body: data,
      }),
      providesTags: ["Sales_order", "Store_items"],
    }),
    createSalesOrderHeader: builder.mutation({
      query: (data) => ({
        url: `${SALESORDERHEADER_URL}/createsalesorderheader`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Sales_order", "Store_items"],
    }),
    archiveuPostedSalesOrder: builder.mutation({
      query: (data) => ({
        url: `${SALESORDERHEADER_URL}/archiveupostedsalesorder`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Sales_order", "Store_items"],
    }),
    postSalesOrder: builder.mutation({
      query: (data) => ({
        url: `${SALESORDERHEADER_URL}/postsalesorder`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Sales_order", "Store_items"],
    }),
    cancelOrder: builder.mutation({
      query: (data) => ({
        url: `${SALESORDERHEADER_URL}/cancelorder`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Sales_order", "Store_items"],
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
