import { Button, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import "./style.css";
import { convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
// import { Editor } from "react-draft-wysiwyg";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { DatePicker } from "@mui/x-date-pickers";
import { Details } from "./CreateAssignment";

interface CreateAssignmentDetailsParams {
  handleStepperNext: (data: Details) => void;
  data: Details;
}

function CreateAssignmentDetails({
  handleStepperNext,
  data,
}: CreateAssignmentDetailsParams) {
  const [dueDate, setValue] = React.useState<Dayjs | null>(data.dueDate);
  const [editState, setEditState] = React.useState(data.problemStatement);
  const [title, setTitle] = useState(data.title);

  const editorStateChange = (editorState: EditorState) => {
    setEditState(editorState);
    console.log("new ");
    console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  };
  const handleNextButton = () => {
    handleStepperNext({
      dueDate,
      problemStatement: editState,
      title,
    });
  };
  return (
    <Grid container textAlign={"left"}>
      <Grid
        item
        container
        spacing={2}
        xs={12}
        lg={4}
        height={"80vh"}
        justifyContent="center"
        alignItems="flex-start"
      >
        <Grid xs={8} item m={1}>
          <TextField
            id="standard-basic"
            label="Name"
            variant="standard"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
          />
        </Grid>
        {/* <div className="blankDiv"/> */}
        <Grid xs={8} item m={1}>
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            style={{ width: "100%" }}
          >
            <DatePicker
              renderInput={(props) => (
                <TextField {...props} fullWidth variant="standard" />
              )}
              label="Due Date"
              value={dueDate}
              onChange={(newValue) => {
                setValue(newValue);
              }}
            />
          </LocalizationProvider>
        </Grid>
        <Grid xs={8} item m={1} display={"inline-flex"}>
          <Button
            variant="contained"
            sx={{ alignSelf: "self-end" }}
            fullWidth
            onClick={handleNextButton}
          >
            NEXT
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={12} lg={8} p={2}>
        <Typography variant="h5" mb={3}>
          Problem Statement
        </Typography>
        <Editor
          editorState={editState}
          onEditorStateChange={editorStateChange}
        />
      </Grid>
    </Grid>
  );
}

export default CreateAssignmentDetails;
