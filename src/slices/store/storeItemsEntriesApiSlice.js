import { apiSlice } from "../apiSlice";
const STOREITEMENTRIES_URL = "/api/v1/store/storeitemsentries";

export const storeItemsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllStoreItemEntries: builder.query({
      query: (data) => ({
        url: `${STOREITEMENTRIES_URL}/getallstoreentries`,
        method: "GET",
        body: data,
      }),
    }),
    createStoreItem: builder.mutation({
      query: (data) => ({
        url: `${STOREITEMENTRIES_URL}/createstoreitem`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetAllStoreItemEntriesQuery } = storeItemsApiSlice;
