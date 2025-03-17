import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import studentService from '../../services/studentService';
// import StudentUpdate from '../StudentUpdate/StudentUpdate'

const StudentDetails = () => {
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

    // Calculate student level based on age
    const calculateStudentLevel = (age) => {
        if (!age || typeof age !== "number") return "Unknown";
        if (age < 7) return "Below P1";
        if (age > 12) return "Above P6";

        // Map ages 7-12 to P1-P6
        return `P${age - 6}`;
    };

    if (loading) return <div>Loading student details...</div>;

    if (error) return <div>Error: {error}</div>;

    if (!student) return <div>Student not found</div>;

    return (
        <article>
            <header>
                <h1>{student.studentName}</h1>
                <nav>
                    <Link to="/students">Back to Students</Link>
                    <Link to={`/students/update/${id}`}>Update Student</Link>
                </nav>
            </header>

            <section>
                <ul>
                    <li>Enrollment: {getStatusLabel(student.enrollStatus, 'enroll')}</li>
                    <li>SCFA: {getStatusLabel(student.scfaStatus, 'scfa')}</li>
                </ul>
            </section>

            <main>
                <section>
                    <h2>Personal Information</h2>
                    <table>
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

                <section>
                    <h2>School Information</h2>
                    <table>
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

                <section>
                    <h2>Enrollment Information</h2>
                    <table>
                        <tbody>
                            <tr>
                                <th>Enrollment Status:</th>
                                <td>{getStatusLabel(student.enrollStatus, 'enroll')}</td>
                            </tr>
                            <tr>
                                <th>Enrollment Date:</th>
                                <td>{formatDate(student.enrollDate)}</td>
                            </tr>
                            <tr>
                                <th>SCFA Status:</th>
                                <td>{getStatusLabel(student.scfaStatus, 'scfa')}</td>
                            </tr>
                        </tbody>
                    </table>
                </section>
            </main>
        </article>
    );
};

export default StudentDetails;