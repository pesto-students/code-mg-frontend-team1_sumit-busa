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
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import "./style.css";
import InviteStudent from "../student/InviteStudent";
function TeacherDashboard() {
  const [openAddStudentsDialog, setOpenAddStudentsDialog] =
    React.useState(false);

  const handleClickOpen = () => {
    setOpenAddStudentsDialog(true);
  };

  const handleClose = () => {
    setOpenAddStudentsDialog(false);
    handleClickSnackbar();
  };

  const handleSnackbarClose = () => {
    setOpenSnackBar(false);
  };

  const [openSnackBar, setOpenSnackBar] = React.useState(false);

  const handleClickSnackbar = () => {
    setOpenSnackBar(true);
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
            New Class
          </Button>
        </Grid>
      </Grid>
      <Grid container>
        <Grid sm={12} md={6} lg={4} item>
          <Card sx={{ margin: 3, p: 2 }}>
            <Typography>Introduction to java</Typography>
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                margin: 20,
              }}
            >
              <Typography>60 Students</Typography>
              <Button variant="contained" onClick={handleClickOpen}>
                Invite Students
              </Button>
            </div>
            <IconButton>
              <ArrowForwardIcon />
            </IconButton>
          </Card>
        </Grid>
        <Grid sm={12} md={6} lg={4} item>
          <Card sx={{ margin: 3, p: 2 }}>
            <Typography>Introduction to java</Typography>
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                margin: 20,
              }}
            >
              <Typography>60 Students</Typography>
              <Button variant="contained" onClick={handleClickOpen}>
                Invite Students
              </Button>
            </div>
            <IconButton>
              <ArrowForwardIcon />
            </IconButton>
          </Card>
        </Grid>
        <Grid sm={12} md={6} lg={4} item>
          <Card sx={{ margin: 3, p: 2 }}>
            <Typography>Introduction to java</Typography>
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                margin: 20,
              }}
            >
              <Typography>60 Students</Typography>
              <Button variant="contained" onClick={handleClickOpen}>
                Invite Students
              </Button>
            </div>
            <IconButton>
              <ArrowForwardIcon />
            </IconButton>
          </Card>
        </Grid>
      </Grid>
      <InviteStudent
        handleClose={handleClose}
        dialogOpen={openAddStudentsDialog}
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
