import { apiSlice } from "../apiSlice";
const SALESORDERDISPATCH_URL = "/api/v1/sales/salesorderdispatch";

export const dispatchOrderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllDispatchedSalesOrders: builder.query({
      query: (data) => ({
        url: `${SALESORDERDISPATCH_URL}/getallsalesorderdispach`,
        method: "GET",
        body: data,
      }),
    }),
    createSalesOrderDispatch: builder.mutation({
      query: (data) => ({
        url: `${SALESORDERDISPATCH_URL}/createsalesorderdisptach`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useCreateSalesOrderDispatchMutation,
  useGetAllDispatchedSalesOrdersQuery,
} = dispatchOrderApiSlice;
