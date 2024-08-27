import { apiSlice } from "../apiSlice";
const ROLES_URL = "/api/v1/administrator/userroles";

export const userRolesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    tagTypes: ["userroles"],

    addUserRoles: builder.mutation({
      query: (data) => ({
        url: `${ROLES_URL}/adduserroles`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Staff"],
    }),

    removeUserRoles: builder.mutation({
      query: (data) => ({
        url: `${ROLES_URL}/removeuserroles`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["userroles"],
    }),
  }),
});

export const { useAddUserRolesMutation, useRemoveUserRolesMutation } =
  userRolesApiSlice;
