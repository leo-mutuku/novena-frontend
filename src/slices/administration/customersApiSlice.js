import { apiSlice } from "../apiSlice";
const CUSTOMERS_URL = "/api/v1/administrator/customers";

export const customersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    tagTypes: ["Customer"],
    getAllCustomers: builder.query({
      query: (data) => ({
        url: `${CUSTOMERS_URL}/getallcustomers`,
        method: "GET",
        body: data,
      }),
      providesTags: ["Customer"],
    }),
    getCustomerById: builder.query({
      query: (id) => ({
        url: `${CUSTOMERS_URL}/getcustomerbyid/${id}`,
        method: "GET",
      }),
      providesTags: ["Customer"],
    }),
    createCustomer: builder.mutation({
      query: (data) => ({
        url: `${CUSTOMERS_URL}/createcustomer`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Customer"],
    }),
    updateCustomer: builder.mutation({
      query: (data) => ({
        url: `${CUSTOMERS_URL}/updatecustomer`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Customer"],
    }),
    customerStatement: builder.mutation({
      query: (data) => ({
        url: `${CUSTOMERS_URL}/customerstatement`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Customer"],
    }),
  }),
});

export const {
  useCreateCustomerMutation,
  useGetAllCustomersQuery,
  useGetCustomerByIdQuery,
  useUpdateCustomerMutation,
  useCustomerStatementMutation,
} = customersApiSlice;
