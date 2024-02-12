import { apiSlice } from "../apiSlice";
const ITEMREG_URL = "/api/v1/store/itemregister";

export const itemregisterApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    typesTags: ["Registered_items"],
    getAllItemRegister: builder.query({
      query: (data) => ({
        url: `${ITEMREG_URL}/getallregistereditems`,
        method: "GET",
        body: data,
      }),
      providesTags: ["Registered_items"],
    }),
    getRegisteredItemById: builder.query({
      query: (id) => ({
        url: `${ITEMREG_URL}/getregistereditembyid/${id}`,
        method: "GET",
      }),
      providesTags: ["Registered_items"],
    }),
    getAllFinalProducts: builder.query({
      query: (data) => ({
        url: `${ITEMREG_URL}/getallsolditems`,
        method: "GET",
        body: data,
      }),
      providesTags: ["Registered_items"],
    }),
    getAllPackagingMaterial: builder.query({
      query: (data) => ({
        url: `${ITEMREG_URL}/getallsupplieditems`,
        method: "GET",
        body: data,
      }),
      providesTags: ["Registered_items"],
    }),

    createItem: builder.mutation({
      query: (data) => ({
        url: `${ITEMREG_URL}/registeritem`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Registered_items"],
    }),
    registerItem: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/registeritem`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Registered_items"],
    }),
    updateRegisteredItem: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/updateregistereditem`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Registered_items"],
    }),
  }),
});

export const {
  useGetAllItemRegisterQuery,
  useCreateItemMutation,
  useGetAllFinalProductsQuery,
  useGetAllPackagingMaterialQuery,
  useUpdateRegisteredItemMutation,
  useGetRegisteredItemByIdQuery,
} = itemregisterApiSlice;
