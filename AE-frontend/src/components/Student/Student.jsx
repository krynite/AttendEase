
import { useEffect, useState } from "react"
import { UserContext } from "../../contexts/UserContext"
import { Link } from "react-router";
import studentService from "../../services/studentService";
import StudentGrid from "../StudentGrid/StudentGrid";

const Student = () => {
    // const [students, setStudents] = useState([]);

    // useEffect(() => {

    //     const fetchStudents = async () => {
    //         try {
    //             const request = await studentService.getAllStudents();
    //             setStudents(request)
    //             console.log(request)        // returning: dateOfBirth enrollStatus role scfaStatus schoolName studentName
    //         } catch (err) {
    //             console.log(`Error fetching Students: ${err.message}`)
    //         }

    //     }
    //     fetchStudents();
    // }, [])


    return (
        <>
            <div>
                <StudentGrid />
            </div>
        </>
    )
}

export default Student;