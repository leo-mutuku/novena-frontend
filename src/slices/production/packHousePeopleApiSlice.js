import { apiSlice } from "../apiSlice";
const PACKHOUSEPEOPLE_URL = "/api/v1/production/packhousepeople";

export const packHousePeopleApiSlice = apiSlice.injectEndpoints({
  tagsType: ["packhousepeople"],
  endpoints: (builder) => ({
    getAllPackHousePeople: builder.query({
      query: (data) => ({
        url: `${PACKHOUSEPEOPLE_URL}/getallpackhousepeople`,
        method: "GET",
        body: data,
      }),
      providesTags: ["packhousepeople"],
    }),
    getStatement: builder.mutation({
      query: (data) => ({
        url: `${PACKHOUSEPEOPLE_URL}/getstatement`,
        method: "POST",
        body: data,
      }),
      providesTags: ["packhousepeople"],
    }),
    createPackHousePerson: builder.mutation({
      query: (data) => ({
        url: `${PACKHOUSEPEOPLE_URL}/createpackhouseperson`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["packhousepeople"],
    }),
    calculateWage: builder.mutation({
      query: (data) => ({
        url: `${PACKHOUSEPEOPLE_URL}/calculatewage`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["packhousepeople"],
    }),
    deletePackhousePerson: builder.mutation({
      query: (id) => ({
        url: `${PACKHOUSEPEOPLE_URL}/deletepackhouseperson/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["packhousepeople"],
    }),
  }),
});

export const {
  useCalculateWageMutation,
  useGetStatementMutation,
  useCreatePackHousePersonMutation,
  useGetAllPackHousePeopleQuery,
  useDeletePackhousePersonMutation,
} = packHousePeopleApiSlice;
