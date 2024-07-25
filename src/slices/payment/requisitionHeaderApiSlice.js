import { apiSlice } from "../apiSlice";
const PAYMENTPURCHASE_URL = "/api/v1/payment/requisitionsheader";

export const requisitionHeaderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createRequisitionHeader: builder.mutation({
      query: (data) => ({
        url: `${PAYMENTPURCHASE_URL}/createrequisitionheader`,
        method: "POST",
        body: data,
      }),
    }),

    postRequisition: builder.mutation({
      query: (data) => ({
        url: `${PAYMENTPURCHASE_URL}/postrequisition`,
        method: "POST",
        body: data,
      }),
    }),
    getAllRequisitionHeaders: builder.query({
      query: (data) => ({
        url: `${PAYMENTPURCHASE_URL}/getallrequisitionheaders`,
        method: "GET",
        body: data,
      }),
    }),
    getAllRequisitionHeadersInProgress: builder.query({
      query: (data) => ({
        url: `${PAYMENTPURCHASE_URL}/getallrequisitionheadersinprogress`,
        method: "GET",
        body: data,
      }),
    }),
    getAllPostedRequisitionHeaders: builder.query({
      query: (data) => ({
        url: `${PAYMENTPURCHASE_URL}/getllpostedrequisitionHeaders`,
        method: "GET",
        body: data,
      }),
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
