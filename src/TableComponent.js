import React, { useState } from 'react';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import { Button, TextField, Container } from '@mui/material';
import { AddCircle } from '@mui/icons-material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


const columns = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'role', headerName: 'Role', width: 200, renderCell: EditableCell('role') },
  { field: 'regions', headerName: 'Regions', width: 200, renderCell: EditableCell('regions') },
  { field: 'costPerHour', headerName: 'Cost/hr', width: 200, renderCell: EditableCell('costPerHour') },
  { field: 'weeks', headerName: 'Weeks', width: 200, renderCell: EditableCell('weeks') },
  { field: 'cost', headerName: 'Cost', width: 200, renderCell: EditableCell('cost') },
  { field: 'week picker', headerName: 'WP', width: 200, renderCell: WeekPicker('week picker') },
];

const initialRows = [
  { id: 1, role: '', regions: '', costPerHour: '', weeks: '', cost: '' },
];

function EditableCell(field) {
  return function EditableCellComponent(params) {
    const { value } = params;
    const [cellValue, setCellValue] = useState(value);

    const handleValueChange = (event) => {
      setCellValue(event.target.value);
      params.api.updateRows([{ ...params.row, [field]: event.target.value }]);
    };

    return (
      <TextField value={cellValue} onChange={handleValueChange} />
    );
  };
}

function WeekPicker(field) {
  return function WeekPickerComponent(params) {
    const { value } = params;
    const [selectedDate, setSelectedDate] = useState(value);

    const handleDateChange = (date) => {
      setSelectedDate(date);
      params.api.updateRows([{ ...params.row, [field]: date }]);
    };

    return (
      <DatePicker selected={selectedDate} onChange={handleDateChange} />
    );
  };
}

const CustomToolbar = () => (
  <GridToolbarContainer>
    <GridToolbarExport />
    {/* Add any other toolbar components here */}
  </GridToolbarContainer>
);

const TableComponent = () => {
  const [rows, setRows] = useState(initialRows);

  const handleAddRow = () => {
    const newRow = { id: rows.length + 1, role: '', regions: '', costPerHour: '', weeks: '', cost: '' };
    setRows([...rows, newRow]);
  };

  return (
    <Container maxWidth='xl' style={{ backgroundColor: '#e1f5fe', padding: '1rem' }}>
      <Button variant="contained" color="primary" style={{ marginBottom: '1rem' }}>
        Save
      </Button>
      <Button variant="contained" color="secondary" style={{ marginBottom: '1rem', marginLeft: '1rem' }}>
        Delete
      </Button>
      <TextField placeholder="Search..." variant="outlined" style={{ marginLeft: '1rem', marginBottom: '1rem' }} />
      <DataGrid
        rows={rows}
        columns={columns}
        components={{
          Toolbar: CustomToolbar,
        }}
        autoHeight
        disableColumnMenu
        disableSelectionOnClick
        disableColumnFilter
        disableColumnResize
        showToolbar
        pageSize={5}
      />
      <Button variant="text" startIcon={<AddCircle />} onClick={handleAddRow} color='error'>
        
      </Button>
    </Container>
  );
};

export default TableComponent;