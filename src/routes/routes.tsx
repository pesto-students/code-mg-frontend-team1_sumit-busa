import { Routes, Route, Navigate } from "react-router-dom";
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
import { getRole, isLoggedIn, Role } from "../utils/tokensHelper";
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

      <Route path="/" element={<></>} />
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
        path={STUDENT_ASSIGNMENT_ROUTE}
        element={
          <ProtectedRoute role="Student">
            <StudentAssignmentScreen />
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
