import { apiSlice } from "../apiSlice";
const MAIZEPURCHASE_URL = "/api/v1/purchase/maizepurchase";
export const maizePurchaseApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createMaizePurchase: builder.mutation({
      query: (data) => ({
        url: `${MAIZEPURCHASE_URL}/createmaizepurchase`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useCreateMaizePurchaseMutation } = maizePurchaseApiSlice;
