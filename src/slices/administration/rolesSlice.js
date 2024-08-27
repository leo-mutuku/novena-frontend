import { apiSlice } from "../apiSlice";
const ROLES_URL = "/api/v1/administrator/roles";

export const staffApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    tagTypes: ["roles"],
    getAllRoles: builder.query({
      query: (data) => ({
        url: `${ROLES_URL}/getallroles`,
        method: "GET",
        body: data,
      }),
      providesTags: ["roles"],
    }),

    getRoleById: builder.query({
      query: (id) => ({
        url: `${ROLES_URL}/getrolebyid/${id}`,
        method: "GET",
      }),
      providesTags: ["roles"],
    }),
    createroles: builder.mutation({
      query: (data) => ({
        url: `${ROLES_URL}/createrole`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Staff"],
    }),
    updateRoleById: builder.mutation({
      query: ({ id, data }) => ({
        url: `${ROLES_URL}/updaterole/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["roles"],
    }),
    deactivateroles: builder.mutation({
      query: ({ id }) => ({
        url: `${ROLES_URL}/deactivatestaff/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["roles"],
    }),
  }),
});

export const {
  useGetAllRolesQuery,
  useCreaterolesMutation,
  useGetRoleByIdQuery,
  useUpdateRoleByIdMutation,
  useDeactivaterolesMutation,
} = staffApiSlice;
