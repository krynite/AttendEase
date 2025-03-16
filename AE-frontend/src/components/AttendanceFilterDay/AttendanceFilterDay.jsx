import React from 'react';

const AttendanceFilterDay = ({ selectedDate }) => {
    // Hardcoded data for demonstration
    // In a real application, this would be fetched from your API
    const attendanceData = [
        { level: 'P1', attended: 18, total: 25 },
        { level: 'P2', attended: 22, total: 28 },
        { level: 'P3', attended: 19, total: 26 },
        { level: 'P4', attended: 24, total: 30 },
        { level: 'P5', attended: 17, total: 24 },
        { level: 'P6', attended: 21, total: 27 }
    ];

    // Format the selected date for display
    const formattedDate = selectedDate
        ? new Date(selectedDate).toLocaleDateString()
        : 'Today';

    return (
        <div className="attendance-filter-day">
            <h3>Daily Attendance Summary for {formattedDate}</h3>

            <table>
                <thead>
                    <tr>
                        <th>Level</th>
                        <th>Attendance</th>
                        <th>Percentage</th>
                    </tr>
                </thead>
                <tbody>
                    {attendanceData.map((level) => {
                        const percentage = ((level.attended / level.total) * 100).toFixed(1);

                        return (
                            <tr key={level.level}>
                                <td>{level.level}</td>
                                <td>{level.attended} / {level.total}</td>
                                <td>{percentage}%</td>
                            </tr>
                        );
                    })}
                </tbody>
                <tfoot>
                    <tr>
                        <td><strong>Total</strong></td>
                        <td>
                            <strong>
                                {attendanceData.reduce((sum, level) => sum + level.attended, 0)} /
                                {attendanceData.reduce((sum, level) => sum + level.total, 0)}
                            </strong>
                        </td>
                        <td>
                            <strong>
                                {(
                                    (attendanceData.reduce((sum, level) => sum + level.attended, 0) /
                                        attendanceData.reduce((sum, level) => sum + level.total, 0)) * 100
                                ).toFixed(1)}%
                            </strong>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
};

export default AttendanceFilterDay;