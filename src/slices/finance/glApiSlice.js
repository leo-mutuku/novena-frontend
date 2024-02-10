import { apiSlice } from "../apiSlice";
const GL_ACCOUNTS_URL = "/api/v1/finance/glaccounts";

export const glApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllGLAccounts: builder.query({
      query: (data) => ({
        url: `${GL_ACCOUNTS_URL}/getallglaccounts`,
        method: "GET",
        body: data,
      }),
    }),
    createGl: builder.mutation({
      query: (data) => ({
        url: `${GL_ACCOUNTS_URL}/createglaccount`,
        method: "POST",
        body: data,
      }),
    }),
    getGLById: builder.query({
      query: (id) => ({
        url: `${GL_ACCOUNTS_URL}/getglaccountbyid/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetAllGLAccountsQuery,
  useCreateGlMutation,
  useGetGLByIdQuery,
} = glApiSlice;
