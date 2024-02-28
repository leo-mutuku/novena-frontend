import { apiSlice } from "../apiSlice";
const STOREPURCHASELINES_URL = "/api/v1/purchase/storepurchaselines";
export const storePurchaseLinesApiSlice = apiSlice.injectEndpoints({
  tagTypes: ["StorePurchaseHeader", "StorePurchaseLine"],
  endpoints: (builder) => ({
    createStorePurchaseLine: builder.mutation({
      query: (data) => ({
        url: `${STOREPURCHASELINES_URL}/createpurchaseline`,
        method: "POST",
        providesTags: ["StorePurchaseHeader", "StorePurchaseLine"],
        body: data,
      }),
      invalidatesTags: ["StorePurchaseHeader", "StorePurchaseLine"],
    }),
    getAllPurchaseLinesByHeaderId: builder.query({
      query: (purchase_header_id) => ({
        url: `${STOREPURCHASELINES_URL}/getallpurchaselinesbyheaderid/${purchase_header_id}`,
        method: "GET",
      }),
      providesTags: ["StorePurchaseHeader", "StorePurchaseLine"],
    }),
  }),
});

export const {
  useCreateStorePurchaseLineMutation,
  useGetAllPurchaseLinesByHeaderIdQuery,
} = storePurchaseLinesApiSlice;
