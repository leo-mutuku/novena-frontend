import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({ baseUrl: "http://localhost:3000" });

export const apiSlice = createApi({
  baseQuery,
  prepareHeaders: (headers, { getState }) => {
    console.log("prepareHeaders is called");
    const token = getState().auth.data.body.Token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
  tagTypes: ["User"],
  endpoints: (builder) => ({}),
});
