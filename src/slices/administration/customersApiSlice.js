import { apiSlice } from "../apiSlice";
const CUSTOMERS_URL = "/api/v1/administrator/customers";

export const customersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCustomers: builder.query({
      query: (data) => ({
        url: `${CUSTOMERS_URL}/getallcustomers`,
        method: "GET",
        body: data,
      }),
    }),
    createCustomer: builder.mutation({
      query: (data) => ({
        url: `${CUSTOMERS_URL}/createcustomer`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useCreateCustomerMutation, useGetAllCustomersQuery } =
  customersApiSlice;
