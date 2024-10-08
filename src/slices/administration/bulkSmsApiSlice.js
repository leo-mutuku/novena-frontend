import { apiSlice } from "../apiSlice";
const STAFF_URL = "/api/v1/administrator/bulksms";

export const bulkSmsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    tagTypes: ["bulksms"],
    bulkySMS: builder.mutation({
      query: (data) => ({
        url: `${STAFF_URL}/sms`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["bulksms"],
    }),
    smsBalance: builder.mutation({
      query: (data) => ({
        url: `${STAFF_URL}/smsbalance`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["bulksms"],
    }),
    singleSMS: builder.mutation({
      query: (data) => ({
        url: `${STAFF_URL}/singlesms`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["bulksms"],
    }),
  }),
});

export const {
  useBulkySMSMutation,
  useSmsBalanceMutation,
  useSingleSMSMutation,
} = bulkSmsApiSlice;
