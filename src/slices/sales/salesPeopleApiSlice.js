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
    salesPeopleStatement: builder.mutation({
      query: (data) => ({
        url: `${SALESPEOPLE_URL}/salespeoplestatement`,
        method: "POST",
        body: data,
      }),
      providesTags: ["Sales_people"],
    }),
    deleteSalesPerson: builder.mutation({
      query: (data) => ({
        url: `${SALESPEOPLE_URL}/deletesalesperson`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Sales_people"],
    }),
    createSalesPerson: builder.mutation({
      query: (data) => ({
        url: `${SALESPEOPLE_URL}/createsalesperson`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Sales_people"],
    }),
    loadReportData: builder.mutation({
      query: (data) => ({
        url: `${SALESPEOPLE_URL}/loadreportdata`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Sales_people"],
    }),
    loadReportPrint: builder.mutation({
      query: (data) => ({
        url: `${SALESPEOPLE_URL}/loadreportprint`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Sales_people"],
    }),
    validateSalesperSonmakeOrder: builder.mutation({
      query: (data) => ({
        url: `${SALESPEOPLE_URL}/validatesalespersonmakeorder`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Sales_people"],
    }),
  }),
});

export const {
  useLoadReportPrintMutation,
  useLoadReportDataMutation,
  useSalesPeopleStatementMutation,
  useCreateSalesPersonMutation,
  useGetAllSalesPeopleQuery,
  useDeleteSalesPersonMutation,
  useValidateSalesperSonmakeOrderMutation,
} = salesPeopleApiSlice;
