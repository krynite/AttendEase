import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom';
import studentService from '../../services/studentService';

const StudentUpdate = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [success, setSuccess] = useState('')
    const [formData, setFormData] = useState({
        studentName: '',
        studentIc: '',
        dateOfBirth: '',
        gender: '',
        address: '',
        schoolName: '',
        schoolNumber: '',
        enrollStatus: '',
        enrollDate: '',
        scfaStatus: '',
    })


    useEffect(() => {
        const fetchStudentDetails = async () => {
            try {
                const data = await studentService.getStudentById(id);

                // Format the date for the form input
                const isoDateOfBirth = data.dateOfBirth ? new Date(data.dateOfBirth).toISOString().split('T')[0] : '';
                const isoEnrollDate = data.enrollDate ? new Date(data.enrollDate).toISOString().split('T')[0] : '';

                setFormData({
                    studentName: data.studentName || '',
                    studentIc: data.studentIc || '',
                    dateOfBirth: isoDateOfBirth,
                    gender: data.gender || '',
                    address: data.address || '',
                    schoolName: data.schoolName || '',
                    schoolNumber: data.schoolNumber || '',
                    enrollStatus: data.enrollStatus || '',
                    enrollDate: isoEnrollDate,
                    scfaStatus: data.scfaStatus || ''
                });
            } catch (err) {
                console.error(`Error fetching student details: ${err.message}`);
            }
        };

        fetchStudentDetails();
    }, [id]);


    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await studentService.updateStudent(id, formData);
            setSuccess('true');
            // setTimeout(() => {
            //     navigate(`/students/${id}`);
            // }, 2000);
            navigate(`/students/${id}`);
            setSuccess('false');
        } catch (err) {
            console.error(`Error updating student: ${err.message}`);
        }
    };

    return (
        <>
            <h1>Update Student Information</h1>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='studentName'>Student Name:</label>
                    <input type="text" id="studentName" name="studentName" value={formData.studentName} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor='studentIc'>Student IC:</label>
                    <input type="text" id="studentIc" name="studentIc" value={formData.studentIc} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor='isoDateOfBirth'>Date of Birth: </label>
                    <input type="date" id="isoDateOfBirth" name="isoDateOfBirth" value={formData.dateOfBirth} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor='gender'>Gender:</label>
                    <select id="gender" name="gender" value={formData.gender} onChange={handleChange}>
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>
                <div>
                    <label htmlFor='address'>Address: </label>
                    <textarea id="address" name="address" value={formData.address} onChange={handleChange} rows="2" />
                </div>
                <div>
                    <label htmlFor='schoolName'>School Name: </label>
                    <input type="text" id="schoolName" name="schoolName" value={formData.schoolName} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor='schoolNumber'>School Contact:</label>
                    <input type="text" id="schoolNumber" name="schoolNumber" value={formData.schoolNumber} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor='enrollStatus'>Enrollment Status: </label>
                    <select id="enrollStatus" name="enrollStatus" value={formData.enrollStatus} onChange={handleChange}>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>
                <div>
                    <label htmlFor='isoEnrollDate'>Enrollment Date: </label>
                    <input type="date" id="isoEnrollDate" name="isoEnrollDate" value={formData.enrollDate} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor='scfaStatus'>SCFA Status: </label>
                    <select id="scfaStatus" name="scfaStatus" value={formData.scfaStatus} onChange={handleChange}>
                        <option value="">Select Status</option>
                        <option value="active-beneficiary">Active Beneficiary</option>
                        <option value="non-beneficiary">Non-Beneficiary</option>
                        <option value="former-beneficiary">Beneficiary</option>
                        <option value="pending">Pending</option>
                        <option value="denied">Denied</option>
                    </select>
                </div>
                <button type="submit" disabled={success}>Update Student</button>
                <Link to={`/students/${id}`}>Cancel</Link>
            </form>

        </>
    )
}
export default StudentUpdate;