import { apiSlice } from "../apiSlice";
const USERS_URL = "/api/v1/administration/users";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    tagTypes: ["Users"],
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Users"],
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
      providesTags: ["Users"],
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/signup`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),
    updateUserById: builder.mutation({
      query: ({ id, data }) => ({
        url: `${USERS_URL}/updateuserbyid/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),
    registerUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/register`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),
    getUser: builder.query({
      query: (data) => ({
        url: `${USERS_URL}/profile/${data.name}`,
        method: "GET",
        body: data,
      }),
      providesTags: ["Users"],
    }),
    getUsers: builder.query({
      query: () => ({
        url: `${USERS_URL}/getallusers`,
        method: "GET",
      }),
      providesTags: ["Users"],
    }),

    getUserById: builder.query({
      query: (id) => ({
        url: `${USERS_URL}/getuserbyid/${id}`,
        method: "GET",
      }),
      providesTags: ["Users"],
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useUpdateUserMutation,
  useUpdateUserByIdMutation,
  useGetUserQuery,
  useRegisterUserMutation,
  useGetUsersQuery,
  useGetUserByIdQuery,
} = userApiSlice;
