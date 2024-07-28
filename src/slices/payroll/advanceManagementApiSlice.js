import { apiSlice } from "../apiSlice";
const ADVANCEMGT_URL = "/api/v1/payroll/advancemanagement";

export const advanceManagementApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    tagTypes: ["advanceManagementApiSlice"],
    createPayrollheader: builder.mutation({
      query: (data) => ({
        url: `${ADVANCEMGT_URL}/createpayrollheader`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["advanceManagementApiSlice"],
    }),

    getAllPayRollHeaders: builder.query({
      query: (data) => ({
        url: `${ADVANCEMGT_URL}/getAllPayrollHeaders`,
        method: "GET",
        body: data,
      }),
      providesTags: ["advanceManagementApiSlice"],
    }),

    getPayrollHeaderGeneralCategory: builder.query({
      query: (data) => ({
        url: `${ADVANCEMGT_URL}/getpayrollheadergeneralcategory`,
        method: "GET",
        body: data,
      }),
      providesTags: ["advanceManagementApiSlice"],
    }),
    getPayrollHeaderProductionCategory: builder.query({
      query: (data) => ({
        url: `${ADVANCEMGT_URL}/getpayrollheaderproductioncategory`,
        method: "GET",
        body: data,
      }),
      providesTags: ["advanceManagementApiSlice"],
    }),
    getPayrollHeaderPackhouseCategory: builder.query({
      query: (data) => ({
        url: `${ADVANCEMGT_URL}/getpayrollheaderpackhousecategory`,
        method: "GET",
        body: data,
      }),
      providesTags: ["advanceManagementApiSlice"],
    }),

    getPayrollHeaderSalesCategory: builder.query({
      query: (data) => ({
        url: `${ADVANCEMGT_URL}/getpayrollheadersalescategory`,
        method: "GET",
        body: data,
      }),
      providesTags: ["Payroll_headers"],
    }),
    getAllPayrollHeadersById: builder.query({
      query: (id) => ({
        url: `${ADVANCEMGT_URL}/getallpayrollheadersbyid/${id}`,
        method: "GET",
      }),
      providesTags: ["Payroll_headers", "Payroll_lines"],
    }),

    startswith1: builder.query({
      query: (data) => ({
        url: `${ADVANCEMGT_URL}/startswith1`,
        method: "GET",
        body: data,
      }),
      providesTags: ["Payroll_headers", "Payroll_lines"],
    }),
    startswith2: builder.query({
      query: (data) => ({
        url: `${ADVANCEMGT_URL}/startswith2`,
        method: "GET",
        body: data,
      }),
      providesTags: ["Payroll_headers", "Payroll_lines"],
    }),
    startswith3: builder.query({
      query: (data) => ({
        url: `${ADVANCEMGT_URL}/startswith3`,
        method: "GET",
        body: data,
      }),
      providesTags: ["Payroll_headers", "Payroll_lines"],
    }),
    startswith4: builder.query({
      query: (data) => ({
        url: `${ADVANCEMGT_URL}/startswith4`,
        method: "GET",
        body: data,
      }),
      providesTags: ["Payroll_headers", "Payroll_lines"],
    }),
  }),
});

export const {
  useCreatePayrollheaderMutation,
  useGetAllPayRollHeadersQuery,
  useGetPayrollHeaderGeneralCategoryQuery,
  useGetAllPayrollHeadersByIdQuery,
  useGetPayrollHeaderProductionCategoryQuery,
  useGetPayrollHeaderPackhouseCategoryQuery,
  useGetPayrollHeaderSalesCategoryQuery,
  useStartswith1Query,
  useStartswith2Query,
  useStartswith3Query,
  useStartswith4Query,
} = advanceManagementApiSlice;
