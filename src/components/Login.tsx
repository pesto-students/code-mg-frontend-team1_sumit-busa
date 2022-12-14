import { Button, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../services/api";
import { parseJwt } from "../utils/helper";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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
      setIsLoading(true);
      const { token, role } = await login({ email, password }).unwrap();
      const data = parseJwt(token);
      localStorage.token = token;
      localStorage.role = role;
      localStorage.email = data.email;
      localStorage.name = data.fullName;

      if (role === "Student") {
        navigate("/student");
      } else if (role === "Teacher") {
        console.log("redirect should workd");
        navigate("/teacher");
      } else {
        navigate("/");
      }
    } catch (ex: any) {
      console.log(ex.data);
      alert(ex.error || ex.data.message);
    }
    setIsLoading(false);
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
            disabled={isLoading}
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
            <Button
              variant="contained"
              disabled={isLoading}
              onClick={handleAdminLogin}
            >
              Demo Admin Login
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              disabled={isLoading}
              onClick={handleTeacherLogin}
            >
              Demo Teacher Login
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              disabled={isLoading}
              onClick={handleStudentLogin}
            >
              Demo Student Login
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Login;
