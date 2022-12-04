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
import { useAddStudentMutation } from "../../services/api";
import { isNilOrEmpty } from "../../utils/helper";

interface InviteStudentParams {
  handleClose: () => void;
  snackbarHandler: () => void;
  dialogOpen: boolean;
  classId: number;
}
function InviteStudent({
  handleClose,
  dialogOpen,
  snackbarHandler,
  classId,
}: InviteStudentParams) {
  const [addStudent] = useAddStudentMutation();
  const handleAddStudentSubmit = () => {
    if (isNilOrEmpty(email)) {
    } else {
      addStudent({ classId: classId, emails: [email] });
      snackbarHandler();
      handleClose();
    }
  };

  const [email, setEmail] = React.useState("");
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

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
          onChange={handleEmailChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAddStudentSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
}

export default InviteStudent;
