import { useState } from 'react'
import AttendanceFilter from "../AttendanceFilter/AttendanceFilter"
// import AttendanceCharts from "../AttendanceCharts/AttendanceCharts"

const Attendance = () => {

    const [filters, setFilters] = useState({
        student: '',
        dateRange: {
            startDate: '',
            endDate: ''
        }
    });

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    return (
        <>
            <AttendanceFilter handleFilterChange={handleFilterChange} filters={filters} setFilters={setFilters} />
            {/* <AttendanceCharts filters={filters} /> */}
        </>
    )
}

export default Attendance;