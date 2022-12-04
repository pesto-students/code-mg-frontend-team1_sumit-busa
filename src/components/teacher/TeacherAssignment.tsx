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
import { useNavigate, useParams } from "react-router-dom";

import "./style.css";
import { useGetAllAssignmentsTeacherQuery } from "../../services/api";
function TeacherAssignment() {
  let navigate = useNavigate();
  const { classId } = useParams();

  const handleClickOpen = () => {
    navigate(`/teacher/${classId}/createassignment`);
    //send to create assignment page
  };

  const { data, isLoading, isSuccess, isError, error } =
    useGetAllAssignmentsTeacherQuery(parseInt(classId || ""));
  let content;
  if (isLoading) {
    content = <p>Loading....</p>;
  } else if (isSuccess) {
    content = data;
  } else {
    console.log(error);
    content = <p>error</p>;
  }

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
        {data &&
          data.map((d) => {
            return (
              <Grid sm={12} md={6} lg={4} item textAlign={"left"}>
                <Card sx={{ margin: 3, p: 2 }}>
                  <Typography variant="h5" sx={{ m: 1 }}>
                    {d.title}
                  </Typography>
                  <Typography variant="body1">
                    created on : 1st Nov 2022
                  </Typography>
                  <Typography variant="body1">
                    Due Date: 10st Nov 2022
                  </Typography>
                  <Button
                    variant="outlined"
                    sx={{ mt: 3 }}
                    onClick={() => navigate("../teacher/submission")}
                  >
                    {d._count.submissions} Submissions
                  </Button>
                </Card>
              </Grid>
            );
          })}
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
