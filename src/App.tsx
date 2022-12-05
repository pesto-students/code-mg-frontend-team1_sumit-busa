import "./App.css";
import AdminDashboard from "./components/admin/AdminDashboard";
import PersistentDrawerLeft from "./components/student/PersistentDrawer";
import StudentAssignmentScreen from "./components/StudentAssignmentScreen";
import StudentDashboard from "./components/student/StudentDashboard";
import CreateAssignment from "./components/teacher/CreateAssignment";
import TeacherAssignment from "./components/teacher/TeacherAssignment";
import TeacherDashboard from "./components/teacher/TeacherDashboard";
import TeacherSubmissions from "./components/teacher/TeacherSubmissions";
import MyRoutes from "./routes/routes";
function App() {
  return (
    <div className="App">

      <PersistentDrawerLeft />
      <MyRoutes />
      {/* <TeacherDashboard /> */}
      {/* <TeacherAssignment /> */}
      {/* <CreateAssignment /> */}
      {/* <TeacherSubmissions /> */}
      {/* <AdminDashboard /> */}
      {/* <StudentDashboard/> */}
      {/* <StudentAssignmentScreen /> */}
    </div>
  );
}

export default App;
