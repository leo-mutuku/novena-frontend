import { apiSlice } from '../apiSlice';
const SUPPLIERS_URL = '/api/v1/administration/suppliers';

export const staffApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllSuppliers: builder.query({
      query: (data) => ({
        url: `${SUPPLIERS_URL}/getallsuppliers`,
        method: 'GET',
        body: data,
      }),
    }),
    createSupplier: builder.mutation({
      query: (data) => ({
        url: `${SUPPLIERS_URL}/createsupplier`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { 
  useGetAllSuppliersQuery,
  useCreateSupplierMutation
} = staffApiSlice;
