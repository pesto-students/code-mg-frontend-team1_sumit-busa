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
import { getFormattedDate } from "../../utils/helper";
import MuiCardTeacher from "../common/MuiCardTeacher";
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
      {data?.length == 0 ? (
        <Typography>No Assignment present , you need to create one</Typography>
      ) : (
        <Grid container>
          {data &&
            data.map((d) => {
              return (
                <Grid sm={12} md={6} lg={4} item textAlign={"left"}>
                
                  <MuiCardTeacher
                  title={d.title}
                  createdAt={d.createdAt}
                  dueDate={d.dueDate}
                  submissions = {d._count.submissions}
                  submit={()=>navigate(`/teacher/${d.id}/submission`)}
                  />
                </Grid>
              );
            })}
        </Grid>
      )}
      {/* <InviteStudent
      handleClose={handleClose}
      dialogOpen={openAddStudentsDialog}
      snackbarHandler={handleClickSnackbar}
    /> */}
    </div>
  );
}

export default TeacherAssignment;
