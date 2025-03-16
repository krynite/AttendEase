import { useEffect, useState, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import attendanceService from '../../services/attendanceService';

// Register all Chart.js components
Chart.register(...registerables);

const AttendanceCharts = ({ filters }) => {
    const [attendanceData, setAttendanceData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Refs for the charts
    const dailyChartRef = useRef(null);
    const durationChartRef = useRef(null);
    const requirementsChartRef = useRef(null);

    // Chart instances
    const dailyChartInstance = useRef(null);
    const durationChartInstance = useRef(null);
    const requirementsChartInstance = useRef(null);

    useEffect(() => {
        const fetchAttendanceData = async () => {
            try {
                setLoading(true);
                const data = await attendanceService.getAllAttendance();

                // Apply filters if they exist
                let filteredData = data;

                if (filters) {
                    if (filters.student) {
                        filteredData = filteredData.filter(record =>
                            record.attendanceName && record.attendanceName._id === filters.student
                        );
                    }

                    if (filters.dateRange && filters.dateRange.startDate) {
                        const startDate = new Date(filters.dateRange.startDate);
                        filteredData = filteredData.filter(record =>
                            new Date(record.attendanceDate) >= startDate
                        );
                    }

                    if (filters.dateRange && filters.dateRange.endDate) {
                        const endDate = new Date(filters.dateRange.endDate);
                        endDate.setHours(23, 59, 59); // Set to end of day
                        filteredData = filteredData.filter(record =>
                            new Date(record.attendanceDate) <= endDate
                        );
                    }
                }

                setAttendanceData(filteredData);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchAttendanceData();
    }, [filters]);

    useEffect(() => {
        if (attendanceData.length === 0) return;

        // Clean up previous charts
        if (dailyChartInstance.current) {
            dailyChartInstance.current.destroy();
        }
        if (durationChartInstance.current) {
            durationChartInstance.current.destroy();
        }
        if (requirementsChartInstance.current) {
            requirementsChartInstance.current.destroy();
        }

        // Format the chart based on period type (week/month)
        const isPeriodTypeMonth = filters && filters.periodType === 'month';

        // Prepare data for daily attendance chart
        const dailyAttendance = attendanceData.reduce((acc, record) => {
            const date = new Date(record.attendanceDate);
            let dateKey;

            if (isPeriodTypeMonth) {
                // For month view, group by day of month
                dateKey = `${date.getDate()}/${date.getMonth() + 1}`; // Day/Month format
            } else {
                // For week view, use full date
                dateKey = date.toLocaleDateString();
            }

            acc[dateKey] = (acc[dateKey] || 0) + 1;
            return acc;
        }, {});

        // Prepare data for duration chart
        const durationData = {};
        attendanceData.forEach(record => {
            if (record.attendanceRecords && record.attendanceRecords.length > 0) {
                const studentName = record.attendanceName?.studentName || 'Unknown';
                const totalDuration = record.attendanceRecords.reduce((total, r) => {
                    // Calculate duration in hours
                    const duration = r.timeOut && r.timeIn ?
                        (new Date(r.timeOut) - new Date(r.timeIn)) / (1000 * 60 * 60) : 0;
                    return total + duration;
                }, 0);

                durationData[studentName] = (durationData[studentName] || 0) + totalDuration;
            }
        });

        // Prepare data for requirements met chart
        const requirementsData = {
            true: 0,
            false: 0,
            NA: 0
        };

        attendanceData.forEach(record => {
            if (record.attendanceRecords) {
                record.attendanceRecords.forEach(r => {
                    if (r.requirementsMet) {
                        requirementsData[r.requirementsMet]++;
                    }
                });
            }
        });

        // Create daily attendance chart
        if (dailyChartRef.current) {
            const ctx = dailyChartRef.current.getContext('2d');
            dailyChartInstance.current = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: Object.keys(dailyAttendance),
                    datasets: [{
                        label: 'Daily Attendance Count',
                        data: Object.values(dailyAttendance),
                        backgroundColor: 'rgba(54, 162, 235, 0.5)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Number of Records'
                            }
                        },
                        x: {
                            title: {
                                display: true,
                                text: isPeriodTypeMonth ? 'Day of Month' : 'Date'
                            }
                        }
                    }
                }
            });
        }

        // Create duration chart
        if (durationChartRef.current) {
            const ctx = durationChartRef.current.getContext('2d');
            durationChartInstance.current = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: Object.keys(durationData),
                    datasets: [{
                        label: 'Total Duration (hours)',
                        data: Object.values(durationData),
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.5)',
                            'rgba(54, 162, 235, 0.5)',
                            'rgba(255, 206, 86, 0.5)',
                            'rgba(75, 192, 192, 0.5)',
                            'rgba(153, 102, 255, 0.5)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Total Attendance Duration by Student (hours)'
                        }
                    }
                }
            });
        }

        // Create requirements met chart
        if (requirementsChartRef.current) {
            const ctx = requirementsChartRef.current.getContext('2d');
            requirementsChartInstance.current = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['Requirements Met', 'Requirements Not Met', 'Not Applicable'],
                    datasets: [{
                        label: 'Requirements Status',
                        data: [requirementsData.true, requirementsData.false, requirementsData.NA],
                        backgroundColor: [
                            'rgba(75, 192, 192, 0.5)',
                            'rgba(255, 99, 132, 0.5)',
                            'rgba(201, 203, 207, 0.5)'
                        ],
                        borderColor: [
                            'rgba(75, 192, 192, 1)',
                            'rgba(255, 99, 132, 1)',
                            'rgba(201, 203, 207, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Requirements Status Distribution'
                        }
                    }
                }
            });
        }

        // Cleanup function
        return () => {
            if (dailyChartInstance.current) {
                dailyChartInstance.current.destroy();
            }
            if (durationChartInstance.current) {
                durationChartInstance.current.destroy();
            }
            if (requirementsChartInstance.current) {
                requirementsChartInstance.current.destroy();
            }
        };
    }, [attendanceData, filters]);

    if (loading) return <p>Loading charts...</p>;
    if (error) return <p>Error loading chart data: {error}</p>;
    if (attendanceData.length === 0) return <p>No attendance data found. Try adjusting your filters.</p>;

    return (
        <div>
            <h2>Attendance Charts</h2>

            <div>
                <h3>Daily Attendance</h3>
                <div style={{ height: '300px' }}>
                    <canvas ref={dailyChartRef}></canvas>
                </div>
            </div>

            <div style={{ display: 'flex', marginTop: '20px' }}>
                <div style={{ flex: 1 }}>
                    <h3>Attendance Duration by Student</h3>
                    <div style={{ height: '300px' }}>
                        <canvas ref={durationChartRef}></canvas>
                    </div>
                </div>

                <div style={{ flex: 1 }}>
                    <h3>Requirements Status</h3>
                    <div style={{ height: '300px' }}>
                        <canvas ref={requirementsChartRef}></canvas>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AttendanceCharts;