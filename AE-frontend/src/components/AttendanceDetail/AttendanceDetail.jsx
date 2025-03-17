import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import attendanceService from '../../services/attendanceService';

const AttendanceDetail = ({ user }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [attendance, setAttendance] = useState(null);

    useEffect(() => {
        const fetchAttendanceDetails = async () => {
            try {
                const data = await attendanceService.getAttendanceById(id);
                setAttendance(data);
            } catch (err) {
                console.error(`Error fetching attendance details: ${err.message}`);
            }
        };

        fetchAttendanceDetails();
    }, [id]);

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const handleDeleteAttendance = async () => {
        if (window.confirm('Are you sure you want to delete this attendance record? This action cannot be undone.')) {
            try {
                await attendanceService.deleteAttendance(id);
                navigate('/attendance');
            } catch (err) {
                console.error(`Error deleting attendance: ${err.message}`);
                alert('Failed to delete attendance record');
            }
        }
    };

    if (!attendance) return <div>Loading...</div>;

    return (
        <article>
            <header>
                <h1>Attendance Details Record</h1>
                <nav>
                    <Link to="/attendance">Back to Attendance</Link>
                </nav>
            </header>

            <main>
                <section>
                    <table>
                        <tbody>
                            <tr>
                                <th>Student Name:</th>
                                <td>{attendance.attendanceName?.studentName || 'N/A'}</td>
                            </tr>
                            <tr>
                                <th>Date:</th>
                                <td>{formatDate(attendance.attendanceDate)}</td>
                            </tr>
                        </tbody>
                    </table>
                </section>

                {/* Delete button - Only visible to admins */}
                {user?.userRole === "admin" && (
                    <section className="actions-section">
                        <button
                            onClick={handleDeleteAttendance}
                            className="delete-button"
                        >
                            Delete Attendance Record
                        </button>
                    </section>
                )}
            </main>
        </article>
    );
};

export default AttendanceDetail;