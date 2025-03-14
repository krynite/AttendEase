import { Routes, Route, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const StudentGrid = ({ students }) => {


    return (
        <>
            <h1> Test Student Grid Box </h1>
            {students.map((student) => (
                <ul key={student._id}>
                    <li>{student.studentName}</li>
                    <li>{student.enrollStatus}</li>
                    <li>{student.role}</li>
                    <li>
                        <Link to={`/students/${student._id}`}>View</Link>
                    </li>
                </ul>)
            )}
        </>
    )
}

export default StudentGrid