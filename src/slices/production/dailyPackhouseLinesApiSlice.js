import { apiSlice } from "../apiSlice";
const DAILYPACJHOUSE_URL = "/api/v1/production/dailypackhouselines";

export const dailyPackhouseLinesApiSlice = apiSlice.injectEndpoints({
  tagTypes: ["dailypackhouselines", "dailypackhouseheader", "Store_items"],
  endpoints: (builder) => ({
    createDailyPackhouseLine: builder.mutation({
      query: (data) => ({
        url: `${DAILYPACJHOUSE_URL}/createdailypackhouseline`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [
        "dailypackhouselines",
        "dailypackhouseheader",
        "Store_items",
      ],
    }),

    getAllDailyPackhouseLines: builder.query({
      query: (data) => ({
        url: `${DAILYPACJHOUSE_URL}/getallproductionheaders`,
        method: "GET",
        body: data,
      }),
      providesTags: [
        "dailypackhouselines",
        "dailypackhouseheader",
        "Store_items",
      ],
    }),
    getAllPostedDailyPackhouseLinest: builder.query({
      query: (data) => ({
        url: `${DAILYPACJHOUSE_URL}/getallproductionheaders`,
        method: "GET",
        body: data,
      }),
      providesTags: [
        "dailypackhouselines",
        "dailypackhouseheader",
        "Store_items",
      ],
    }),
    getAllDailyPackhouseLinesInTransit: builder.query({
      query: (data) => ({
        url: `${DAILYPACJHOUSE_URL}/getallproductionheadersintransit`,
        method: "GET",
        body: data,
      }),
      providesTags: [
        "dailypackhouselines",
        "dailypackhouseheader",
        "Store_items",
      ],
    }),
  }),
});

export const {
  useCreateDailyPackhouseLineMutation,
  useGetAllDailyPackhouseLinesQuery,
} = dailyPackhouseLinesApiSlice;
