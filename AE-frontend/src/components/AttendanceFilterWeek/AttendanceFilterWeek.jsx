import React from 'react';

const AttendanceFilterWeek = ({ filters, setFilters }) => {
    const handleWeekChange = (e) => {
        const weekString = e.target.value; // Format: YYYY-Www

        if (!weekString) {
            const updatedFilters = { ...filters };
            delete updatedFilters.weekRange;
            setFilters(updatedFilters);
            return;
        }

        // Parse week string to get dates
        const [year, week] = weekString.split('-W');
        const firstDayOfYear = new Date(parseInt(year), 0, 1);
        const dayOffset = (firstDayOfYear.getDay() || 7) - 1;
        const weekOffset = (parseInt(week) - 1) * 7;

        const startDate = new Date(year, 0, 1 + weekOffset - dayOffset);
        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 6);

        // Format dates as YYYY-MM-DD
        const formatDate = (date) => date.toISOString().split('T')[0];

        setFilters({
            ...filters,
            weekRange: {
                startDate: formatDate(startDate),
                endDate: formatDate(endDate)
            }
        });
    };

    return (
        <div>
            <label>Week:</label>
            <input
                type="week"
                value={filters.weekString || ''}
                onChange={handleWeekChange}
            />

            {filters.weekRange && (
                <p>
                    {filters.weekRange.startDate} to {filters.weekRange.endDate}
                </p>
            )}
        </div>
    );
};

export default AttendanceFilterWeek;