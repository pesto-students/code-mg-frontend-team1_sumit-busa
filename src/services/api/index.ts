import { LoginPayload, LoginResponse } from "../../models/api.interface";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AddStudentRequest, Assignment, ClassRequest, ClassResponse,AssignmentListStudent, AssignmentListTeacher } from "./api.interface";

export const api = createApi({
  reducerPath: "codeMgAPI",
  baseQuery: fetchBaseQuery({
    // baseUrl: `${process.env.REACT_APP_BASE_URL}/api`,
    baseUrl: "http://localhost:8080/api",
    prepareHeaders: (headers) => {
      // const token = localStorage.token || "";
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ0ZWFjaGVyQHRlc3QuY29tIiwiZnVsbE5hbWUiOiJ0ZWFjaGVyIHVzZXIiLCJyb2xlIjoiVGVhY2hlciIsImlhdCI6MTY3MDE0MzY2MywiZXhwIjoxNjcwMjMwMDYzfQ.E56V2nlsWD3bCgKavoIeVYs5MyF1V26vj4WrCxIf0_w";
      headers.set("Access-Control-Allow-Origin", "*");
      headers.set("Authorization", "Bearer " + token);
      // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ0ZWFjaGVyQHRlc3QuY29tIiwiZnVsbE5hbWUiOiJ0ZWFjaGVyIHVzZXIiLCJyb2xlIjoiVGVhY2hlciIsImlhdCI6MTY3MDA1Njk2NSwiZXhwIjoxNjcwMTQzMzY1fQ.WKIbbgLa7wtTCen3smaUjrsG0KRHTmugnH80nE4gq5Q
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

    createAssignment: builder.mutation({
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
    addStudent: builder.mutation<any,AddStudentRequest>({
      query: (student) => ({
        url: "class/add-students",
        method: "POST",
        body: student,
      }),
      invalidatesTags:['class']
    }),
    getClass: builder.query<ClassResponse[], void>({
      query: () => ({ url: "/class" }),
      providesTags: ["class"],
    }),
    getAllAssignmentsTeacher : builder.query<AssignmentListTeacher[],number>({
      query:(id)=>({url:`/teacher/assignment?classId=${id}`})
    }),
    getAllAssignmentsStudent : builder.query<AssignmentListStudent[],number>({
      query:(id)=>({url:`/student/assignment?classId=${id}`})
    }),
    getAllClassesStudent : builder.query<ClassResponse[],void>({
      query: () => ({ url: "/class" }),
      providesTags: ["class"],
    })
  }),
  

});

export const {
  useLoginMutation,
  useAssignmentQuery,
  useGetClassQuery,//done
  useAddStudentMutation,//done
  useCreateClassMutation,//done
  useCreateAssignmentMutation,
  useGetAllAssignmentsTeacherQuery,
  useGetAllAssignmentsStudentQuery,
  useGetAllClassesStudentQuery

  // getassignment for both teacher and student
  // get list of classes for student

} = api;

export default api;
