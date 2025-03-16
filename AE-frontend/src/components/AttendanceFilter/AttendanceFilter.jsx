import { useState, useEffect } from 'react';
import attendanceService from '../../services/attendanceService';
import AttendanceFilterDay from '../AttendanceFilterDay/AttendanceFilterDay';

const AttendanceFilter = ({ handleFilterChange, filters, setFilters }) => {
    const [loading, setLoading] = useState(false);
    const [attendanceData, setAttendanceData] = useState([]);
    const [error, setError] = useState('');
    const [studentLevels, setStudentLevels] = useState([
        'Below P1', 'P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'Above P6'
    ]);

    // Fetch attendance data when filters change
    useEffect(() => {
        const fetchFilteredAttendanceData = async () => {
            try {
                setLoading(true);
                setError('');

                // Call the service with the current filters
                const data = await attendanceService.getFilteredAttendance(filters);
                setAttendanceData(data);
            } catch (err) {
                console.error("Error fetching filtered attendance:", err);
                setError(`Failed to fetch attendance data: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };

        // Only fetch if there are active filters
        if (filters.attendanceDate || filters.studentLevel) {
            fetchFilteredAttendanceData();
        }
    }, [filters]);

    // Handle date change
    const handleDateChange = (e) => {
        setFilters({
            ...filters,
            attendanceDate: e.target.value
        });
    };

    // Handle student level selection change
    const handleStudentLevelChange = (e) => {
        setFilters({
            ...filters,
            studentLevel: e.target.value
        });
    };

    // Handle filter submission
    const handleSubmit = (e) => {
        e.preventDefault();
        handleFilterChange(filters);
    };

    // Reset all filters
    const handleReset = () => {
        setFilters({
            attendanceDate: '',
            studentLevel: ''
        });
    };

    return (
        <div>
            <h2>Attendance Filters</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    {/* Date Filter */}
                    <div>
                        <label>
                            Attendance Date
                        </label>
                        <input
                            type="date"
                            name="attendanceDate"
                            value={filters.attendanceDate || ''}
                            onChange={handleDateChange}
                        />
                    </div>

                    {/* Student Level Filter */}
                    <div>
                        <label>
                            Student Level
                        </label>
                        <select
                            value={filters.studentLevel || ''}
                            onChange={handleStudentLevelChange}
                        >
                            <option value="">All Levels</option>
                            {studentLevels.map((level) => (
                                <option key={level} value={level}>
                                    {level}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div>
                    <button
                        type="button"
                        onClick={handleReset}
                    >
                        Reset
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? 'Loading...' : 'Apply Filters'}
                    </button>
                </div>
            </form>

            {/* Show error message if there is one */}
            {error && (
                <div>
                    {error}
                </div>
            )}

            {/* Show attendance data results */}
            <div>
                <h3>Results</h3>

                {loading ? (
                    <p>Loading attendance data...</p>
                ) : attendanceData.length > 0 ? (
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Student</th>
                                    <th>Level</th>
                                    <th>Date</th>
                                    <th>Time In</th>
                                    <th>Time Out</th>
                                    <th>Requirements Met</th>
                                </tr>
                            </thead>
                            <tbody>
                                {attendanceData.map((record, index) => (
                                    <tr key={index}>
                                        <td>
                                            {record.attendanceName?.studentName || 'N/A'}
                                        </td>
                                        <td>
                                            {record.attendanceName?.studentLevel || 'N/A'}
                                            {/* {record.studentLevel || 'N/A'} */}
                                        </td>
                                        <td>
                                            {new Date(record.attendanceDate).toLocaleDateString()}
                                        </td>
                                        <td>
                                            {record.attendanceRecords.length > 0
                                                ? new Date(record.attendanceRecords[0].timeIn).toLocaleTimeString()
                                                : 'N/A'}
                                        </td>
                                        <td>
                                            {record.attendanceRecords.length > 0
                                                ? new Date(record.attendanceRecords[record.attendanceRecords.length - 1].timeOut).toLocaleTimeString()
                                                : 'N/A'}
                                        </td>
                                        <td>
                                            {record.attendanceRecords.length > 0
                                                ? record.attendanceRecords[record.attendanceRecords.length - 1].requirementsMet
                                                : 'N/A'}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p>No attendance records found. Try adjusting your filters.</p>
                )}
            </div>
        </div>
    );
};

export default AttendanceFilter;