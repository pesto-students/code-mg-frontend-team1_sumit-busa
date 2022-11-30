import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'teacherName', headerName: 'Teacher name', width: 130 },
  { field: 'status', headerName: 'Status', width: 130 },
  {
    field: 'mobileNo',
    headerName: 'Mobile Number',
    width: 190,
  },
  
];

const rows = [
  { id: 1, teacherName: 'Jhon', status: 'Engaged', mobileNo: 123456777 },
  
];

export default function TeachersTable() {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={20}
        // rowsPerPageOptions={[5]}

      />
    </div>
  );
}