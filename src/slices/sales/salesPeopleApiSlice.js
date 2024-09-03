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
    getProductBaletSetups: builder.query({
      query: (data) => ({
        url: `${SALESPEOPLE_URL}/getproductbalesetups`,
        method: "GET",
        body: data,
      }),
      providesTags: ["Sales_people"],
    }),
    getProductBaletSetup: builder.query({
      query: (itemadjustment) => ({
        url: `${SALESPEOPLE_URL}/getproductbalesetup/${id}`,
        method: "GET",
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
    editSalesPersonLimit: builder.mutation({
      query: (data) => ({
        url: `${SALESPEOPLE_URL}/editsalespersonlimit`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Sales_people"],
    }),
    createProductBaletSetup: builder.mutation({
      query: (data) => ({
        url: `${SALESPEOPLE_URL}/createproductbalesetup`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Sales_people"],
    }),
    editProductBaletSetup: builder.mutation({
      query: (data) => ({
        url: `${SALESPEOPLE_URL}/editproductbalesetup`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Sales_people"],
    }),
    getBaleSetups: builder.query({
      query: (data) => ({
        url: `${SALESPEOPLE_URL}/getbalesetups`,
        method: "GET",
        body: data,
      }),
      providesTags: ["Sales_people"],
    }),
    getBaleSetup: builder.query({
      query: (id) => ({
        url: `${SALESPEOPLE_URL}/getbalesetup/${id}`,
        method: "GET",
      }),
      providesTags: ["Sales_people"],
    }),
    createBaleSetup: builder.mutation({
      query: (data) => ({
        url: `${SALESPEOPLE_URL}/createbalesetup`,
        method: "POST",
        body: data,
      }),
      providesTags: ["Sales_people"],
    }),
    editBaleSetup: builder.mutation({
      query: (data) => ({
        url: `${SALESPEOPLE_URL}/editbalesetup`,
        method: "POST",
      }),
      providesTags: ["Sales_people"],
    }),
    deleteBaleSetup: builder.mutation({
      query: (id) => ({
        url: `${SALESPEOPLE_URL}/deletebalesetup/${id}`,
        method: "DELETE",
      }),
      providesTags: ["Sales_people"],
    }),
  }),
});

export const {
  useEditProductBaletSetupMutation,
  useGetProductBaletSetupsQuery,
  useGetProductBaletSetupQuery,
  useCreateProductBaletSetupMutation,
  useLoadReportPrintMutation,
  useLoadReportDataMutation,
  useSalesPeopleStatementMutation,
  useCreateSalesPersonMutation,
  useGetAllSalesPeopleQuery,
  useDeleteSalesPersonMutation,
  useValidateSalesperSonmakeOrderMutation,
  useEditSalesPersonLimitMutation,
  useGetBaleSetupsQuery,
  useGetBaleSetupQuery,
  useCreateBaleSetupMutation,
  useEditBaleSetupMutation,
  useDeleteBaleSetupMutation,
} = salesPeopleApiSlice;
