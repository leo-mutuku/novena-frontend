import { apiSlice } from "../apiSlice";
const PAYMENTPURCHASE_URL = "/api/v1/payment/purchases";

export const paymentPurchaseApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createPaymentPurchase: builder.mutation({
      query: (data) => ({
        url: `${PAYMENTPURCHASE_URL}/createpaymentpurchase`,
        method: "POST",
        body: data,
      }),
    }),

    getAllPaymentPurchase: builder.query({
      query: (data) => ({
        url: `${PAYMENTPURCHASE_URL}/getallpaymentpurchase`,
        method: "GET",
        body: data,
      }),
    }),
  }),
});

export const {
  useCreatePaymentPurchaseMutation,
  useGetAllPaymentPurchaseQuery,
} = paymentPurchaseApiSlice;
