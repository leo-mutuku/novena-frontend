import { apiSlice } from "../apiSlice";
const REQUISITION_LINE = "/api/v1/payment/requisitionlines";

export const requisitionLineApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    tagTypes: ["requisitionLine"],
    createPaymentPurchase: builder.mutation({
      query: (data) => ({
        url: `${REQUISITION_LINE}/createrequisitionline`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["requisitionLine", "requisitionHeaders"],
    }),

    getAllRequisitionlineInProgressByHeaderId: builder.mutation({
      query: (data) => ({
        url: `${REQUISITION_LINE}/getallrequisitionlineinprogressbyheaderid`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["requisitionLine"],
    }),
    getAllPostedRequisitionlineByHeaderId: builder.mutation({
      query: (data) => ({
        url: `${REQUISITION_LINE}/getallrequisitionlineinprogressbyheaderid`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["requisitionLine", "requisitionHeaders"],
    }),
    getRequisitionLineById: builder.query({
      query: (id) => ({
        url: `${REQUISITION_LINE}/getrequisitionlinebyid/${id}`,
        method: "GET",
      }),
      providesTags: ["requisitionLine", "requisitionHeaders"],
    }),
  }),
});

export const {
  useCreatePaymentPurchaseMutation,
  useGetAllPaymentPurchaseQuery,
  useGetRequisitionLineByIdQuery,
} = requisitionLineApiSlice;
