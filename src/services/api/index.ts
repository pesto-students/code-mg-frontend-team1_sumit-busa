import { LoginPayload, LoginResponse } from "../../models/api.interface";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Assignment } from "./api.interface";

export const api = createApi({
  reducerPath: "codeMgAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}/api`,
    prepareHeaders: (headers) => {
      const token = localStorage.token || "";
      headers.set("Access-Control-Allow-Origin", "*");
      headers.set("Authorization", "Bearer " + token);

      return headers;
    },
  }),
  tagTypes: [],
  keepUnusedDataFor: 60 * 60,
  refetchOnMountOrArgChange: true,

  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginPayload>({
      query: (LoginPayload) => ({
        url: `auth/login`,
        method: "POST",
        body: LoginPayload,
      }),
    }),

    assignment: builder.query<Assignment, number>({
      query: (id) => ({
        url: `assignment/${id}`,
      }),
    }),
  }),
});

export const { useLoginMutation, useAssignmentQuery } = api;

export default api;
