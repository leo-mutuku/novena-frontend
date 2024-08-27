import { apiSlice } from "../apiSlice";
const SALESORDERDELIVERY_URL = "/api/v1/sales/salesorderdilivery";

export const dispatchOrderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllSalesOrderDelivery: builder.query({
      query: (data) => ({
        url: `${SALESORDERDELIVERY_URL}/getallsalesorderdilivery`,
        method: "GET",
        body: data,
      }),
    }),
    createSalesOrderDeivery: builder.mutation({
      query: (data) => ({
        url: `${SALESORDERDELIVERY_URL}/createsalesorderdelivery`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useCreateSalesOrderDeiveryMutation,
  useGetAllSalesOrderDeliveryQuery,
} = dispatchOrderApiSlice;
