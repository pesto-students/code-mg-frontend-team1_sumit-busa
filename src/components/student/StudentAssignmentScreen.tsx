import React from "react";
import Grid from "@mui/material/Grid";
import MonacoEditor from "./MonacoEditor";
import { useAssignmentQuery } from "../../services/api";

function StudentAssignmentScreen() {
  const { isLoading, data } = useAssignmentQuery(1);
  if (isLoading) return <>Loading....</>;
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <h1>{data?.title}</h1>
        {data?.problemStatement}
      </Grid>
      <Grid item xs={6}>
        <div style={{}}>
          <MonacoEditor />
        </div>
      </Grid>
    </Grid>
    // <div>asdf</div>
  );
}

export default StudentAssignmentScreen;
