import React, { useState, useEffect, useMemo } from 'react';
import { Link } from "react-router-dom";
// import './StudentGrid.css';
import StudentGridList from '../StudentGridList/StudentGridList';
import studentService from "../../services/studentService";

const StudentGrid = () => {
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [totalStudentCount, setTotalStudentCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [schoolOptions, setSchoolOptions] = useState([]);
    const [error, setError] = useState(null);
    const [hasAppliedFilters, setHasAppliedFilters] = useState(false);
    const [filters, setFilters] = useState({
        enrollStatus: '-',
        scfaStatus: '-',
        schoolName: '-',
        studentLevel: '-'
    });

    // get table options
    useEffect(() => {
        const fetchSchoolOptions = async () => {
            try {
                const response = await studentService.getSchoolOptions();
                setSchoolOptions(response.schools);
                setTotalStudentCount(response.totalCount);
            } catch (err) {
                console.log(`Error fetching school options: ${err.message}`);
                setSchoolOptions([]);
            }
        };

        fetchSchoolOptions();
    }, []);

    useEffect(() => {
        // check if any filter is applied // should not need
        const isAnyFilterApplied =
            filters.enrollStatus !== '-' ||
            filters.scfaStatus !== '-' ||
            filters.schoolName !== '-' ||
            filters.studentLevel !== '-';

        // Update flag for showing empty state message
        setHasAppliedFilters(isAnyFilterApplied);

        if (!isAnyFilterApplied) {
            setFilteredStudents([]);
            return;
        }

        const fetchFilteredStudents = async () => {
            try {
                setLoading(true);
                const data = await studentService.getFilteredStudents(filters);
                setFilteredStudents(data);
                // Update total count if this is first filter application
                if (totalStudentCount === 0 && data.length > 0) {
                    setTotalStudentCount(data.length);
                }
                setLoading(false);
            } catch (err) {
                console.log(`Error fetching filtered students: ${err.message}`);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchFilteredStudents();
    }, [filters]);


    // fixed filterOptions. Should not be changeD!!!
    const filterOptions = {
        enrollStatus: [
            { value: 'active', label: 'Active' },
            { value: 'inactive', label: 'Inactive' }
        ],
        scfaStatus: [
            { value: 'active-beneficiary', label: 'Active Beneficiary' },
            { value: 'non-beneficiary', label: 'Non Beneficiary' },
            { value: 'former-beneficiary', label: 'Former Beneficiary' },
            { value: 'pending', label: 'Pending' },
            { value: 'denied', label: 'Denied' }
        ],
        // Mapping schools as there can me any amount of different schools.
        schoolName: schoolOptions,
        // Hardcoding the studentLevel
        studentLevel: [
            { value: 'P1', label: 'P1' },
            { value: 'P2', label: 'P2' },
            { value: 'P3', label: 'P3' },
            { value: 'P4', label: 'P4' },
            { value: 'P5', label: 'P5' },
            { value: 'P6', label: 'P6' },
            { value: 'Below P1', label: 'Below P1' },
            { value: 'Above P6', label: 'Above P6' },
            { value: 'Unknown', label: 'Unknown' }
        ],
    };

    const handleFilterChange = (event) => {
        setFilters({
            ...filters,
            [event.target.name]: event.target.value
        });
        console.log(`testing current filterChange`)
        console.log(filters)
    };

    // reset filters
    const clearFilters = () => {
        setFilters({
            enrollStatus: '-',
            scfaStatus: '-',
            schoolName: '-',
            studentLevel: '-',
        });
        console.log(`test clearFilter`)
    };

    // // filters student data
    // const filteredStudents = useMemo(() => {
    //     return students.filter(student => {

    //         // added default show nothing //? Not working as intended.
    //         // if (filters.enrollStatus === '-' && filters.scfaStatus === '-' && filters.schoolName === '-') {
    //         //     return [];
    //         // }
    //         //testing filters
    //         console.log(`---------------- StudentenrollStatus: ${student.enrollStatus}`)
    //         return (
    //             (filters.enrollStatus === '' || student.enrollStatus === filters.enrollStatus) &&
    //             (filters.scfaStatus === '' || student.scfaStatus === filters.scfaStatus) &&
    //             (filters.schoolName === '' || student.schoolName === filters.schoolName) &&
    //             (filters.studentLevel === '' || student.studentLevel === filters.studentLevel)
    //         );
    //     });
    // }, [students, filters]);

    // Get label for a given value from options
    const getLabelForValue = (category, value) => {
        if (!value) return '';
        if (category === 'schoolName') return value;

        const option = filterOptions[category].find(opt => opt.value === value);
        return option ? option.label : value;
    };

    const handleQuickFilter = (event) => {
        if (event.target.value === "AllStudent") {
            setFilters({
                enrollStatus: '',
                scfaStatus: '',
                schoolName: '',
                studentLevel: '',
            });
        }
        if (event.target.value === "AllScfa") {
            setFilters({
                enrollStatus: '',
                scfaStatus: 'active-beneficiary',
                schoolName: '',
                studentLevel: '',
            });
        }
        console.log(`test handleQuickFilter `)

    }

    return (
        <div className="student-grid-container">
            <h1>Students</h1>

            {/* filter div segment */}
            <div className="filter-section">
                <div className="filter-header">
                    <h3>Filter Students</h3>
                    <button onClick={handleQuickFilter} value="AllStudent"> All Students </button>
                    <button onClick={handleQuickFilter} value="AllScfa"> All SCFA </button>
                </div>

                <div className="filter-controls">
                    <div className="filter-field">
                        <label htmlFor="enroll-status">
                            Enrollment Status
                        </label>
                        <select
                            id="enroll-status"
                            name="enrollStatus"
                            value={filters.enrollStatus}
                            onChange={handleFilterChange}
                        >
                            <option value="-">-</option>
                            <option value="">All</option>
                            {filterOptions.enrollStatus.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="filter-field">
                        <label htmlFor="scfa-status">
                            SCFA Status
                        </label>
                        <select
                            id="scfa-status"
                            name="scfaStatus"
                            value={filters.scfaStatus}
                            onChange={handleFilterChange}
                        >
                            <option value="-">-</option>
                            <option value="">All</option>
                            {filterOptions.scfaStatus.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="filter-field">
                        <label htmlFor="school">
                            School
                        </label>
                        <select
                            id="school"
                            name="schoolName"
                            value={filters.schoolName}
                            onChange={handleFilterChange}
                        >
                            <option value="-">-</option>
                            <option value="">All</option>
                            {filterOptions.schoolName.map((school) => (
                                <option key={school} value={school}>
                                    {school}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Student Level Filter */}
                    <div className="filter-field">
                        <label htmlFor="student-level">
                            Student Level
                        </label>
                        <select
                            id="student-level"
                            name="studentLevel"
                            value={filters.studentLevel}
                            onChange={handleFilterChange}
                        >
                            <option value="-">-</option>
                            <option value="">All</option>
                            {filterOptions.studentLevel.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="filter-clear">
                        <button
                            onClick={clearFilters}
                            className="clear-button"
                        >
                            Clear Filters
                        </button>
                    </div>
                </div>
            </div>
            {/* END OF filter div segment */}

            {/* Merged with bottom msg. */}
            {/* <div className="results-count">
                {loading ? (
                    <span>Loading students...</span>
                ) : error ? (
                    <span className="error">Error: {error}</span>
                ) : hasAppliedFilters ? (
                    <span>Showing {filteredStudents.length} students</span>
                ) : (
                    <span>Please apply filters to view students</span>
                )}
            </div> */}

            {/* Table */}
            <div className="students-table-container">
                {hasAppliedFilters || loading ? (
                    <table className="students-table">
                        <thead>
                            <tr>
                                <th>Student Name</th>
                                <th>Enrollment Status</th>
                                <th>SCFA Status</th>
                                <th>School</th>
                                <th>Level</th>
                                <th className="actions-column">Actions</th>
                            </tr>
                        </thead>
                        <StudentGridList
                            filteredStudents={filteredStudents}
                            getLabelForValue={getLabelForValue}
                        />
                    </table>
                ) : error ? (
                    <p> Error: {error} </p>
                ) : hasAppliedFilters ? (
                    <span>Showing {filteredStudents.length} students</span>
                ) :
                    hasAppliedFilters ? (
                        <span>Showing {filteredStudents.length} students</span>
                    ) :
                        (
                            <div className="empty-state">
                                <p>Select at least one filter to view students</p>
                            </div>
                        )}
            </div>
        </div>
    );
};

export default StudentGrid;