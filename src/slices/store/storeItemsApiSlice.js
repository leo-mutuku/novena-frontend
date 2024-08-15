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
    finalAndByProduct: builder.query({
      query: (data) => ({
        url: `${STOREITEMS_URL}/finalandbyproduct`,
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
    getInventoryEntry: builder.mutation({
      query: (data) => ({
        url: `${STOREITEMS_URL}/inventoryentry`,
        method: "POST",
        body: data,
      }),
      providesTags: ["Store_items"],
    }),
    getInventoryRegister: builder.mutation({
      query: (data) => ({
        url: `${STOREITEMS_URL}/inventoryregister`,
        method: "POST",
        body: data,
      }),
      providesTags: ["Store_items"],
    }),
    getCurrentStockBalance: builder.mutation({
      query: (data) => ({
        url: `${STOREITEMS_URL}/currentstockbalance`,
        method: "POST",
        body: data,
      }),
      providesTags: ["Store_items"],
    }),
    getAllAutoStockTake: builder.query({
      query: () => ({
        url: `${STOREITEMS_URL}/getallautostocktake`,
        method: "GET",
      }),
      providesTags: ["Store_items"],
    }),
    getAutoStockTakeLinesById: builder.query({
      query: (id) => ({
        url: `${STOREITEMS_URL}/getautostocktakelinesbyid/${id}`,
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
  useFinalAndByProductQuery,
  useGetAutoStockTakeLinesByIdQuery,
  useGetAllAutoStockTakeQuery,
  useGetAllStoreItemsQuery,
  useCreateStoreItemMutation,
  useGetStoreItemByIdQuery,
  useUpdateStoreItemByIdMutation,
  useGetCurrentStockBalanceMutation,
  useGetInventoryRegisterMutation,
  useGetInventoryEntryMutation,
} = storeItemsApiSlice;
