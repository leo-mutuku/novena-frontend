import { apiSlice } from "../apiSlice";
const PRODUCTSETUP_URL = "/api/v1/productionsetup/products";

export const productSettingApliSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    tagTypes: ["productsetup"],
    getAllproductSetup: builder.query({
      query: (data) => ({
        url: `${PRODUCTSETUP_URL}/getallproductssetup`,
        method: "GET",
        body: data,
      }),
      providesTags: ["productsetup"],
    }),
    getproductSetupById: builder.query({
      query: (id) => ({
        url: `${PRODUCTSETUP_URL}/getproductsetupbyid/${id}`,
        method: "GET",
      }),
      providesTags: ["productsetup"],
    }),
    createProductSetup: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTSETUP_URL}/createproductsetup`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["productsetup"],
    }),
    deleteProductSetup: builder.mutation({
      // Delete a product setup by ID
      query: (id) => ({
        url: `${PRODUCTSETUP_URL}/deleteProductSetup/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["productsetup"],
    }),
    updateProductSetup: builder.mutation({
      query: ({ id, data }) => ({
        url: `${PRODUCTSETUP_URL}/updateproductsetup/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["productsetup"],
    }),
  }),
});

export const {
  useUpdateProductSetupMutation,
  useCreateProductSetupMutation,
  useGetproductSetupByIdQuery,
  useGetAllproductSetupQuery,
  useDeleteProductSetupMutation,
} = productSettingApliSlice;
