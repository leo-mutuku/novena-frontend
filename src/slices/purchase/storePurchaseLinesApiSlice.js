import { apiSlice } from "../apiSlice";
const STOREPURCHASELINES_URL = "/api/v1/purchase/storepurchaselines";
export const storePurchaseLinesApiSlice = apiSlice.injectEndpoints({
  tagTypes: ["StorePurchaseLines"],
  endpoints: (builder) => ({
    getAllStorePurchaseHeaders: builder.query({
      query: (data) => ({
        url: `${STOREPURCHASELINES_URL}/getallstorepurchaseheaders`,
        method: "GET",
        providesTags: ["StorePurchaseLines"],
        body: data,
      }),
    }),
    // All posted stored purchases
    getAllPostedStoredPurchases: builder.query({
      query: (data) => ({
        url: `${STOREPURCHASELINES_URL}/allpostedstorepurchases`,
        method: "GET",
        providesTags: ["StorePurchaseLines"],
        body: data,
      }),
    }),
    getAllStorePurchasesInTransit: builder.query({
      query: (data) => ({
        url: `${STOREPURCHASELINES_URL}/allstorepurchasesintransit`,
        method: "GET",
        body: data,
      }),
    }),
    createStorePurchaseLine: builder.mutation({
      query: (data) => ({
        url: `${STOREPURCHASELINES_URL}/createpurchaseline`,
        method: "POST",
        providesTags: ["StorePurchaseLines"],
        body: data,
      }),
    }),
  }),
});

export const { useCreateStorePurchaseLineMutation } =
  storePurchaseLinesApiSlice;
