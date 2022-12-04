import { Button, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login] = useLoginMutation();
  const navigate = useNavigate();

  const handleAdminLogin = () => {
    alert("Coming soon");
  };

  const handleTeacherLogin = () => {
    const email = "teacher@test.com";
    const password = "12345678";
    setEmail(email);
    setPassword(password);
    handleLogin(email, password);
  };

  const handleStudentLogin = () => {
    const email = "student@test.com";
    const password = "12345678";
    setEmail(email);
    setPassword(password);
    handleLogin(email, password);
  };

  const handleLogin = async (email: string, password: string) => {
    try {
      const result = await login({ email, password }).unwrap();
      localStorage.token = result.token;
      localStorage.role = result.role;
      if (result.role === "Student") {
        navigate("/student");
      } else if (result.role === "Teacher") {
        console.log("redirect should workd");
        navigate("/teacher");
      } else {
        navigate("/");
      }
    } catch (ex: any) {
      console.log(ex.data);
      alert(ex.error || ex.data.message);
    }
  };
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ height: "70vh" }}
    >
      <Grid container spacing={5} direction="column" item md={6}>
        <Grid item>
          <Typography variant="h2">SIGN IN</Typography>
        </Grid>
        <Grid item>
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
          />
        </Grid>

        <Grid item>
          <TextField
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            variant="outlined"
          />
        </Grid>

        <Grid item>
          <Button
            variant="contained"
            onClick={() => handleLogin(email, password)}
          >
            Login
          </Button>
        </Grid>

        <Grid
          item
          container
          spacing={2}
          justifyContent="center"
          alignItems="center"
          direction="row"
        >
          <Grid item>
            <Button variant="contained" onClick={handleAdminLogin}>
              Demo Admin Login
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={handleTeacherLogin}>
              Demo Teacher Login
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={handleStudentLogin}>
              Demo Student Login
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Login;
function useRouter() {
  throw new Error("Function not implemented.");
}

