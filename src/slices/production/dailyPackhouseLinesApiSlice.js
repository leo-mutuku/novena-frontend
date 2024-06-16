import { apiSlice } from "../apiSlice";
const DAILYPACJHOUSE_URL = "/api/v1/production/dailypackhouselines";

export const dailyPackhouseLinesApiSlice = apiSlice.injectEndpoints({
  tagTypes: ["dailypackhouselines"],
  endpoints: (builder) => ({
    createDailyPackhouseLine: builder.mutation({
      query: (data) => ({
        url: `${DAILYPACJHOUSE_URL}/createdailypackhouseline`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["dailypackhouselines"],
    }),

    getAllDailyPackhouseLines: builder.query({
      query: (data) => ({
        url: `${DAILYPACJHOUSE_URL}/getallproductionheaders`,
        method: "GET",
        body: data,
      }),
      providesTags: ["dailypackhouselines"],
    }),
    getAllPostedDailyPackhouseLinest: builder.query({
      query: (data) => ({
        url: `${DAILYPACJHOUSE_URL}/getallproductionheaders`,
        method: "GET",
        body: data,
      }),
      providesTags: ["dailypackhouselines"],
    }),
    getAllDailyPackhouseLinesInTransit: builder.query({
      query: (data) => ({
        url: `${DAILYPACJHOUSE_URL}/getallproductionheadersintransit`,
        method: "GET",
        body: data,
      }),
      providesTags: ["dailypackhouselines"],
    }),
  }),
});

export const {
  useCreateDailyPackhouseLineMutation,
  useGetAllDailyPackhouseLinesQuery,
} = dailyPackhouseLinesApiSlice;
