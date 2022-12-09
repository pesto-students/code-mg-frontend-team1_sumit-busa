import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../components/Login";
import {
  LOGIN_ROUTE,
  REGISTER_ROUTE,
  STUDENT_ASSIGNMENT_ROUTE,
  STUDENT_CLASS_ROUTE,
  STUDENT_DASHBOARD_ROUTE,
  TEACHER_ASSIGNMENT_ROUTE,
  TEACHER_CREATE_ASSIGNMENT_ROUTE,
  TEACHER_DASHBOARD_ROUTE,
  TEACHER_SUBMISSIONS_ROUTE,
  TEACHER_SUBMISSION_ROUTE,
} from "../utils/routesConstants";
import { getRole, isLoggedIn, Role } from "../utils/tokensHelper";
import Register from "../components/Register";
import CreateAssignment from "../components/teacher/CreateAssignment";
import TeacherAssignment from "../components/teacher/TeacherAssignment";
import TeacherDashboard from "../components/teacher/TeacherDashboard";
import TeacherSubmissions from "../components/teacher/TeacherSubmissions";
import PersistentDrawerLeft from "../components/student/PersistentDrawer";
import StudentDashboard from "../components/student/StudentDashboard";
import StudentClass from "../components/student/StudentClass";
import { Suspense } from "react";
import React from "react";
import TeacherSubmission from "../components/teacher/TeacherSubmission";
const StudentAssignmentScreen = React.lazy(
  () => import("../components/StudentAssignmentScreen")
);

function MyRoutes() {
  // const [user,setUser] = useState('T');
  // const routesConfig = {
  //   landing: {
  //     path: ROOT_ROUTE,
  //     component: Landing,
  //     exact: true,
  //     privateRoute: false
  //   },
  //   login: {
  //     path: LOGIN_ROUTE,
  //     component: Login,
  //     exact: true,
  //     privateRoute: false
  //   },
  //   home: {
  //     path: [HOME_ROUTE, DASHBOARD_ROUTE,SUBMISSIONS_ROUTE],
  //     component: Home,
  //     exact: true,
  //     privateRoute: true
  //   },
  // };
  // useEffect(()=>{
  //   switch(user){
  //   case 'T':

  // }
  // },[user]);

  // if(isPresentLocalStorageTokens()){
  // }
  // useEffect(() => {
  //     const isUserPresent = isPresentLocalStorageTokens();
  // },[]);

  return (
    <Routes>
      {/* <Route path={ROOT_ROUTE} element={}/> */}

      <Route path="/" element={<Navigate to={"/login"} />} />
      <Route path={LOGIN_ROUTE} element={<Login />} />
      <Route path={REGISTER_ROUTE} element={<Register />} />
      <Route
        path="/teacher"
        element={
          <ProtectedRoute role="Teacher">
            <TeacherDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path={TEACHER_DASHBOARD_ROUTE}
        element={
          <ProtectedRoute role="Teacher">
            <TeacherDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path={TEACHER_ASSIGNMENT_ROUTE}
        element={
          <ProtectedRoute role="Teacher">
            <TeacherAssignment />
          </ProtectedRoute>
        }
      />
      <Route
        path={TEACHER_CREATE_ASSIGNMENT_ROUTE}
        element={
          <ProtectedRoute role="Teacher">
            <CreateAssignment />
          </ProtectedRoute>
        }
      />
      <Route
        path={TEACHER_SUBMISSIONS_ROUTE}
        element={
          <ProtectedRoute role="Teacher">
            <TeacherSubmissions />
          </ProtectedRoute>
        }
      />
      <Route
        path={TEACHER_SUBMISSION_ROUTE}
        element={
          <ProtectedRoute role="Teacher">
            <TeacherSubmission />
          </ProtectedRoute>
        }
      />
      {/* student routes */}
      <Route path="/student" element={<StudentDashboard />} />

      <Route path={STUDENT_DASHBOARD_ROUTE} element={<StudentDashboard />} />
      <Route path={STUDENT_CLASS_ROUTE} element={<StudentClass />} />

      <Route
        path={STUDENT_ASSIGNMENT_ROUTE}
        element={
          <ProtectedRoute role="Student">
            <Suspense fallback={<div>Loading...</div>}>
              <StudentAssignmentScreen />
            </Suspense>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default MyRoutes;

const ProtectedRoute = (props: {
  role?: Role;
  children: JSX.Element;
  redirectTo?: string;
}) => {
  isLoggedIn();
  const role = getRole();
  const redirectTo = props.redirectTo ? props.redirectTo : "/login";

  const isAuthorized = props.role ? props.role === role : true;
  const isAuthenticated = isLoggedIn() && isAuthorized;

  console.log({ isAuthenticated });
  return isAuthenticated ? props.children : <Navigate to={redirectTo} />;
};
