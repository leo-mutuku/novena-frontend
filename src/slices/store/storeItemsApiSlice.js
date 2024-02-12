import { apiSlice } from "../apiSlice";
const STOREITEMS_URL = "/api/v1/store/storeitems";

export const storeItemsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    tagTypes: ["Store_items"],
    getAllStoreItems: builder.query({
      query: (data) => ({
        url: `${STOREITEMS_URL}/getallstoreitems`,
        method: "GET",
        body: data,
      }),
      providesTags: ["Store_items"],
    }),
    getStoreItemById: builder.query({
      query: (id) => ({
        url: `${STOREITEMS_URL}/getstoreitembyid/${id}`,
        method: "GET",
      }),
      providesTags: ["Store_items"],
    }),
    createStoreItem: builder.mutation({
      query: (data) => ({
        url: `${STOREITEMS_URL}/createstoreitem`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Store_items"],
    }),
    updateStoreItemById: builder.mutation({
      query: ({ id, data }) => ({
        url: `${STOREITEMS_URL}/updatestoreitembyid/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Store_items"],
    }),
  }),
});

export const {
  useGetAllStoreItemsQuery,
  useCreateStoreItemMutation,
  useGetStoreItemByIdQuery,
  useUpdateStoreItemByIdMutation,
} = storeItemsApiSlice;
