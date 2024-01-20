import { apiSlice } from "../apiSlice";
const PRODUCTIONHEADER_URL = "/api/v1/production/productionheaders";

export const productionProjectionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createProductionHeader: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTIONHEADER_URL}/createproductionheader`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useCreateProductionHeaderMutation } =
  productionProjectionApiSlice;
