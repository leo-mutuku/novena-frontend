import { apiSlice } from "../apiSlice";
const PAYROLLSETUP_URL = "/api/v1/payroll/payrollsetups";

export const payrollSetupApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    tagTypes: ["Payroll_setup"],
    createStaffPayrollSetup: builder.mutation({
      query: (data) => ({
        url: `${PAYROLLSETUP_URL}/createstaffpayrollsetup`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Payroll_setup"],
    }),

    getAllStaffPayrollSetup: builder.query({
      query: (data) => ({
        url: `${PAYROLLSETUP_URL}/getallstaffpayrollsetup`,
        method: "GET",
        body: data,
      }),
      providesTags: ["Payroll_setup"],
    }),
    getAllpackHousestaffPayrollSetup: builder.query({
      query: (data) => ({
        url: `${PAYROLLSETUP_URL}/getallpackhousestaffpayrollsetup`,
        method: "GET",
        body: data,
      }),
      providesTags: ["Payroll_setup"],
    }),

    getStaffPayrollSetupById: builder.query({
      query: (id) => ({
        url: `${PAYROLLSETUP_URL}/getstaffpayrollsetupbyid/${id}`,
        method: "GET",
      }),
      providesTags: ["Payroll_setup"],
    }),

    updateStaffPayrollSetup: builder.mutation({
      query: (data) => ({
        url: `${PAYROLLSETUP_URL}/updatestaffpayrollsetup`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Payroll_setup"],
    }),
  }),
});

export const {
  useGetAllpackHousestaffPayrollSetupQuery,
  useCreateStaffPayrollSetupMutation,
  useGetAllStaffPayrollSetupQuery,
  useGetStaffPayrollSetupByIdQuery,
  useUpdateStaffPayrollSetupMutation,
} = payrollSetupApiSlice;
