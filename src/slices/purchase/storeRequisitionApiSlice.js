import { apiSlice } from "../apiSlice";
const STOREPURCHASE_URL = "/api/v1/purchase/storepurchaseheaders";

export const storeRequisitionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    tagTypes: ["store_requisitions"],
    getAllStorePurchaseRequisitions: builder.query({
      query: (data) => ({
        url: `${STOREPURCHASE_URL}/getallstorepurchaseheaders`,
        method: "GET",
        body: data,
      }),
      providesTags: ["store_requisitions"],
    }),
    createAccount: builder.mutation({
      query: (data) => ({
        url: `${STOREPURCHASE_URL}/createstorepurchaseheaders`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["store_requisitions"],
    }),
  }),
});

export const {} = storeRequisitionApiSlice;
