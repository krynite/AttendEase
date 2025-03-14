
import { useEffect, useState } from "react"
import { UserContext } from "../../contexts/UserContext"
import { Link } from "react-router";
import studentService from "../../services/studentService";
import StudentGrid from "../StudentGrid/StudentGrid";

const Student = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {

        const fetchStudents = async () => {
            try {
                const request = await studentService.getAllStudents();
                setStudents(request)
                console.log(request)        // returning: dateOfBirth enrollStatus role scfaStatus schoolName studentName
            } catch (err) {
                console.log(`Error fetching Students: ${err.message}`)
            }

        }
        fetchStudents();
    }, [])


    return (
        <>
            <div>
                <StudentGrid students={students} />
                <h1>-----------------------</h1>
                {/* <h1>STUDENTS</h1> */}
                {/* {students.map((student) => (
                    <ul key={student._id}>
                        <li>{student.studentName}</li>
                        <li>{student.enrollStatus}</li>
                        <li>{student.role}</li>
                        <li>
                            <Link to={`/students/${student._id}`}>View</Link>
                        </li>
                    </ul>)
                )} */}



            </div>
        </>
    )
}

export default Student;