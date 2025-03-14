
import { useEffect, useState } from "react"
import { UserContext } from "../../contexts/UserContext"
import { Link } from "react-router";
import studentService from "../../services/studentService";

const Student = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {

        const fetchStudents = async () => {
            try {
                const request = await studentService.studentListAll;
                setUsers(request)
                console.log(request)
            } catch (err) {
                console.log(`Error fetching Students: ${err.message}`)
            }

        }


    })


    return (
        <>
            <h1>STUDENTS</h1>
            {users.map((request) => {
                <li ></li>

            })}




        </>
    )
}

export default Student;