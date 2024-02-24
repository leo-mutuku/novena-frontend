import { apiSlice } from "../apiSlice";
const STOREPURCHASELINES_URL = "/api/v1/purchase/storepurchaseheaders";

export const storeRequisitionHeadersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    tagTypes: ["Store_Purchase_lines"],
    getAllStorePurchaseHeaders: builder.query({
      query: (data) => ({
        url: `${STOREPURCHASELINES_URL}/getallstorepurchaseheaders`,
        method: "GET",
        body: data,
      }),
      providesTags: ["Store_Purchase_lines"],
    }),
    createAccount: builder.mutation({
      query: (data) => ({
        url: `${STOREPURCHASELINES_URL}/createstorepurchaseheaders`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Store_Purchase_lines"],
    }),
  }),
});

export const { useGetAllStorePurchaseHeadersQuery } =
  storeRequisitionHeadersApiSlice;
