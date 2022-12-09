import * as React from 'react';
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useGetAllSubmissionsTeacherQuery } from "../../services/api";
import { Chip, Grid, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
const columns: GridColDef[] = [
  { field: "id", headerName: "Submission ID", width: 130 },
  {
    renderCell: (d) => {
      return (
        <Link to={"/teacher/submission/" + d.row.id}>{d.value.fullName}</Link>
      );
    },
    field: "student",
    headerName: "Student name",
    width: 160,
  },
  { field: "language", headerName: "Language", width: 160 },
  {
    field: "status",
    renderCell: (d) => {
      const chipColor = d.value === "Pass" ? "success" : "error";
      return <Chip label={d.value || ""} size="small" color={chipColor} />;
    },
    headerName: "Status",
    width: 160,
  },
  {
    field: "result",
    headerName: "Test Cases",
    renderCell: (d) => {
      return `Passed ${d?.row?.result?.successCount || 0} / ${
        d?.row?.result?.totalCount || 0
      }`;
    },
    width: 160,
  },
  {
    field: "updatedAt",
    renderCell: (d) => {
      return new Date(d.value).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    },
    headerName: "Updated On",
    width: 160,
  },
];

function TeacherSubmissions() {
  const { assignmentId } = useParams();
  const { data, isLoading, isError } = useGetAllSubmissionsTeacherQuery(
    parseInt(assignmentId || "")
  );
  if (isError) return <>Something went wrong</>;

  if (isLoading) return <>Loading...</>;

  if (!data) return <>No Data available</>;

  return (
    <Grid container justifyContent={"center"}>
      <Grid item container xs={8} justifyContent="flex-start">
        <Grid item>
          <Typography variant="h4" style={{ marginBottom: "20px" }}>
            Submissions for <NavigateNextIcon />
            <span style={{ textTransform: "capitalize", marginLeft: 5 }}>
              {data.assignment.title}
            </span>
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={8} height="70vh">
        <DataGrid
          rows={data.submissions}
          columns={columns}
          pageSize={20}
          // rowsPerPageOptions={[5]}
        />
      </Grid>
    </Grid>
  );
}

export default TeacherSubmissions