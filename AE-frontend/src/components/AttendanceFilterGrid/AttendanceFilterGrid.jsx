import React from 'react';
import { Link } from "react-router-dom";
import '../../css/AttendanceFilterGrid.css';

const AttendanceFilterGrid = ({ filteredAttendance }) => {

    // console.log(`testing response data: ${JSON.stringify(filteredAttendance)}`)
    // Format date to a readable format
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    // Format time to a readable format
    const formatTime = (timeString) => {
        const time = new Date(timeString);
        return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    // Format the time duration as hours and minutes
    const formatDuration = (milliseconds) => {
        const hours = Math.floor(milliseconds / (1000 * 60 * 60));
        const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
        return `${hours}h ${minutes}m`;
    };

    // Get duration class based on hours
    const getDurationClass = (milliseconds) => {
        const hours = milliseconds / (1000 * 60 * 60);
        if (hours >= 2) return 'duration-good';
        if (hours >= 1) return 'duration-warning';
        return 'duration-low';
    };

    // Get requirement badge class
    const getRequirementBadgeClass = (requirementsMet) => {
        if (requirementsMet === 'Yes') return 'requirement-badge requirement-met';
        if (requirementsMet === 'No') return 'requirement-badge requirement-not-met';
        return '';
    };

    return (
        <div className="attendance-grid-container">
            <h2>Attendance Records</h2>

            {filteredAttendance && filteredAttendance.length > 0 ? (
                <div className="attendance-table-container">
                    <table className="attendance-table">
                        <thead>
                            <tr>
                                <th>Student Name</th>
                                <th>Level</th>
                                <th>Date</th>
                                <th>Time In</th>
                                <th>Time Out</th>
                                <th>Duration</th>
                                <th>Req Met</th>
                                <th className="actions-column">Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAttendance.map((record) => (
                                <tr key={record._id}>
                                    <td>{record.attendanceName?.studentName || 'N/A'}</td>
                                    <td>{record.attendanceName?.studentLevel || 'N/A'}</td>
                                    <td>{formatDate(record.attendanceDate)}</td>
                                    <td>
                                        {record.attendanceRecords?.timeIn? 
                                        formatTime(record.attendanceRecords.timeIn)
                                            : 'N/A'}
                                    </td>
                                    <td>
                                        {record.attendanceRecords?.timeOut? 
                                        formatTime(record.attendanceRecords.timeOut)
                                            : 'N/A'}
                                    </td>
                                    <td className={
                                        record.attendanceRecords?.timeDuration 
                                            ? getDurationClass(record.attendanceRecords.timeDuration)
                                            : ''
                                    }>
                                        {record.attendanceRecords?.requirementsMet
                                            ? formatDuration(record.attendanceRecords.timeDuration)
                                            : 'N/A'}
                                    </td>
                                    <td>
                                        {record.attendanceRecords.length > 0 ? (
                                            <span className={getRequirementBadgeClass(record.attendanceRecords[0].requirementsMet)}>
                                                {record.attendanceRecords[0].requirementsMet}
                                            </span>
                                        ) : 'N/A'}
                                    </td>
                                    <td className="actions-column">
                                        <Link
                                            to={`/attendance/${record._id}`}
                                            className="attendance-record-link"
                                        >
                                            View Details
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="empty-state">
                    <p>No attendance records found. Try adjusting your filters.</p>
                </div>
            )}
        </div>
    );
};

export default AttendanceFilterGrid;