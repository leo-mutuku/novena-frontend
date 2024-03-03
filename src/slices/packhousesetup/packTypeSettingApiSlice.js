import { apiSlice } from "../apiSlice";
const PACKTYPE_SETTINGS = "/api/v1/packtypesettings/packtype";

export const packTypeSettingApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    tagTypes: ["packtypesettings"],
    getAllPackType: builder.query({
      query: (data) => ({
        url: `${PACKTYPE_SETTINGS}/getallpacktype`,
        method: "GET",
        body: data,
      }),
      providesTags: ["packtypesettings"],
    }),
    getPackTypeById: builder.query({
      query: (id) => ({
        url: `${PACKTYPE_SETTINGS}/getpacktypebyid/${id}`,
        method: "GET",
      }),
      providesTags: ["packtypesettings"],
    }),
    createPackType: builder.mutation({
      query: (data) => ({
        url: `${PACKTYPE_SETTINGS}/createpacktype`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["packtypesettings"],
    }),
    updatePackType: builder.mutation({
      query: ({ id, data }) => ({
        url: `${PACKTYPE_SETTINGS}/updatepacktypebyid/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["packtypesettings"],
    }),
  }),
});

export const {
  useUpdatePackTypeMutation,
  useCreatePackTypeMutation,
  useGetPackTypeByIdQuery,
  useGetAllPackTypeQuery,
} = packTypeSettingApiSlice;
