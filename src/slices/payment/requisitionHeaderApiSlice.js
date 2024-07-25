import { apiSlice } from "../apiSlice";
const PAYMENTPURCHASE_URL = "/api/v1/payment/requisitionsheader";

export const requisitionHeaderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    tagTypes: ["requisitionHeaders", "requisitionLine"],
    createRequisitionHeader: builder.mutation({
      query: (data) => ({
        url: `${PAYMENTPURCHASE_URL}/createrequisitionheader`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["requisitionHeaders", "requisitionLine"],
    }),

    postRequisition: builder.mutation({
      query: (data) => ({
        url: `${PAYMENTPURCHASE_URL}/postrequisition`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["requisitionHeaders", "requisitionLine"],
    }),
    getAllRequisitionHeaders: builder.query({
      query: (data) => ({
        url: `${PAYMENTPURCHASE_URL}/getallrequisitionheaders`,
        method: "GET",
        body: data,
      }),
      providesTags: ["requisitionHeaders", "requisitionLine"],
    }),
    getAllRequisitionHeadersInProgress: builder.query({
      query: (data) => ({
        url: `${PAYMENTPURCHASE_URL}/getallrequisitionheadersinprogress`,
        method: "GET",
        body: data,
      }),
      providesTags: ["requisitionHeaders"],
    }),
    getAllPostedRequisitionHeaders: builder.query({
      query: (data) => ({
        url: `${PAYMENTPURCHASE_URL}/getallpostedrequisitionheaders`,
        method: "GET",
        body: data,
      }),
      providesTags: ["requisitionHeaders", "requisitionLine"],
    }),
  }),
});

export const {
  usePostRequisitionMutation,
  useCreateRequisitionHeaderMutation,
  useGetAllRequisitionHeadersQuery,
  useGetAllRequisitionHeadersInProgressQuery,
  useGetAllPostedRequisitionHeadersQuery,
} = requisitionHeaderApiSlice;
