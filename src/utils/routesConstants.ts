export const ROOT_ROUTE = '/';
export const LOGIN_ROUTE = '/login';
export const REGISTER_ROUTE = '/register';
//teacher
export const TEACHER_CREATE_ASSIGNMENT_ROUTE =
  "/teacher/:classId/createassignment";
export const TEACHER_ASSIGNMENT_ROUTE = "/teacher/:classId/assignment";
export const TEACHER_DASHBOARD_ROUTE = "/teacher/";
export const TEACHER_SUBMISSIONS_ROUTE = "/teacher/:assignmentId/submission";
export const TEACHER_SUBMISSION_ROUTE = "/teacher/submission/:submissionId";

//student
export const STUDENT_DASHBOARD_ROUTE = '/student/dashboard';
export const STUDENT_CLASS_ROUTE = "/student/class/:classId";
export const STUDENT_ASSIGNMENT_ROUTE = "/student/assignment/:assignmentId";

//admin
export const ADMIN_DASHBOARD_ROUTE = '/admin/dashboard';


