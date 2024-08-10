import { apiSlice } from "../apiSlice";
const RETURNORDER_LINE = "/api/v1/sales/salesreturnorderlines";

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    tagTypes: ["Sales_orderLines"],

    getRurnOrderLineByHeaderId: builder.query({
      query: (header_id) => ({
        url: `${RETURNORDER_LINE}/getallsalesorderbylineid`,
        method: "GET",
        body: data,
      }),
      providesTags: ["Sales_orderLines"],
    }),
    getAllReturnOrdersLines: builder.query({
      query: (id) => ({
        url: `${RETURNORDER_LINE}/getreturnorderbylineId/${id}`,
        method: "GET",
      }),
      providesTags: ["Sales_orderLines"],
    }),
    getSalesLinesByHeaderId: builder.query({
      query: (id) => ({
        url: `${RETURNORDER_LINE}/getallsalesorderslinesbysalesordernumber/${id}`,
        method: "GET",
      }),
      providesTags: ["Sales_orderLines"],
    }),

    createRurnOrderLine: builder.mutation({
      query: (data) => ({
        url: `${RETURNORDER_LINE}/createreturnorderLine`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Sales_orderLines"],
    }),
  }),
});

export const {
  useGetAllReturnOrdersLinesQuery,
  useCreateRurnOrderLineMutation,
  useGetRurnOrderLineByHeaderIdQuery,
  useGetSalesLinesByHeaderIdQuery,
} = orderApiSlice;
