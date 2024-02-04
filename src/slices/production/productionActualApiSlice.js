import { apiSlice } from '../apiSlice';
const PRODUCTION_URL = '/api/v1/administration/users';

export const productionActualApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllProductionActual: builder.query({
            query: () => ({
                url: `${MPESATILLS_URL}/getallproductionactual`,
                method: 'GET',
                body: data,
            })
        }),
    })
})

export const { useGetAllProductionActualQuery } = productionActualApiSlice