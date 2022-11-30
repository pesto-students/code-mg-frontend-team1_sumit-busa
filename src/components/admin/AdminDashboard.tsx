import { Alert, Button, Grid, Snackbar, Typography } from "@mui/material";
import React from "react";
import InviteTeacher from "./InviteTeacher";
import TeachersTable from "./TeachersTable";

function AdminDashboard() {
  const [openAddTeachersDialog, setOpenAddTeachersDialog] =
    React.useState(false);

  const [openSnackBar, setOpenSnackBar] = React.useState(false);
  const handleClickOpen = () => {
    setOpenAddTeachersDialog(true);
  };

  const handleClose = () => {
    setOpenAddTeachersDialog(false);
    handleClickSnackbar();
  };
  const handleSnackbarClose = () => {
    setOpenSnackBar(false);
  };

  const handleClickSnackbar = () => {
    setOpenSnackBar(true);
  };

  return (
    <div style={{ margin: 20 }}>
      <Grid container>
        <Grid item xs={12} lg={8}>
          <Typography textAlign={"left"}>List of Teachers</Typography>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Button variant="contained" onClick={handleClickOpen}>
            Invite
          </Button>
        </Grid>
      </Grid>
      <div style={{ marginTop: 20 }}>
        <TeachersTable />
      </div>
      <InviteTeacher
        handleClose={handleClose}
        dialogOpen={openAddTeachersDialog}
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

export default AdminDashboard;
