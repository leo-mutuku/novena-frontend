import { apiSlice } from "../apiSlice";
const STAFF_URL = "/api/v1/ict/biometric";

export const biometricApliSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    tagTypes: ["Biometric"],

    dailyAttendance: builder.mutation({
      query: (data) => ({
        url: `${STAFF_URL}/dailyattendance`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Biometric"],
    }),
    attandanceReport: builder.mutation({
      query: (data) => ({
        url: `${STAFF_URL}/attandancereport`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Biometric"],
    }),
  }),
});

export const { useDailyAttendanceMutation, useAttandanceReportMutation } =
  biometricApliSlice;
