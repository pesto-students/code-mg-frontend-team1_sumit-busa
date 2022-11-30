import { Button, Card, Grid, LinearProgress, Typography } from "@mui/material";
import React from "react";

function StudentDashboard() {
  return (
    <Grid container>
      <Grid sm={12} md={6} lg={4} item>
        <Card sx={{ margin: 3, p: 2, textAlign: "left" }}>
          <Typography m={2} mb={0} variant="h5">
            Introduction to java
          </Typography>
          <Typography mx={2} mb={5}>
            By Sumit Busa
          </Typography>
          <Typography mx={2}>10 / 3 Assignments Completed</Typography>
          <LinearProgress
            variant="determinate"
            value={20}
            sx={{ margin: 2, height: "10px" }}
          />
        </Card>
      </Grid>
    </Grid>
  );
}

export default StudentDashboard;
