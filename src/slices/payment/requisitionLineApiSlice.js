import { apiSlice } from "../apiSlice";
const REQUISITION_LINE = "/api/v1/payment/requisitionlines";

export const requisitionLineApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createPaymentPurchase: builder.mutation({
      query: (data) => ({
        url: `${REQUISITION_LINE}/createrequisitionline`,
        method: "POST",
        body: data,
      }),
    }),

    getAllRequisitionlineInProgressByHeaderId: builder.mutation({
      query: (data) => ({
        url: `${REQUISITION_LINE}/getallrequisitionlineinprogressbyheaderid`,
        method: "POST",
        body: data,
      }),
    }),
    getAllPostedRequisitionlineByHeaderId: builder.mutation({
      query: (data) => ({
        url: `${REQUISITION_LINE}/getallrequisitionlineinprogressbyheaderid`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useCreatePaymentPurchaseMutation,
  useGetAllPaymentPurchaseQuery,
} = requisitionLineApiSlice;
