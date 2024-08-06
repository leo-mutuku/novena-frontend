import { apiSlice } from '../apiSlice';
const SUPPLIERS_URL = '/api/v1/store/itemregister';

export const itemAdjustmentApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllregisteredItems: builder.query({
            query: () => ({
                url: `${SUPPLIERS_URL}/getallregistereditems`,
                method: 'GET',
                body: data,
            })
        })
    })
})

export const { useGetAllregisteredItemsQuery } = itemAdjustmentApiSlice