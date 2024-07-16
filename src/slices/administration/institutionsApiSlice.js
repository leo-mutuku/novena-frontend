import { apiSlice } from "../apiSlice";

const INSTITUTIONS_URL = "/api/v1/administration/institutions";

export const institutionsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    tagTypes: ["Institutions"],
    getAllInstitutions: builder.query({
      query: (data) => ({
        url: `${INSTITUTIONS_URL}/getallinstitutions`,
        method: "GET",
        body: data,
      }),
      providesTags: ["Institutions"],
    }),
    getAllInstitutions: builder.query({
      query: (data) => ({
        url: `${INSTITUTIONS_URL}/getallinstitutions`,
        method: "GET",
        body: data,
      }),
      providesTags: ["Institutions"],
    }),
    getInstitutionById: builder.query({
      query: ({ id }) => ({
        url: `${INSTITUTIONS_URL}/getinstitutionbyid/${id}`,
        method: "GET",
      }),
      invalidatesTags: ["Institutions"],
    }),
    updateInstitution: builder.mutation({
      query: (data) => ({
        url: `${INSTITUTIONS_URL}/updateinstitution`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Institutions"],
    }),
  }),
});

export const {
  useGetAllInstitutionsQuery,
  useCreateInstitutionMutation,
  useUpdateInstitutionMutation,
  useGetInstitutionByIdQuery,
} = institutionsApiSlice;
