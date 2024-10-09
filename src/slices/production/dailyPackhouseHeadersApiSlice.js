import { apiSlice } from "../apiSlice";
const DAILYPACKHOUSEHEADER_URL = "/api/v1/production/dailypackhouseheaders";

export const dailyPackhouseHeadersApiSlice = apiSlice.injectEndpoints({
  tagTypes: ["dailypackhouseheader", "dailypackhouselines", "Store_items"],
  endpoints: (builder) => ({
    createDailyProductionHeader: builder.mutation({
      query: (data) => ({
        url: `${DAILYPACKHOUSEHEADER_URL}/createdailypackhouseheader`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [
        "dailypackhouseheader",
        "dailypackhouselines",
        "Store_items",
      ],
    }),
    generalDailyPackbypacktype: builder.mutation({
      query: (data) => ({
        url: `${DAILYPACKHOUSEHEADER_URL}/generaldailypackbypacktype`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [
        "dailypackhouseheader",
        "dailypackhouselines",
        "Store_items",
      ],
    }),

    getAllDailyPackHouseHeaders: builder.query({
      query: (data) => ({
        url: `${DAILYPACKHOUSEHEADER_URL}/getalldaiypackhouseheaders`,
        method: "GET",
        body: data,
      }),
      providesTags: [
        "dailypackhouseheader",
        "dailypackhouselines",
        "Store_items",
      ],
    }),
    getAllProductionHeadersInTransit: builder.query({
      query: (data) => ({
        url: `${DAILYPACKHOUSEHEADER_URL}/getallproductionheaders`,
        method: "GET",
        body: data,
      }),
      providesTags: [
        "dailypackhouseheader",
        "dailypackhouselines",
        "Store_items",
      ],
    }),
    getAllProductionHeadersInTransit: builder.query({
      query: (data) => ({
        url: `${DAILYPACKHOUSEHEADER_URL}/getallproductionheadersintransit`,
        method: "GET",
        body: data,
      }),
      providesTags: [
        "dailypackhouseheader",
        "dailypackhouselines",
        "Store_items",
      ],
    }),
  }),
});

export const {
  useCreateDailyProductionHeaderMutation,
  useGeneralDailyPackbypacktypeMutation,
  useGetAllDailyPackHouseHeadersQuery,
} = dailyPackhouseHeadersApiSlice;
