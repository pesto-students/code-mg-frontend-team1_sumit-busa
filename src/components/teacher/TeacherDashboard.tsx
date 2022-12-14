import {
  Alert,
  Button,
  Card,
  Grid,
  IconButton,
  Snackbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import "./style.css";
import InviteStudent from "./InviteStudent";
import { useNavigate } from "react-router-dom";
import { useGetClassQuery } from "../../services/api";
import CreateNewClass from "./CreateNewClass";
import MuiCardTeacherDashboard from "../common/MuiCardTeacherDashboard";

function TeacherDashboard() {
  let navigate = useNavigate();

  const { data, isLoading, isSuccess, isError, error } = useGetClassQuery();

  let content;
  if (isLoading) {
    content = <p>Loading....</p>;
  } else if (isSuccess) {
    content = data;
  } else {
    console.log(error);
    content = <p>error</p>;
  }
  const [openAddStudentsDialog, setOpenAddStudentsDialog] =
    React.useState(false);
  const [openAddClassDialog, setOpenAddClassDialog] = React.useState(false);

  const handleClickOpen = (id: number) => {
    setOpenAddStudentsDialog(true);
    setSelectedClassId(id);
  };

  const handleCreateClassModalOpen = () => {
    setOpenAddClassDialog(true);
  };

  const handleClassModalClose = () => {
    setOpenAddClassDialog(false);
  };

  const handleClose = () => {
    setOpenAddStudentsDialog(false);
    // handleClickSnackbar();
  };

  const handleSnackbarClose = () => {
    setOpenSnackBar(false);
  };

  const [openSnackBar, setOpenSnackBar] = React.useState(false);
  const [selectedClassId, setSelectedClassId] = React.useState<number>(0);

  const handleClickSnackbar = () => {
    setOpenSnackBar(true);
  };

  return (
    <div className="mainContainer">
      <Grid container>
        <Grid item container xs={12} justifyContent="space-between">
          <Grid item>
            <Typography
              variant="h4"
              style={{ marginBottom: "5px", marginLeft: "20px" }}
            >
              List of Classes
            </Typography>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              onClick={handleCreateClassModalOpen}
              sx={{ marginRight: 3 }}
            >
              New Class
            </Button>
          </Grid>
        </Grid>
      </Grid>
      {data?.length == 0 ? (
        <Typography>No classes present , you need to create one</Typography>
      ) : (
        <Grid container>
          {data &&
            data.map((d) => {
              return (
                <Grid sm={12} md={6} lg={4} item key={d.id}>
                  {/* <Card sx={{ margin: 3, p: 2 }}>
                  <Typography>{d.name}</Typography>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-evenly",
                      margin: 20,
                    }}
                  >
                    <Typography>{d._count["students"]} Students</Typography>
                    <Button
                      variant="contained"
                      onClick={() => handleClickOpen(d.id)}
                    >
                      Invite Students
                    </Button>
                  </div>
                  <IconButton
                    onClick={() => {
                      navigate(d.id + "/assignment");
                    }}
                  >
                    <ArrowForwardIcon />
                  </IconButton>
                </Card> */}
                  <MuiCardTeacherDashboard
                    count={d._count["students"]}
                    iconButton={() => {
                      navigate(d.id + "/assignment");
                    }}
                    name={d.name}
                    submit={() => handleClickOpen(d.id)}
                  />
                </Grid>
              );
            })}
        </Grid>
      )}
      <InviteStudent
        handleClose={handleClose}
        dialogOpen={openAddStudentsDialog}
        snackbarHandler={handleClickSnackbar}
        classId={selectedClassId}
      />
      <CreateNewClass
        handleClose={handleClassModalClose}
        dialogOpen={openAddClassDialog}
        snackbarHandler={handleClickSnackbar}
      />
      <Snackbar
        open={openSnackBar}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert severity="success">This is a success message!</Alert>
      </Snackbar>
    </div>
  );
}

export default TeacherDashboard;
