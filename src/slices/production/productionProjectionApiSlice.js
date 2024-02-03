import { apiSlice } from '../apiSlice';
const USERS_URL = '/api/v1/administration/users';

export const productionProjectionApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllProductionProjections: builder.query({
            query: () => ({
                url: `${MPESATILLS_URL}/getallproductionprojections`,
                method: 'GET',
                body: data,
            })
        }),
    })
})

export const { useGetAllProductionProjectionsQuery } = productionProjectionApiSlice