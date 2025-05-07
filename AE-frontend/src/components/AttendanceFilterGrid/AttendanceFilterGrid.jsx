import React from 'react';
import { Link } from "react-router-dom";

const AttendanceFilterGrid = ({ filteredAttendance }) => {
    // Check incoming data
    // console.log(`Attendance Filter Grid ${JSON.stringify(filteredAttendance)}`)


    // Format date to a readable format
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    // Format time to a readable format
    const formatTime = (timeString) => {
        const time = new Date(timeString);
        return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
    };

    // Format the time duration as hours and minutes
    const formatDuration = (milliseconds) => {
        const hours = Math.floor(milliseconds / (1000 * 60 * 60));
        const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
        return `${hours}h ${minutes}m`;
    };

    return (
        <div>
            <h2>Attendance Records</h2>

            {filteredAttendance && filteredAttendance.length > 0 ? (
                <table border="1" cellPadding="8" cellSpacing="0">
                    <thead>
                        <tr>
                            <th>Student Name</th>
                            <th>Level</th>
                            <th>Date</th>
                            <th>Time In</th>
                            <th>Time Out</th>
                            <th>Duration</th>
                            <th>Req Met</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAttendance.map((record) => (
                            <tr key={record._id}>
                                <td>{record.attendanceName?.studentName || 'N/A'}</td>
                                <td>{record.attendanceName?.studentLevel || 'N/A'}</td>
                                <td>{formatDate(record.attendanceDate)}</td>
                                <td>
                                    {record.attendanceRecords.length > 0
                                        ? formatTime(record.attendanceRecords[0].timeIn)
                                        : 'N/A'}
                                </td>
                                <td>
                                    {record.attendanceRecords.length > 0
                                        ? formatTime(record.attendanceRecords[0].timeOut)
                                        : 'N/A'}
                                </td>
                                <td>
                                    {record.attendanceRecords.length > 0
                                        ? formatDuration(record.attendanceRecords[0].timeDuration)
                                        : 'N/A'}
                                </td>
                                <td>
                                    {record.attendanceRecords.length > 0
                                        ? record.attendanceRecords[0].requirementsMet
                                        : 'N/A'}
                                </td>
                                <td className="moreDetails">
                                    <Link
                                        to={`/attendance/${record._id}`}
                                        className="moreDetails"
                                    >
                                        More Details
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No attendance records found. Try adjusting your filters.</p>
            )}
        </div>
    );
};

export default AttendanceFilterGrid;