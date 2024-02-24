import { apiSlice } from "../apiSlice";
const STOREPURCHASELINES_URL = "/api/v1/purchase/storepurchaselines";
export const storePurchaseLinesApiSlice = apiSlice.injectEndpoints({
  tagTypes: ["StorePurchaseLines"],
  endpoints: (builder) => ({
    createStorePurchaseLine: builder.mutation({
      query: (data) => ({
        url: `${STOREPURCHASELINES_URL}/createpurchaseline`,
        method: "POST",
        providesTags: ["StorePurchaseLines"],
        body: data,
      }),
      invalidatesTags: ["StorePurchaseLines"],
    }),
    getAllPurchaseLinesByHeaderId: builder.query({
      query: (purchase_header_id) => ({
        url: `${STOREPURCHASELINES_URL}/getallpurchaselinesbyheaderid/${purchase_header_id}`,
        method: "GET",
      }),
      providesTags: ["StorePurchaseLines"],
    }),
  }),
});

export const {
  useCreateStorePurchaseLineMutation,
  useGetAllPurchaseLinesByHeaderIdQuery,
} = storePurchaseLinesApiSlice;
