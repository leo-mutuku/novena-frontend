import { apiSlice } from "../apiSlice";
const PACKAGINGSETUP_URL = "/api/v1/productionsetup/packaging";

export const packageSettingApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    tagTypes: ["packagingsetup"],
    getAllPackagingSetup: builder.query({
      query: (data) => ({
        url: `${PACKAGINGSETUP_URL}/getallpackagingsetup`,
        method: "GET",
        body: data,
      }),
      providesTags: ["packagingsetup"],
    }),
    getPackagingSetupById: builder.query({
      query: (id) => ({
        url: `${PACKAGINGSETUP_URL}/getpackagingsetupbyid/${id}`,
        method: "GET",
      }),
      providesTags: ["packagingsetup"],
    }),
    createPackagingSetup: builder.mutation({
      query: (data) => ({
        url: `${PACKAGINGSETUP_URL}/createpackagingsetup`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["packagingsetup"],
    }),
    updatePackingSetup: builder.mutation({
      query: ({ id, data }) => ({
        url: `${PACKAGINGSETUP_URL}/updatepackagingsetup/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["packagingsetup"],
    }),
    deletePackingSetup: builder.mutation({
      query: (id) => ({
        url: `${PACKAGINGSETUP_URL}/deletepackagingsetup/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["packagingsetup"],
    }),
  }),
});

export const {
  useUpdatePackingSetupMutation,
  useCreatePackagingSetupMutation,
  useGetPackagingSetupByIdQuery,
  useGetAllPackagingSetupQuery,
  useDeletePackingSetupMutation,
} = packageSettingApiSlice;
