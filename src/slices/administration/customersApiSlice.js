import { apiSlice } from "../apiSlice";
const CUSTOMERS_URL = "/api/v1/administration/institutions";

export const customersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllInstitutions: builder.query({
      query: (data) => ({
        url: `${CUSTOMERS_URL}/getallinstitutions`,
        method: "GET",
        body: data,
      }),
    }),
    createInstitution: builder.mutation({
      query: (data) => ({
        url: `${CUSTOMERS_URL}/createinstitution`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetAllInstitutionsQuery, useCreateInstitutionMutation } =
  customersApiSlice;
