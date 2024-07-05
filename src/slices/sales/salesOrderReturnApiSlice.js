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
      providesTags: ["sales_return"],
    }),
    getAllsalesReturnOrdersLinesByHeaderId: builder.query({
      query: (id) => ({
        url: `${SALESRETURNORDER}/getallsalesreturnorderslinesbyheaderid/${id}`,
        method: "GET",
      }),
      providesTags: ["sales_return"],
    }),
    getAllPostedSaleReturnOrders: builder.query({
      query: (data) => ({
        url: `${SALESRETURNORDER}/getallpostedsalereturnorders`,
        method: "GET",
        body: data,
      }),
      providesTags: ["sales_return"],
    }),
    getAllReturnOrdersheadersIntransit: builder.query({
      query: (data) => ({
        url: `${SALESRETURNORDER}/getallreturnordersheadersintransit`,
        method: "GET",
        body: data,
      }),
      providesTags: ["sales_return"],
    }),
    postReturnOrder: builder.mutation({
      query: (data) => ({
        url: `${SALESRETURNORDER}/postreturnorder`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["sales_return"],
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
  usePostReturnOrderMutation,
  useGetAllsalesReturnOrdersLinesByHeaderIdQuery,
  useGetAllPostedSaleReturnOrdersQuery,
  useGetAllReturnOrdersheadersIntransitQuery,
  useGetAllSalesReturnOrderQuery,
  useCreateSalesOrderReverseMutation,
  useCreateSalesReturnOrderMutation,
} = salesOrderReturnApiSlice;
