import React from 'react';

const AttendanceFilterMonth = ({ filters, setFilters }) => {
    const handleMonthChange = (e) => {
        const monthYear = e.target.value; // Format: YYYY-MM

        if (!monthYear) {
            const updatedFilters = { ...filters };
            delete updatedFilters.monthYear;
            setFilters(updatedFilters);
            return;
        }

        // Parse month-year string
        const [year, month] = monthYear.split('-').map(num => parseInt(num));

        // Get first and last day of month
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0);

        // Format dates as YYYY-MM-DD
        const formatDate = (date) => date.toISOString().split('T')[0];

        setFilters({
            ...filters,
            monthYear: {
                startDate: formatDate(startDate),
                endDate: formatDate(endDate),
                display: new Date(startDate).toLocaleString('default', { month: 'long', year: 'numeric' })
            }
        });
    };

    return (
        <div>
            <label>Month:</label>
            <input
                type="month"
                value={filters.monthString || ''}
                onChange={handleMonthChange}
            />

            {filters.monthYear && (
                <p>{filters.monthYear.display}</p>
            )}
        </div>
    );
};

export default AttendanceFilterMonth;