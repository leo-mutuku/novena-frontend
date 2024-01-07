import { apiSlice } from '../apiSlice';
const STOREPURCHASEHEADERS_URL = '/api/v1/purchase/storepurchaseheaders';
export const storePurchaseHeadersApiSlice = apiSlice.injectEndpoints({
tagTypes: ['StorePurchaseHeader'],
  endpoints: (builder) => ({
    
    getAllStorePurchaseHeaders: builder.query({
      query: (data) => ({
        url: `${STOREPURCHASEHEADERS_URL}/getallstorepurchaseheaders`,
        method: 'GET',
        providesTags: ['StorePurchaseHeader'],
        body: data,
      }),
    }),
    // All posted stored purchases
    getAllPostedStoredPurchases: builder.query({
        query: (data) => ({
          url: `${STOREPURCHASEHEADERS_URL}/allpostedstorepurchases`,
          method: 'GET',
          providesTags: ['StorePurchaseHeader'],
          body: data,
        }),
      }),
      getAllStorePurchasesInTransit: builder.query({
        query: (data) => ({
          url: `${STOREPURCHASEHEADERS_URL}/allstorepurchasesintransit`,
          method: 'GET',
          body: data,
        }),
      }),
    createAccount: builder.mutation({
        query: (data) => ({
          url: `${STOREPURCHASEHEADERS_URL}/createaccount`,
          method: 'POST',
          body: data,
        }),
      }),
    createStorePurchaseHeader: builder.mutation({
        query: (data) => ({
          url: `${STOREPURCHASEHEADERS_URL}/createstorepurchaseheader`,
          method: 'POST',
          body: data,
        }),
    }),
  }),
});

export const { 
    useGetAllStorePurchaseHeadersQuery,
    useGetAllPostedStoredPurchasesQuery,
    useGetAllStorePurchasesInTransitQuery,
    useCreateStorePurchaseHeaderMutation
} = storePurchaseHeadersApiSlice;
