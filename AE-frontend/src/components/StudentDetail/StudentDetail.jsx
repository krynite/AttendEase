import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import studentService from '../../services/studentService';
import '../../css/StudentDetail.css';
// import StudentUpdate from '../StudentUpdate/StudentUpdate'

const StudentDetails = ({ user }) => {
    const { id } = useParams();
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStudentDetails = async () => {
            try {
                setLoading(true);
                const data = await studentService.getStudentById(id);
                setStudent(data);
                setLoading(false);
            } catch (err) {
                console.error(`Error fetching student details: ${err.message}`);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchStudentDetails();
    }, [id]);

    // Function to format date in a readable format
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    // Function to get label for status values
    const getStatusLabel = (status, type) => {
        if (type === 'enroll') {
            return status === 'active' ? 'Active' : 'Inactive';
        } else if (type === 'scfa') {
            const labels = {
                'active-beneficiary': 'Active Beneficiary',
                'non-beneficiary': 'Non Beneficiary',
                'former-beneficiary': 'Former Beneficiary',
                'pending': 'Pending',
                'denied': 'Denied'
            };
            return labels[status] || status;
        }
        return status;
    };

    // Function to get status class
    const getStatusClass = (status, type) => {
        if (type === 'enroll') {
            return status === 'active' ? 'status-active' : 'status-inactive';
        } else if (type === 'scfa') {
            if (status === 'active-beneficiary') return 'status-beneficiary';
            if (status === 'pending') return 'status-pending';
            if (status === 'denied') return 'status-inactive';
            return 'status-inactive';
        }
        return '';
    };

    // Calculate student level based on age
    const calculateStudentLevel = (age) => {
        if (!age || typeof age !== "number") return "Unknown";
        if (age < 7) return "Below P1";
        if (age > 12) return "Above P6";

        // Map ages 7-12 to P1-P6
        return `P${age - 6}`;
    };

    if (loading) return <div className="loading">Loading student details...</div>;

    if (error) return <div className="error">Error: {error}</div>;

    if (!student) return <div className="error">Student not found</div>;

    return (
        <article className="student-details">
            <header>
                <h1>{student.studentName}</h1>
                <nav>
                    <Link to="/students">Back to Students</Link>
                    {user?.userRole === "admin" ? <Link to={`/students/update/${id}`}>Update Student</Link> : ''}
                </nav>
            </header>

            <section className="status-section">
                <ul>
                    <li>
                        Enrollment:
                        <span className={`status-indicator ${getStatusClass(student.enrollStatus, 'enroll')}`}>
                            {getStatusLabel(student.enrollStatus, 'enroll')}
                        </span>
                    </li>
                    <li>
                        SCFA:
                        <span className={`status-indicator ${getStatusClass(student.scfaStatus, 'scfa')}`}>
                            {getStatusLabel(student.scfaStatus, 'scfa')}
                        </span>
                    </li>
                </ul>
            </section>

            <main>
                <section className="info-section">
                    <h2>Personal Information</h2>
                    <table className="info-table">
                        <tbody>
                            <tr>
                                <th>Name:</th>
                                <td>{student.studentName}</td>
                            </tr>
                            <tr>
                                <th>IC/Passport:</th>
                                <td>{student.studentIc}</td>
                            </tr>
                            <tr>
                                <th>Date of Birth:</th>
                                <td>{formatDate(student.dateOfBirth)}</td>
                            </tr>
                            <tr>
                                <th>Age:</th>
                                <td>{student.studentAge} years</td>
                            </tr>
                            <tr>
                                <th>Gender:</th>
                                <td>{student.gender === 'm' || student.gender === 'male' ? 'Male' : 'Female'}</td>
                            </tr>
                            <tr>
                                <th>Address:</th>
                                <td>{student.address}</td>
                            </tr>
                        </tbody>
                    </table>
                </section>

                <section className="info-section">
                    <h2>School Information</h2>
                    <table className="info-table">
                        <tbody>
                            <tr>
                                <th>School Name:</th>
                                <td>{student.schoolName}</td>
                            </tr>
                            <tr>
                                <th>School Number:</th>
                                <td>{student.schoolNumber}</td>
                            </tr>
                            <tr>
                                <th>Student Level:</th>
                                <td>{calculateStudentLevel(student.studentAge)}</td>
                            </tr>
                        </tbody>
                    </table>
                </section>

                <section className="info-section">
                    <h2>Enrollment Information</h2>
                    <table className="info-table">
                        <tbody>
                            <tr>
                                <th>Enrollment Status:</th>
                                <td>
                                    <span className={`status-indicator ${getStatusClass(student.enrollStatus, 'enroll')}`}>
                                        {getStatusLabel(student.enrollStatus, 'enroll')}
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <th>Enrollment Date:</th>
                                <td>{formatDate(student.enrollDate)}</td>
                            </tr>
                            <tr>
                                <th>SCFA Status:</th>
                                <td>
                                    <span className={`status-indicator ${getStatusClass(student.scfaStatus, 'scfa')}`}>
                                        {getStatusLabel(student.scfaStatus, 'scfa')}
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </section>
            </main>
        </article>
    );
};

export default StudentDetails;