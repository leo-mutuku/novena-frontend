import { apiSlice } from '../apiSlice';
const STAFF_URL = '/api/v1/administration/staff';

export const staffApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllStaff: builder.query({
      query: (data) => ({
        url: `${STAFF_URL}/getallstaff`,
        method: 'GET',
        body: data,
      }),
    }),
    createStaff: builder.mutation({
      query: (data) => ({
        url: `${STAFF_URL}/createstaff`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { 
  useGetAllStaffQuery,
  useCreateStaffMutation
} = staffApiSlice;
