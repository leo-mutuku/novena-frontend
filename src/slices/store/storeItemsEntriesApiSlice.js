import { apiSlice } from "../apiSlice";
const STOREITEMENTRIES_URL = "/api/v1/store/storeitemsentries";

export const storeItemsApiSlice = apiSlice.injectEndpoints({
  tagTypes: ["STOREITEMENTRIES"],
  endpoints: (builder) => ({
    getAllStoreItemEntries: builder.query({
      query: (data) => ({
        url: `${STOREITEMENTRIES_URL}/getallstoreentries`,
        method: "GET",
        body: data,
      }),
      providesTags: ["STOREITEMENTRIES"],
    }),
    createStoreItem: builder.mutation({
      query: (data) => ({
        url: `${STOREITEMENTRIES_URL}/createstoreitem`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["STOREITEMENTRIES"],
    }),
    getRunningInventory: builder.mutation({
      query: (data) => ({
        url: `${STOREITEMENTRIES_URL}/getrunninginventory`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["STOREITEMENTRIES"],
    }),
  }),
});

export const {
  useGetAllStoreItemEntriesQuery,
  useGetRunningInventoryMutation,
} = storeItemsApiSlice;
