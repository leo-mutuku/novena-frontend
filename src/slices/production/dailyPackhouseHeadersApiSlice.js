import { apiSlice } from "../apiSlice";
const DAILYPACKHOUSEHEADER_URL = "/api/v1/production/dailypackhouseheaders";

export const dailyPackhouseHeadersApiSlice = apiSlice.injectEndpoints({
  tagTypes: ["dailypackhouseheader"],
  endpoints: (builder) => ({
    createDailyProductionHeader: builder.mutation({
      query: (data) => ({
        url: `${DAILYPACKHOUSEHEADER_URL}/createdailypackhouseheader`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["dailypackhouseheader"],
    }),

    getAllDailyPackHouseHeaders: builder.query({
      query: (data) => ({
        url: `${DAILYPACKHOUSEHEADER_URL}/getalldaiypackhouseheaders`,
        method: "GET",
        body: data,
      }),
      providesTags: ["dailypackhouseheader"],
    }),
    getAllProductionHeadersInTransit: builder.query({
      query: (data) => ({
        url: `${DAILYPACKHOUSEHEADER_URL}/getallproductionheaders`,
        method: "GET",
        body: data,
      }),
      providesTags: ["dailypackhouseheader"],
    }),
    getAllProductionHeadersInTransit: builder.query({
      query: (data) => ({
        url: `${DAILYPACKHOUSEHEADER_URL}/getallproductionheadersintransit`,
        method: "GET",
        body: data,
      }),
      providesTags: ["dailypackhouseheader"],
    }),
  }),
});

export const {
  useCreateDailyProductionHeaderMutation,
  useGetAllDailyPackHouseHeadersQuery,
} = dailyPackhouseHeadersApiSlice;
