import { Button, Card, Grid, LinearProgress, Typography } from "@mui/material";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetAllClassesStudentQuery } from "../../services/api";

function StudentDashboard() {
  const { data, isLoading, isSuccess, isError, error } =
    useGetAllClassesStudentQuery();
  let navigate = useNavigate();

  if (isLoading) {
    return <p>Loading....</p>;
  } else if (isError) {
    return <p>error</p>;
  }
  return (
    <Grid container>
      {data &&
        data.map((d) => {
          return (
            <Grid sm={12} md={6} lg={4} item>
              <Card
                sx={{ margin: 3, p: 2, textAlign: "left" }}
                onClick={() => {
                  navigate("class/" + d.id,{state:d});
                }}
              >

                <Typography m={2} mb={0} variant="h5">
                  {d.name}
                </Typography>
                <Typography mx={2} mb={5}>
                  {d.description}
                </Typography>
                <Typography mx={2}>
                  {d._count.assignments ?? 0} Assignments
                </Typography>
                {/* <LinearProgress
                  variant="determinate"
                  value={20}
                  sx={{ margin: 2, height: "10px" }}
                /> */}
              </Card>
            </Grid>
          );
        })}
    </Grid>
  );
}

export default StudentDashboard;
