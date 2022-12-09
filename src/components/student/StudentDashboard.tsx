import { Button, Card, Grid, LinearProgress, Typography } from "@mui/material";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetAllClassesStudentQuery } from "../../services/api";
import MuiCardThreeLine from "../common/MuiCardDueThreeLine";

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
              <MuiCardThreeLine
                count={d._count.assignments}
                description={d.description}
                name={d.name}
                submit={() => navigate("class/" + d.id, { state: d })}
              />
            </Grid>
          );
        })}
    </Grid>
  );
}

export default StudentDashboard;
