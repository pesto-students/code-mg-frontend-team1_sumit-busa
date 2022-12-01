import { Button, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import "./style.css";
import {
  ContentState,
  convertFromHTML,
  convertToRaw,
  EditorState,
} from "draft-js";
import draftToHtml from "draftjs-to-html";
// import { Editor } from "react-draft-wysiwyg";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { isNil } from "lodash";

interface CreateAssignmentDetailsParams {
  handleStepperNext: () => void;
}

function CreateAssignmentDetails({
  handleStepperNext,
}: CreateAssignmentDetailsParams) {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs("2022-04-07"));
  const [editState, setEditState] = React.useState(EditorState.createEmpty());

  //   React.useEffect(()=>{
  //       if (isNil(value)) {
  //          setEditState( EditorState.createEmpty() );
  //         } else {
  //           const blocksFromHTML = convertFromHTML(value);
  //           const stateData = ContentState.createFromBlockArray(
  //             blocksFromHTML.contentBlocks,
  //             blocksFromHTML.entityMap
  //           );
  //          setEditState(EditorState.createWithContent(stateData) );
  //         }

  //   },[])

  const editorStateChange = (editorState: EditorState) => {
    setEditState(editorState);
    console.log("new ");
    console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  };
  const handleNextButton = () => {
    handleStepperNext();
  };
  return (
    <Grid container textAlign={"left"}>
      <Grid
        item
        xs={12}
        lg={4}
        height={"80vh"}
        display={"flex"}
        flexDirection={"column"}
        pr={5}
      >
        <Grid xs={12} item m={2}>
          <TextField
            id="standard-basic"
            label="Name"
            variant="standard"
            fullWidth
          />
        </Grid>
        {/* <div className="blankDiv"/> */}
        <Grid xs={12} item m={2}>
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            style={{ width: "100%" }}
          >
            <DateTimePicker
              renderInput={(props) => (
                <TextField {...props} fullWidth variant="standard" />
              )}
              label="Due Date"
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
              }}
            />
          </LocalizationProvider>
        </Grid>
        <Grid xs={12} item m={2} display={"inline-flex"}>
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
