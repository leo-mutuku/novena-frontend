import { apiSlice } from "../apiSlice";
const PACKHOUSEPEOPLE_URL = "/api/v1/production/packhousepeople";

export const packHousePeopleApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllPackHousePeople: builder.query({
      query: (data) => ({
        url: `${PACKHOUSEPEOPLE_URL}/getallpackhousepeople`,
        method: "GET",
        body: data,
      }),
    }),
    createPackHousePerson: builder.mutation({
      query: (data) => ({
        url: `${PACKHOUSEPEOPLE_URL}/createpackhouseperson`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useCreatePackHousePersonMutation,
  useGetAllPackHousePeopleQuery,
} = packHousePeopleApiSlice;
