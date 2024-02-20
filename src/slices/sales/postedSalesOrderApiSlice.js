import { apiSlice } from "../apiSlice";
const POSTEDSAESORDERS_URL = "/api/v1/sales/postedsalesorders";

export const orderinvoiceApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllPostedSalesOrders: builder.query({
      query: (data) => ({
        url: `${SALESPEOPLE_URL}/getallpostedsalesorders`,
        method: "GET",
        body: data,
      }),
    }),
    getPostedSalesOrderById: builder.query({
      query: (id) => ({
        url: `${SALESPEOPLE_URL}/getpostedsalesorderbyid`,
        method: "GET",
        body: data,
      }),
    }),
    createSalesPerson: builder.mutation({
      query: (data) => ({
        url: `${SALESPEOPLE_URL}/createsalesperson`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllPostedSalesOrdersQuery,
  useGetPostedSalesOrderByIdQuery,
} = orderinvoiceApiSlice;
