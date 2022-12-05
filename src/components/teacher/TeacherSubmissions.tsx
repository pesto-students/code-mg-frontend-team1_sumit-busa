import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'studentName', headerName: 'Student name', width: 130 },
  { field: 'status', headerName: 'Status', width: 130 },
  {
    field: 'codeRun',
    headerName: 'Code Run',
    width: 150,
  },
  {
    field: 'plagiarism',
    headerName: 'Plagiarism (%)',
    width: 150,
  },
  
];

const rows = [
  { id: 1, studentName: 'Jhon', status: 'Engaged',codeRun:"Success" , plagiarism : "80"},
  
];

function TeacherSubmissions() {
  
  return (
<div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={20}
        // rowsPerPageOptions={[5]}

      />
    </div>  )
}

export default TeacherSubmissions