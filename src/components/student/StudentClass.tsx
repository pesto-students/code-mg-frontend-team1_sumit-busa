import { Button, Card, Divider, Grid, Typography } from "@mui/material";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetAllAssignmentsStudentQuery } from "../../services/api";
import { STUDENT_ASSIGNMENT_ROUTE } from "../../utils/routesConstants";
import "./style.css";
function StudentClass() {
  const { classId } = useParams();
  const { data, isLoading, isSuccess, isError, error } =
    useGetAllAssignmentsStudentQuery(parseInt(classId || ""));
  let navigate = useNavigate();

  if (isLoading) {
    return <p>Loading....</p>;
  } else if (isError) {
    return <p>error</p>;
  }
  return (
    <Grid container textAlign={"left"} m={3}>
      <Grid item xs={12} mb={5}>
        <Typography variant="h4">Heading</Typography>
      </Grid>
      <Grid container>
        <Grid
          item
          xs={12}
          md={5}
          lg={3}
          mr={2}
          display="flex"
          flexDirection={"column"}
          justifyContent={"space-between"}
        >
          <Typography>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an standard dummy text ever since the
            1500s, when an
          </Typography>
          <Typography sx={{ fontWeight: "bold" }}>Teacher name</Typography>
        </Grid>
        <Divider orientation="vertical" className="divider" />
        <Grid item xs={12} md={6} lg={8} display="flex" flexWrap={"wrap"}>
          <Grid item xs={12} md={4} lg={3}>
            {data &&
              data.map((d) => {
                return (
                  <Card sx={{ margin: 3, p: 2 }}>
                    <Typography variant="h5" sx={{ m: 1 }}>
                      {d.title}
                    </Typography>
                    <Typography variant="body1"></Typography>
                    <Typography variant="body1">
                      Due Date: {d.dueDate}
                    </Typography>
                    <Button
                      variant="outlined"
                      sx={{ mt: 3 }}
                      onClick={() => navigate(`../student/assignment/${d.id}`)}
                    >
                      start
                    </Button>
                  </Card>
                );
              })}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default StudentClass;
