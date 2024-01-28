import { apiSlice } from "../apiSlice";
const SALESORDERHEADER_URL = "/api/v1/sales/salesorderheaders";

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSalesOrderHeaderById: builder.query({
      query: (id) => ({
        url: `${SALESORDERHEADER_URL}/getallsalesorderbyheaderid`,
        method: "GET",
        body: data,
      }),
    }),
    getAllSalesOrderHeaders: builder.query({
      query: (data) => ({
        url: `${SALESORDERHEADER_URL}/getallsalesordersheaders`,
        method: "GET",
        body: data,
      }),
    }),
    getAllSalesOrdersInTransit: builder.query({
      query: (data) => ({
        url: `${SALESORDERHEADER_URL}/getallsalesordersheadersintransit`,
        method: "GET",
        body: data,
      }),
    }),
    getAllPostedSalesOrders: builder.query({
      query: (data) => ({
        url: `${SALESORDERHEADER_URL}/getallpostedsalesorders`,
        method: "GET",
        body: data,
      }),
    }),
    createSalesOrderHeader: builder.mutation({
      query: (data) => ({
        url: `${SALESORDERHEADER_URL}/createsalesorderheader`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useCreateSalesOrderHeaderMutation,
  useGetAllSalesOrderHeadersQuery,
  useGetSalesOrderHeaderByIdQuery,
  useGetAllSalesOrdersInTransitQuery,
  useGetAllPostedSalesOrdersQuery,
} = orderApiSlice;
