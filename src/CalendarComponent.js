import React, { useState } from 'react';
import {  DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // Main style file
import 'react-date-range/dist/theme/default.css'; // Theme CSS file
import { Card, CardContent, Button, TextField } from '@mui/material';


const CalendarComponent = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [costPerHour, setCostPerHour] = useState('');

  const handleRangeSelection = (ranges) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };

  const handleCreateRange = () => {
    // Handle the logic for creating the range
  };

  const handleConfirm = () => {
    // Handle the logic for confirming the selection
    setShowCalendar(false);
  };

  const handleCancel = () => {
    // Handle the logic for canceling the selection
    setShowCalendar(false);
  };

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flexGrow: 1 }}>
        <Button variant="contained" color="primary" style={{paddingTop:10}} onClick={() => setShowCalendar(true)}>Select Dates</Button>
        {showCalendar && (
          <div style={{ position: 'absolute', top: 0, right: 0, zIndex: 9999 }}>
            <Card>
              <CardContent>
                <DateRangePicker
                  onChange={handleRangeSelection}
                  showSelectionPreview={true}
                  moveRangeOnFirstSelection={false}
                  ranges={[
                    {
                      startDate: startDate,
                      endDate: endDate,
                      key: 'selection',
                    },
                  ]}
                />
                <TextField
                  label="Cost Per Hour"
                  value={costPerHour}
                  onChange={(e) => setCostPerHour(e.target.value)}
                />
                <Button variant="contained" onClick={handleCreateRange}>Create Range</Button>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
                  <Button variant="contained" onClick={handleConfirm}>OK</Button>
                  <Button variant="contained" onClick={handleCancel}>Cancel</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
      <div style={{ display:'flex',paddingRight:185,paddingTop:10}}>
        <Card >
          <CardContent>
            <h3>Selected Range:</h3>
            <p>Start Date: {startDate.toDateString()}</p>
            <p>End Date: {endDate.toDateString()}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CalendarComponent;