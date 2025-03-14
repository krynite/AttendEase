import React from 'react';
import { Link } from "react-router-dom";

const StudentGridList = ({ filteredStudents, getLabelForValue }) => {
    return (
        <tbody>
            {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                    <tr
                        key={student._id}
                    >
                        <td>
                            {student.studentName}
                        </td>
                        <td>
                            <span
                                className={`status-badge ${student.enrollStatus === 'active' ? 'status-active' : 'status-inactive'}`}
                            >
                                {getLabelForValue('enrollStatus', student.enrollStatus)}
                            </span>
                        </td>
                        <td>
                            {getLabelForValue('scfaStatus', student.scfaStatus)}
                        </td>
                        <td>
                            {student.schoolName}
                        </td>
                        <td>
                            {student.studentLevel}
                        </td>
                        <td className="moreDetails">
                            <Link
                                to={`/students/${student._id}`}
                                className="moreDetails"
                            >
                                More Details
                            </Link>
                        </td>
                    </tr>
                ))
            ) : (
                <tr>
                    <td colSpan={5} className="no-results-message">
                        No students match the selected filters
                    </td>
                </tr>
            )}
        </tbody>
    );
};

export default StudentGridList;