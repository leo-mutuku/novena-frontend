import { apiSlice } from "../apiSlice";
const SALESORDERLINES_URL = "/api/v1/sales/salesorderlines";

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSalesOrderLineByHeaderId: builder.query({
      query: (header_id) => ({
        url: `${SALESORDERLINES_URL}/getallsalesorderbylineid`,
        method: "GET",
        body: data,
      }),
    }),
    createSalesOrderLine: builder.mutation({
      query: (data) => ({
        url: `${SALESORDERLINES_URL}/createsalesorderline`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useCreateSalesOrderLineMutation,
  useGetSalesOrderLineByHeaderIdQuery,
} = orderApiSlice;
