import { Button, Card, Divider, Grid, Typography } from "@mui/material";
import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useGetAllAssignmentsStudentQuery } from "../../services/api";
import { getFormattedDate } from "../../utils/helper";
import { STUDENT_ASSIGNMENT_ROUTE } from "../../utils/routesConstants";
import MuiCard from "../common/MuiCardDueDate";
import "./style.css";
function StudentClass() {
  const { classId } = useParams();
  const { data, isLoading, isSuccess, isError, error } =
    useGetAllAssignmentsStudentQuery(parseInt(classId || ""));
  const navigate = useNavigate();
  const location = useLocation();

  if (isLoading) {
    return <p>Loading....</p>;
  } else if (isError) {
    return <p>error</p>;
  }
  return (
    <Grid container textAlign={"left"} m={3}>
      <Grid item xs={12} mb={5}>
        <Typography variant="h4">{location.state.name}</Typography>
      </Grid>
      <Grid container>
        <Grid
          item
          xs={12}
          md={3}
          lg={3}
          mr={2}
          display="flex"
          flexDirection={"column"}
          justifyContent={"space-between"}
        >
          <Typography>{location.state.description}</Typography>
        </Grid>
        <Divider orientation="vertical" className="divider" />
        <Grid
          item
          xs={12}
          md={8}
          lg={8}
          display="flex"
          flexWrap={"wrap"}
        >
          {data &&
            data.map((d) => {
              return (
                <Grid
                  item
                  xs={12}
                  md={6}
                  lg={4}                >
                  <MuiCard
                    date={d.dueDate}
                    submit={() => navigate(`../student/assignment/${d.id}`)}
                    title={d.title}
                  />
                </Grid>
              );
            })}
        
        </Grid>
      </Grid>
    </Grid>
  );
}

export default StudentClass;
