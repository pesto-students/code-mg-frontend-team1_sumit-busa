import { Editor } from "react-draft-wysiwyg";
import { Button, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import {
  ContentState,
  convertFromHTML,
  convertToRaw,
  EditorState,
} from "draft-js";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
interface CreateAssignmentSummaryInterface {
  handleStepperBack: () => void;
}
function CreateAssignmentSummary({
  handleStepperBack,
}: CreateAssignmentSummaryInterface) {
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
        <Grid xs={12} item m={2}>
          <TextField
            id="standard-basic"
            label="Due Date"
            variant="standard"
            fullWidth
          />
        </Grid>
        <Grid xs={12} item m={2}>
          <TextField
            id="standard-basic"
            label="Maximum run time (Seconds)"
            variant="standard"
            fullWidth
          />
        </Grid>
        <Grid xs={12} item m={2}>
          <TextField
            id="standard-basic"
            label="Test Input"
            variant="standard"
            fullWidth
          />
        </Grid>
        <Grid xs={12} item m={2}>
          <TextField
            id="standard-basic"
            label="Expected Output"
            variant="standard"
            fullWidth
          />
        </Grid>

        <Grid
          xs={12}
          item
          m={2}
          display={"flex"}
          p={2}
          justifyContent="space-between"
        >
          <Button variant="contained" onClick={handleStepperBack}>
            Back
          </Button>
          <Button variant="contained"> Create Assignment</Button>
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

export default CreateAssignmentSummary;
