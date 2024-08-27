import { apiSlice } from "../apiSlice";
const SUPPLIERS_URL = "/api/v1/administration/suppliers";

export const staffApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllSuppliers: builder.query({
      tagTypes: ["Supplier"],
      query: (data) => ({
        url: `${SUPPLIERS_URL}/getallsuppliers`,
        method: "GET",
        body: data,
      }),
      providesTags: ["Supplier"],
    }),
    getSupplierById: builder.query({
      query: (id) => ({
        url: `${SUPPLIERS_URL}/getsupplierbyid/${id}`,
        method: "GET",
      }),
      providesTags: ["Supplier"],
    }),
    createSupplier: builder.mutation({
      query: (data) => ({
        url: `${SUPPLIERS_URL}/createsupplier`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Supplier"],
    }),
    getSupplierBalance: builder.mutation({
      query: (data) => ({
        url: `${SUPPLIERS_URL}/getsupplierbalance`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Supplier"],
    }),
    updateSupplierById: builder.mutation({
      query: ({ id, data }) => ({
        url: `${SUPPLIERS_URL}/updatesupplierbyid/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Supplier"],
    }),
  }),
});

export const {
  useGetSupplierBalanceMutation,
  useGetAllSuppliersQuery,
  useCreateSupplierMutation,
  useGetSupplierByIdQuery,
  useUpdateSupplierByIdMutation,
} = staffApiSlice;
