import { apiSlice } from "../apiSlice";
const STOREPURCHASELINES_URL = "/api/v1/purchase/storepurchaselines";
export const storePurchaseLinesApiSlice = apiSlice.injectEndpoints({
  tagTypes: ["StorePurchaseLines"],
  endpoints: (builder) => ({
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
    getAllPurchaseLinesByHeaderId: builder.query({
      query: (purchase_header_id) => ({
        url: `${STOREPURCHASELINES_URL}/getallpurchaselinesbyheaderid/${purchase_header_id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateStorePurchaseLineMutation,
  useGetAllPurchaseLinesByHeaderIdQuery,
} = storePurchaseLinesApiSlice;
