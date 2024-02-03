import { apiSlice } from "../apiSlice";
const SALESPEOPLE_URL = "/api/v1/sales/salespeople";

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllSalesPeople: builder.query({
      query: (data) => ({
        url: `${SALESPEOPLE_URL}/getallsalespeople`,
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

export const { useCreateSalesPersonMutation, useGetAllSalesPeopleQuery } =
  orderApiSlice;
