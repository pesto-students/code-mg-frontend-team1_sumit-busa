import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import React from "react";

interface InviteStudentParams {
  handleClose: () => void;
  snackbarHandler : ()=>void;
  dialogOpen: boolean;
}
function InviteStudent({
  handleClose,
  dialogOpen,
  snackbarHandler,
}: InviteStudentParams) {
  return (
    <Dialog open={dialogOpen} onClose={handleClose}>
      <DialogTitle>Invite Students</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Enter Student Email seperated by comma
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Email Address"
          type="email"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
}

export default InviteStudent;
