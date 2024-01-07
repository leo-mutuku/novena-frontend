import { apiSlice } from '../apiSlice';
const ORDERDISPATCH_URL = '/api/v1/administration/users';

export const dispatchOrderApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllorderdispatches: builder.query({
            query: () => ({
                url: `${ORDERDISPATCH_URL}/getallorderdispatches`,
                method: 'GET',
                body: data,
            })
        }),
    })
})

export const { useGetAllorderdispatchesQuery } = dispatchOrderApiSlice