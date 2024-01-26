import { apiSlice } from "../apiSlice";
const DAILYPACKHOUSEHEADER_URL = "/api/v1/production/dailypackhouseheaders";

export const dailyPackhouseHeadersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createDailyProductionHeader: builder.mutation({
      query: (data) => ({
        url: `${DAILYPACKHOUSEHEADER_URL}/createdailypackhouseheader`,
        method: "POST",
        body: data,
      }),
    }),

    getAllDailyPackHouseHeaders: builder.query({
      query: (data) => ({
        url: `${DAILYPACKHOUSEHEADER_URL}/getalldaiypackhouseheaders`,
        method: "GET",
        body: data,
      }),
    }),
    getAllProductionHeadersInTransit: builder.query({
      query: (data) => ({
        url: `${DAILYPACKHOUSEHEADER_URL}/getallproductionheaders`,
        method: "GET",
        body: data,
      }),
    }),
    getAllProductionHeadersInTransit: builder.query({
      query: (data) => ({
        url: `${DAILYPACKHOUSEHEADER_URL}/getallproductionheadersintransit`,
        method: "GET",
        body: data,
      }),
    }),
    getAllPostedProductionHeaders: builder.query({
      query: (data) => ({
        url: `${DAILYPACKHOUSEHEADER_URL}/getallpostedproductionheaders`,
        method: "GET",
        body: data,
      }),
    }),
  }),
});

export const {
  useCreateDailyProductionHeaderMutation,
  useGetAllDailyPackHouseHeadersQuery,
} = dailyPackhouseHeadersApiSlice;
