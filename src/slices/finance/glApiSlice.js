import { apiSlice } from "../apiSlice";
const GL_ACCOUNTS_URL = "/api/v1/finance/glaccounts";

export const glApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    tagTypes: ["GL"],
    getAllGLAccounts: builder.query({
      query: (data) => ({
        url: `${GL_ACCOUNTS_URL}/getallglaccounts`,
        method: "GET",
        body: data,
      }),
      providesTags: ["GL"],
    }),
    createGl: builder.mutation({
      query: (data) => ({
        url: `${GL_ACCOUNTS_URL}/createglaccount`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["GL"],
    }),
    getGLById: builder.query({
      query: (id) => ({
        url: `${GL_ACCOUNTS_URL}/getglaccountbyid/${id}`,
        method: "GET",
      }),
      providesTags: ["GL"],
    }),
    updateGLAccountById: builder.mutation({
      query: ({ id, data }) => ({
        url: `${GL_ACCOUNTS_URL}/updateglaccountbyid/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["GL"],
    }),
  }),
});

export const {
  useGetAllGLAccountsQuery,
  useCreateGlMutation,
  useGetGLByIdQuery,
  useUpdateGLAccountByIdMutation,
} = glApiSlice;
