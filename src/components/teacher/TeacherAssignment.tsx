import {
  Alert,
  Button,
  Card,
  Grid,
  IconButton,
  Snackbar,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from 'react-router-dom';

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import "./style.css";
function TeacherAssignment() {
  let navigate = useNavigate();

  const handleClickOpen = () => {
    navigate('../teacher/createassignment')
    //send to create assignment page
  };

  return (
    <div className="mainContainer">
      <Grid container>
        <Grid item xs={12} textAlign="end">
          <Button
            variant="contained"
            onClick={handleClickOpen}
            sx={{ marginRight: 3 }}
          >
            New Assignment
          </Button>
        </Grid>
      </Grid>
      <Grid container>
        <Grid sm={12} md={6} lg={4} item textAlign={"left"}>
          <Card sx={{ margin: 3, p: 2 }}>
            <Typography variant="h5" sx={{ m: 1 }}>
              Assignment 1
            </Typography>
            <Typography variant="body1">created on : 1st Nov 2022</Typography>
            <Typography variant="body1">Due Date: 10st Nov 2022</Typography>
            <Button variant="outlined" sx={{ mt: 3 }} onClick={()=>navigate('../teacher/submission')}>
              30 Submission
            </Button>
          </Card>
        </Grid>
      </Grid>
      {/* <InviteStudent
      handleClose={handleClose}
      dialogOpen={openAddStudentsDialog}
      snackbarHandler={handleClickSnackbar}
    /> */}
    </div>
  );
}

export default TeacherAssignment;
