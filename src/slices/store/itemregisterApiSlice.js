import { apiSlice } from "../apiSlice";
const ITEMREG_URL = "/api/v1/store/itemregister";

export const itemregisterApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllItemRegister: builder.query({
      query: (data) => ({
        url: `${ITEMREG_URL}/getallregistereditems`,
        method: "GET",
        body: data,
      }),
    }),
    getAllFinalProducts: builder.query({
      query: (data) => ({
        url: `${ITEMREG_URL}/getallsolditems`,
        method: "GET",
        body: data,
      }),
    }),
    getAllPackagingMaterial: builder.query({
      query: (data) => ({
        url: `${ITEMREG_URL}/getallsupplieditems`,
        method: "GET",
        body: data,
      }),
    }),

    createItem: builder.mutation({
      query: (data) => ({
        url: `${ITEMREG_URL}/registeritem`,
        method: "POST",
        body: data,
      }),
    }),
    registerItem: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/registeritem`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllItemRegisterQuery,
  useCreateItemMutation,
  useGetAllFinalProductsQuery,
  useGetAllPackagingMaterialQuery,
} = itemregisterApiSlice;
