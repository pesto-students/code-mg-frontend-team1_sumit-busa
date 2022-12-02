import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "../components/Login";
import {
  LOGIN_ROUTE,
  REGISTER_ROUTE,
  STUDENT_ASSIGNMENT_ROUTE,
  TEACHER_ASSIGNMENT_ROUTE,
  TEACHER_CREATE_ASSIGNMENT_ROUTE,
  TEACHER_DASHBOARD_ROUTE,
  TEACHER_SUBMISSIONS_ROUTE,
} from "../utils/routesConstants";
import { isPresentLocalStorageTokens } from "../utils/tokensHelper";
import Register from "../components/Register";
import CreateAssignment from "../components/teacher/CreateAssignment";
import TeacherAssignment from "../components/teacher/TeacherAssignment";
import TeacherDashboard from "../components/teacher/TeacherDashboard";
import TeacherSubmissions from "../components/teacher/TeacherSubmissions";
import PersistentDrawerLeft from "../components/student/PersistentDrawer";
import StudentAssignmentScreen from "../components/StudentAssignmentScreen";

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

      <Route path="/" element={<Login />} />
      <Route path={LOGIN_ROUTE} element={<Login />} />
      <Route path={REGISTER_ROUTE} element={<Register />} />
      <Route path="/teacher" element={<TeacherDashboard />} />
      <Route path={TEACHER_DASHBOARD_ROUTE} element={<TeacherDashboard />} />
      <Route path={TEACHER_ASSIGNMENT_ROUTE} element={<TeacherAssignment />} />
      <Route
        path={TEACHER_CREATE_ASSIGNMENT_ROUTE}
        element={<CreateAssignment />}
      />
      <Route
        path={TEACHER_SUBMISSIONS_ROUTE}
        element={<TeacherSubmissions />}
      />

      <Route
        path={STUDENT_ASSIGNMENT_ROUTE}
        element={<StudentAssignmentScreen />}
      />
    </Routes>
  );
}

export default MyRoutes;
