import { apiSlice } from "../apiSlice";
const STOREPURCHASELINES_URL = "/api/v1/purchase/storepurchaseheaders";

export const storeRequisitionLinesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllStorePurchaseHeaders: builder.query({
      query: (data) => ({
        url: `${STOREPURCHASELINES_URL}/getallstorepurchaseheaders`,
        method: "GET",
        body: data,
      }),
    }),
    createAccount: builder.mutation({
      query: (data) => ({
        url: `${STOREPURCHASELINES_URL}/createstorepurchaseheaders`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetAllStorePurchaseHeadersQuery } =
  storeRequisitionLinesApiSlice;
