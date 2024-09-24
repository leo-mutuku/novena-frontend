import { apiSlice } from "../apiSlice";
const STAFF_URL = "/api/v1/administration/staff";

export const staffApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    tagTypes: ["Staff"],
    getAllStaff: builder.query({
      query: (data) => ({
        url: `${STAFF_URL}/getallstaff`,
        method: "GET",
        body: data,
      }),
      providesTags: ["Staff"],
    }),
    general: builder.query({
      query: (data) => ({
        url: `${STAFF_URL}/general`,
        method: "GET",
        body: data,
      }),
      providesTags: ["Staff"],
    }),
    production: builder.query({
      query: (data) => ({
        url: `${STAFF_URL}/production`,
        method: "GET",
        body: data,
      }),
      providesTags: ["Staff"],
    }),

    getAllStaffById: builder.query({
      query: (id) => ({
        url: `${STAFF_URL}/getstaffbyid/${id}`,
        method: "GET",
      }),
      providesTags: ["Staff"],
    }),
    validateStaffBiWeeklyRegister: builder.mutation({
      query: (data) => ({
        url: `${STAFF_URL}/validatestaffbiweeklyregister`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Staff"],
    }),
    validateStaffBiWeeklyBiometric: builder.mutation({
      query: (data) => ({
        url: `${STAFF_URL}/validatestaffbiweeklybiometric`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Staff"],
    }),
    validateBales: builder.mutation({
      query: (data) => ({
        url: `${STAFF_URL}/validatebales`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Staff"],
    }),
    createStaff: builder.mutation({
      query: (data) => ({
        url: `${STAFF_URL}/createstaff`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Staff"],
    }),
    updateSalesFixedRate: builder.mutation({
      query: (data) => ({
        url: `${STAFF_URL}/updatesalesfixedrate`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Staff"],
    }),
    updateSalePeopleSalary: builder.mutation({
      query: (data) => ({
        url: `${STAFF_URL}/updatesalepeoplesalary`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Staff"],
    }),
    updateStaffBiWeekly: builder.mutation({
      query: (data) => ({
        url: `${STAFF_URL}/updatestaffbiweekly`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Staff"],
    }),
    updateStaff: builder.mutation({
      query: ({ id, data }) => ({
        url: `${STAFF_URL}/updatestaffbyid/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Staff"],
    }),
    deactivateStaff: builder.mutation({
      query: ({ id }) => ({
        url: `${STAFF_URL}/deactivatestaff/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["Staff"],
    }),
    getAllBiweeklyStaff: builder.query({
      query: (data) => ({
        url: `${STAFF_URL}/getallbiweeklystaff`,
        method: "GET",
        body: data,
      }),
      providesTags: ["Staff"],
    }),
    sales: builder.query({
      query: (data) => ({
        url: `${STAFF_URL}/sales`,
        method: "GET",
        body: data,
      }),
      providesTags: ["Staff"],
    }),
  }),
});

export const {
  useValidateStaffBiWeeklyBiometricMutation,
  useValidateStaffBiWeeklyRegisterMutation,
  useUpdateSalePeopleSalaryMutation,
  useValidateBalesMutation,
  useUpdateStaffBiWeeklyMutation,
  useUpdateSalesFixedRateMutation,
  useGetAllBiweeklyStaffQuery,
  useGetAllStaffQuery,
  useCreateStaffMutation,
  useUpdateStaffMutation,
  useGetAllStaffByIdQuery,
  useGeneralQuery,
  useProductionQuery,
  useDeactivateStaffMutation,
  useSalesQuery,
} = staffApiSlice;
