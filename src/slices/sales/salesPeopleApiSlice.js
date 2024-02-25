import { apiSlice } from "../apiSlice";
const SALESPEOPLE_URL = "/api/v1/sales/salespeople";

export const salesPeopleApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    tagTypes: ["Sales_people"],
    getAllSalesPeople: builder.query({
      query: (data) => ({
        url: `${SALESPEOPLE_URL}/getallsalespeople`,
        method: "GET",
        body: data,
      }),
      providesTags: ["Sales_people"],
    }),
    createSalesPerson: builder.mutation({
      query: (data) => ({
        url: `${SALESPEOPLE_URL}/createsalesperson`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Sales_people"],
    }),
  }),
});

export const { useCreateSalesPersonMutation, useGetAllSalesPeopleQuery } =
  salesPeopleApiSlice;
