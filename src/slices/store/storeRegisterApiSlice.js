import { apiSlice } from "../apiSlice";
const STOREREGISTER_URL = "/api/v1/store/storeregister";

export const storeRegisterApiSlice = apiSlice.injectEndpoints({
  tagTypes: ["STOREREGISTER"],
  endpoints: (builder) => ({
    getAllStoreRegister: builder.query({
      query: (data) => ({
        url: `${STOREREGISTER_URL}/getallstores`,
        method: "GET",
        body: data,
      }),
      providesTags: ["STOREREGISTER"],
    }),
    registerStore: builder.mutation({
      query: (data) => ({
        url: `${STOREREGISTER_URL}/createstore`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["STOREREGISTER"],
    }),
  }),
});

export const { useGetAllStoreRegisterQuery, useRegisterStoreMutation } =
  storeRegisterApiSlice;
