import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  TextField,
} from "@mui/material";
import { useRef, useState } from "react";
import { useCreateClassMutation } from "../../services/api";

interface CreateNewClassParams {
  handleClose: () => void;
  snackbarHandler: () => void;
  dialogOpen: boolean;
}
function CreateNewClass({
  handleClose,
  dialogOpen,
  snackbarHandler,
}: CreateNewClassParams) {
  const [createClass] = useCreateClassMutation();

  const handleSubmit = () => {
    console.log(name);
    console.log(description);
    createClass({ name, description });
    handleClose();
  };
  const [name, setName] = useState("");
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const [description, setDescription] = useState("");
  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescription(event.target.value);
  };

  return (
    <Dialog open={dialogOpen} onClose={handleClose}>
      <DialogTitle> Create New Class</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Class Name"
          fullWidth
          variant="standard"
          onChange={handleNameChange}
        />
        <TextField
          margin="dense"
          id="name"
          label="Description"
          fullWidth
          variant="standard"
          onChange={handleDescriptionChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateNewClass;
