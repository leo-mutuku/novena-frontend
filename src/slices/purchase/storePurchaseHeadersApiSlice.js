import { apiSlice } from "../apiSlice";
const STOREPURCHASEHEADERS_URL = "/api/v1/purchase/storepurchaseheaders";
export const storePurchaseHeadersApiSlice = apiSlice.injectEndpoints({
  tagTypes: ["StorePurchaseHeader", "StorePurchaseLine"],
  endpoints: (builder) => ({
    getAllStorePurchaseHeaders: builder.query({
      query: () => ({
        url: `${STOREPURCHASEHEADERS_URL}/getallstorepurchaseheaders`,
        method: "GET",
      }),
      providesTags: ["StorePurchaseHeader", "StorePurchaseLine"],
    }),
    getGeneralStorePurchaseReport: builder.mutation({
      query: (data) => ({
        url: `${STOREPURCHASEHEADERS_URL}/generalstorepurchase`,
        method: "POST",
        body: data,
      }),
      providesTags: ["StorePurchaseHeader", "StorePurchaseLine"],
    }),
    getSupplierStorePurchaseReport: builder.mutation({
      query: (data) => ({
        url: `${STOREPURCHASEHEADERS_URL}/supplierstorepurchase`,
        method: "POST",
        body: data,
      }),
      providesTags: ["StorePurchaseHeader", "StorePurchaseLine"],
    }),
    // All posted stored purchases
    getAllPostedStoredPurchases: builder.query({
      query: () => ({
        url: `${STOREPURCHASEHEADERS_URL}/allpostedstorepurchases`,
        method: "GET",
      }),
      providesTags: ["StorePurchaseHeader", "StorePurchaseLine"],
    }),
    getAllStorePurchasesInTransit: builder.query({
      query: () => ({
        url: `${STOREPURCHASEHEADERS_URL}/allstorepurchasesintransit`,
        method: "GET",
      }),
      providesTags: ["StorePurchaseHeader", "StorePurchaseLine"],
    }),

    createStorePurchaseHeader: builder.mutation({
      query: (data) => ({
        url: `${STOREPURCHASEHEADERS_URL}/createstorepurchaseheader`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["StorePurchaseHeader", "StorePurchaseLine"],
    }),
    postStorePurchaseHeader: builder.mutation({
      query: (data) => ({
        url: `${STOREPURCHASEHEADERS_URL}/poststorepurchaseheader`,
        method: "POST",
        body: data,
      }),
      providesTags: ["StorePurchaseHeader", "StorePurchaseLine"],
    }),
  }),
});

export const {
  useGetAllStorePurchaseHeadersQuery,
  useGetAllPostedStoredPurchasesQuery,
  useGetAllStorePurchasesInTransitQuery,
  useCreateStorePurchaseHeaderMutation,
  usePostStorePurchaseHeaderMutation,
  useGetGeneralStorePurchaseReportMutation,
  useGetSupplierStorePurchaseReportMutation,
} = storePurchaseHeadersApiSlice;
