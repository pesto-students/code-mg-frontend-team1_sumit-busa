import "./App.css";
import StudentAssignmentScreen from "./components/student/StudentAssignmentScreen";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<h1>Home</h1>}></Route>
          <Route
            path="/student/assignment"
            element={<StudentAssignmentScreen />}
          ></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
