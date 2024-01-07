import { apiSlice } from '../apiSlice';
const INSTITUTIONS_URL = '/api/v1/administration/institutions';

export const institutionsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllInstitutions: builder.query({
      query: (data) => ({
        url: `${INSTITUTIONS_URL}/getallinstitutions`,
        method: 'GET',
        body: data,
      }),
    }),
    createInstitution: builder.mutation({
      query: (data) => ({
        url: `${INSTITUTIONS_URL}/createinstitution`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { 
  useGetAllInstitutionsQuery,
  useCreateInstitutionMutation
} = institutionsApiSlice;
