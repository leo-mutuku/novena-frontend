import { apiSlice } from "../apiSlice";
const PAYMENTREQUISITION_URL = "/api/v1/payment/requisitions";
export const paymentRequisitionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createPaymentRequisition: builder.mutation({
      query: (data) => ({
        url: `${PAYMENTREQUISITION_URL}/createpaymentrequisition`,
        method: "POST",
        body: data,
      }),
    }),

    getAllPaymentRequisition: builder.query({
      query: (data) => ({
        url: `${PAYMENTREQUISITION_URL}/getallpaymentrequisition`,
        method: "GET",
        body: data,
      }),
    }),
  }),
});

export const {
  useCreatePaymentRequisitionMutation,
  useGetAllPaymentRequisitionQuery,
} = paymentRequisitionApiSlice;
