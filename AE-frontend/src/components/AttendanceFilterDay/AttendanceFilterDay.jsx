import React from 'react';

const AttendanceFilterDay = ({ filters, setFilters }) => {
    const handleDateChange = (e) => {
        setFilters({
            ...filters,
            attendanceDate: e.target.value
        });
    };

    return (
        <div>
            <label>Date:</label>
            <input
                type="date"
                value={filters.attendanceDate || ''}
                onChange={handleDateChange}
            />
        </div>
    );
};

export default AttendanceFilterDay;