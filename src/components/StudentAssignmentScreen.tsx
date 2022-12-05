import React from "react";
import Grid from "@mui/material/Grid";
import MonacoEditor from "./student/MonacoEditor";
import { useAssignmentQuery } from "../services/api";
import { useParams } from "react-router-dom";

function StudentAssignmentScreen() {
  const { assignmentId } = useParams();

  console.log(assignmentId);
  const { isLoading, data } = useAssignmentQuery(
    parseInt(assignmentId || "-1")
  );
  if (!assignmentId) {
    return <>invalid assignment id</>;
  }
  if (isLoading || !data) return <>Loading....</>;
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <h1>{data?.title}</h1>
        {data?.problemStatement}
      </Grid>
      <Grid item xs={6}>
        <div style={{}}>
          <MonacoEditor
            languages={data?.allowedLanguages}
            code={data?.submissions[0]?.submission}
            selectedLanguage={
              data?.submissions[0]?.language || data.allowedLanguages[0]
            }
            assignmentId={parseInt(assignmentId)}
          />
        </div>
      </Grid>
    </Grid>
    // <div>asdf</div>
  );
}

export default StudentAssignmentScreen;
