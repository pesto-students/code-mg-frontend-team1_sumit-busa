import * as React from 'react';
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useGetAllSubmissionsTeacherQuery } from "../../services/api";
import { Chip, Grid } from "@mui/material";
import { useParams } from "react-router-dom";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID" },
  {
    renderCell: (d) => d.value.fullName,
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
      return `Passed ${d.row.result.successCount} / ${d.row.result.totalCount}`;
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
    <Grid container justifyContent={"center"} height="80vh">
      <Grid item xs={8}>
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={20}
          // rowsPerPageOptions={[5]}
        />
      </Grid>
    </Grid>
  );
}

export default TeacherSubmissions