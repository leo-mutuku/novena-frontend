import { apiSlice } from "../apiSlice";
const PAYROLLCATEGORY_URL = "/api/v1/payroll/payrollcategories";

export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createPayrollCategory: builder.mutation({
      query: (data) => ({
        url: `${PAYROLLCATEGORY_URL}/createpayrollcategory`,
        method: "POST",
        body: data,
      }),
    }),

    getAllPayrollcategories: builder.query({
      query: (data) => ({
        url: `${PAYROLLCATEGORY_URL}/getallpayrollcategories`,
        method: "GET",
        body: data,
      }),
    }),
    // getAllProductionHeadersInTransit: builder.query({
    //   query: (data) => ({
    //     url: `${PAYROLLCATEGORY_URL}/getallproductionheaders`,
    //     method: "GET",
    //     body: data,
    //   }),
    // }),
    // getAllProductionHeadersInTransit: builder.query({
    //   query: (data) => ({
    //     url: `${PAYROLLCATEGORY_URL}/getallproductionheadersintransit`,
    //     method: "GET",
    //     body: data,
    //   }),
    // }),
    // getAllPostedProductionHeaders: builder.query({
    //   query: (data) => ({
    //     url: `${PAYROLLCATEGORY_URL}/getallpostedproductionheaders`,
    //     method: "GET",
    //     body: data,
    //   }),
    // }),
  }),
});

export const {
  useCreatePayrollCategoryMutation,
  useGetAllPayrollcategoriesQuery,
} = categoryApiSlice;
