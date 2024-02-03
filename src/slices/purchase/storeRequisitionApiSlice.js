import { apiSlice } from '../apiSlice';
const STOREPURCHASE_URL = '/api/v1/purchase/storepurchaseheaders';

export const accountsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllStorePurchaseHeaders: builder.query({
      query: (data) => ({
        url: `${STOREPURCHASE_URL}/getallstorepurchaseheaders`,
        method: 'GET',
        body: data,
      }),
    }),
    createAccount: builder.mutation({
        query: (data) => ({
          url: `${STOREPURCHASE_URL}/createstorepurchaseheaders`,
          method: 'POST',
          body: data,
        }),
      }),
  }),
});

export const { useGetAllStorePurchaseHeadersQuery} = accountsApiSlice;
