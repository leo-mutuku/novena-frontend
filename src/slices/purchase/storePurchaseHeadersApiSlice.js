import { apiSlice } from "../apiSlice";
const STOREPURCHASEHEADERS_URL = "/api/v1/purchase/storepurchaseheaders";
export const storePurchaseHeadersApiSlice = apiSlice.injectEndpoints({
  tagTypes: ["StorePurchaseHeader"],
  endpoints: (builder) => ({
    getAllStorePurchaseHeaders: builder.query({
      query: () => ({
        url: `${STOREPURCHASEHEADERS_URL}/getallstorepurchaseheaders`,
        method: "GET",
        providesTags: ["StorePurchaseHeader"],
      }),
    }),
    // All posted stored purchases
    getAllPostedStoredPurchases: builder.query({
      query: () => ({
        url: `${STOREPURCHASEHEADERS_URL}/allpostedstorepurchases`,
        method: "GET",
        providesTags: ["StorePurchaseHeader"],
      }),
    }),
    getAllStorePurchasesInTransit: builder.query({
      query: () => ({
        url: `${STOREPURCHASEHEADERS_URL}/allstorepurchasesintransit`,
        method: "GET",
      }),
    }),
    createAccount: builder.mutation({
      query: (data) => ({
        url: `${STOREPURCHASEHEADERS_URL}/createaccount`,
        method: "POST",
        body: data,
      }),
    }),
    createStorePurchaseHeader: builder.mutation({
      query: (data) => ({
        url: `${STOREPURCHASEHEADERS_URL}/createstorepurchaseheader`,
        method: "POST",
        body: data,
        providesTags: ["StorePurchaseHeader"],
      }),
    }),
    postStorePurchaseHeader: builder.mutation({
      query: (data) => ({
        url: `${STOREPURCHASEHEADERS_URL}/poststorepurchaseheader`,
        method: "POST",
        body: data,
        providesTags: ["StorePurchaseHeader"],
      }),
    }),
  }),
});

export const {
  useGetAllStorePurchaseHeadersQuery,
  useGetAllPostedStoredPurchasesQuery,
  useGetAllStorePurchasesInTransitQuery,
  useCreateStorePurchaseHeaderMutation,
  usePostStorePurchaseHeaderMutation,
} = storePurchaseHeadersApiSlice;
