import { apiSlice } from "../apiSlice";
const STOREREGISTER_URL = "/api/v1/store/storeregister";

export const storeRegisterApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllStoreRegister: builder.query({
      query: (data) => ({
        url: `${STOREREGISTER_URL}/getallstores`,
        method: "GET",
        body: data,
      }),
    }),
    registerStore: builder.mutation({
      query: (data) => ({
        url: `${STOREREGISTER_URL}/createstore`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetAllStoreRegisterQuery, useRegisterStoreMutation } =
  storeRegisterApiSlice;
