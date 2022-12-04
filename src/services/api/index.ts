import { LoginPayload, LoginResponse } from "../../models/api.interface";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  AddStudentRequest,
  Assignment,
  ClassRequest,
  ClassResponse,
  CreateAssignment,
} from "./api.interface";

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
  tagTypes: ["class"],
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
        url: `student/assignment/${id}`,
      }),
    }),
    createAssignment: builder.mutation<void, CreateAssignment>({
      query: (assignment) => ({
        url: "/assignment",
        method: "POST",
        body: assignment,
      }),
    }),

    createClass: builder.mutation<any, ClassRequest>({
      query: (newclass) => ({
        url: "/class",
        method: "POST",
        body: newclass,
      }),
      invalidatesTags: ["class"],
    }),
    addStudent: builder.mutation<any, AddStudentRequest>({
      query: (student) => ({
        url: "class/add-students",
        method: "POST",
        body: student,
      }),
      invalidatesTags: ["class"],
    }),
    getClass: builder.query<ClassResponse[], void>({
      query: () => ({ url: "/class" }),
      providesTags: ["class"],
    }),
  }),
});

export const {
  useLoginMutation,
  useAssignmentQuery,
  useGetClassQuery,
  useAddStudentMutation,
  useCreateClassMutation,
  useCreateAssignmentMutation,
} = api;

export default api;
