import { useState, useEffect } from 'react';
import attendanceService from '../../services/attendanceService';
import AttendanceFilterGrid from '../AttendanceFilterGrid/AttendanceFilterGrid';





const AttendanceFilter = () => {
    const [filters, setFilters] = useState({
        studentLevel: '-',
        attendanceStartDate: '',
        attendanceEndDate: '',
        attendanceStartEpoch: null,
        attendanceEndEpoch: null,
    })

    const [filteredAttendance, setFilteredAttendance] = useState([])

    const [weeks, setWeeks] = useState({
        weeklyAttendance: '',
    })

    // const [attendanceData, setAttendanceData] = useState([])

    const filterOptions = {
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
    }

    const handleFilterChange = (event) => {
        setFilters({
            ...filters, [event.target.name]: event.target.value
        })
        console.log(`testing handleFilterChange ${filters}`)
    }

    const handleDateChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        });
    };

    const handleWeekChange = (e) => {
        setWeeks({
            ...weeks,
            [e.target.name]: e.target.value
        });
    };

    // Calculate week start (Monday) and end (Saturday) dates when weeklyAttendance changes
    useEffect(() => {
        if (weeks.weeklyAttendance) {
            calculateWeekDates(weeks.weeklyAttendance);
        }
    }, [weeks.weeklyAttendance]);

    // Function to calculate the Monday and Saturday dates of the selected week
    const calculateWeekDates = (selectedDate) => {
        const date = new Date(selectedDate);
        const day = date.getDay(); // 0 for Sunday, 1 for Monday, etc.

        // Calculate Monday date (start of week)
        // Thursday (day=5)  1-5 = -4  || day is now 1 aka Monday
        const mondayOffset = day === 0 ? -6 : 1 - day;
        const monday = new Date(date);
        monday.setDate(date.getDate() + mondayOffset);

        // Calculate Saturday date (end of week)
        // If today is already Saturday (6), offset is 0, otherwise calculate days until Saturday
        const saturdayOffset = day === 6 ? 0 : 6 - day;
        const saturday = new Date(date);
        saturday.setDate(date.getDate() + saturdayOffset);

        // set Monday time
        monday.setHours(0, 0, 0, 0);

        // set Saturday time
        saturday.setHours(23, 59, 59, 999);

        const mondayEpoch = monday.getTime();
        const saturdayEpoch = saturday.getTime();

        //  YYYY-MM-DD for the input fields
        const formatDate = (date) => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        };

        setFilters(prev => ({
            ...prev,
            attendanceStartDate: formatDate(monday),
            attendanceEndDate: formatDate(saturday),
            attendanceStartEpoch: mondayEpoch,
            attendanceEndEpoch: saturdayEpoch
        }));
    };

    useEffect(() => {
        const fetchFilteredAttendance = async () => {
            try {
                // Call the service with the current filters
                const data = await attendanceService.getFilteredAttendance(filters);
                console.log(`-----------test fetchFilteredAttendance: ${filters.studentLevel}`)
                setFilteredAttendance(data);
            } catch (err) {
                console.error("Error fetching filtered attendance:", err);
                // setError(`Failed to fetch attendance data: ${err.message}`);
            }
        };

        // Only fetch if there are active filters
        if (filters.attendanceDate || filters.studentLevel) {
            fetchFilteredAttendance();
        }
    }, [filters]);

    return (
        <>
            <h1>Attendance Filter</h1>
            <div>
                <label>Student Level: </label>
                <select id="student-level" name="studentLevel" value={filters.studentLevel} onChange={handleFilterChange}>
                    <option value="-">-</option>
                    <option value='all'>All</option>
                    {filterOptions.studentLevel.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}


                </select>

                <div>
                    <label>Attendance Start Date: </label>
                    <input type="date" name="attendanceStartDate" value={filters.attendanceStartDate || ''} onChange={handleDateChange} />
                    <label>Attendance End Date: </label>
                    <input type="date" name="attendanceEndDate" value={filters.attendanceEndDate || ''} onChange={handleDateChange} />
                </div>

                <label>Select Week: </label>
                <input type="date" name="weeklyAttendance" value={weeks.weeklyAttendance || ''} onChange={handleWeekChange} />
            </div >
            <div>
                <AttendanceFilterGrid filteredAttendance={filteredAttendance} />

            </div>

        </>
    )
}
export default AttendanceFilter;


// old partial working day code below.
// const AttendanceFilter = ({ handleFilterChange, filters, setFilters }) => {
//     const [loading, setLoading] = useState(false);
//     const [attendanceData, setAttendanceData] = useState([]);
//     const [error, setError] = useState('');
//     const [studentLevels, setStudentLevels] = useState([
//         'Below P1', 'P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'Above P6'
//     ]);

//     // Fetch attendance data when filters change
//     useEffect(() => {
//         const fetchFilteredAttendanceData = async () => {
//             try {
//                 setLoading(true);
//                 setError('');

//                 // Call the service with the current filters
//                 const data = await attendanceService.getFilteredAttendance(filters);
//                 setAttendanceData(data);
//             } catch (err) {
//                 console.error("Error fetching filtered attendance:", err);
//                 setError(`Failed to fetch attendance data: ${err.message}`);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         // Only fetch if there are active filters
//         if (filters.attendanceDate || filters.studentLevel) {
//             fetchFilteredAttendanceData();
//         }
//     }, [filters]);

//     // Handle date change
//     const handleDateChange = (e) => {
//         setFilters({
//             ...filters,
//             attendanceDate: e.target.value
//         });
//     };

//     // Handle student level selection change
//     const handleStudentLevelChange = (e) => {
//         setFilters({
//             ...filters,
//             studentLevel: e.target.value
//         });
//     };

//     // Handle filter submission
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         handleFilterChange(filters);
//     };

//     // Reset all filters
//     const handleReset = () => {
//         setFilters({
//             attendanceDate: '',
//             studentLevel: ''
//         });
//     };

//     return (
//         <div>
//             <h2>Attendance Filters</h2>

//             <form onSubmit={handleSubmit}>
//                 <div>
//                     {/* Date Filter */}
//                     <div>
//                         <label>
//                             Attendance Date
//                         </label>
//                         <input
//                             type="date"
//                             name="attendanceDate"
//                             value={filters.attendanceDate || ''}
//                             onChange={handleDateChange}
//                         />
//                     </div>

//                     {/* Student Level Filter */}
//                     <div>
//                         <label>
//                             Student Level
//                         </label>
//                         <select
//                             value={filters.studentLevel || ''}
//                             onChange={handleStudentLevelChange}
//                         >
//                             <option value="">All Levels</option>
//                             {studentLevels.map((level) => (
//                                 <option key={level} value={level}>
//                                     {level}
//                                 </option>
//                             ))}
//                         </select>
//                     </div>
//                 </div>

//                 <div>
//                     <button
//                         type="button"
//                         onClick={handleReset}
//                     >
//                         Reset
//                     </button>
//                     <button
//                         type="submit"
//                         disabled={loading}
//                     >
//                         {loading ? 'Loading...' : 'Apply Filters'}
//                     </button>
//                 </div>
//             </form>

//             {/* Show error message if there is one */}
//             {error && (
//                 <div>
//                     {error}
//                 </div>
//             )}

//             {/* Show attendance data results */}
//             <div>
//                 <h3>Results</h3>

//                 {loading ? (
//                     <p>Loading attendance data...</p>
//                 ) : attendanceData.length > 0 ? (
//                     <div>
//                         <table>
//                             <thead>
//                                 <tr>
//                                     <th>Student</th>
//                                     <th>Level</th>
//                                     <th>Date</th>
//                                     <th>Time In</th>
//                                     <th>Time Out</th>
//                                     <th>Requirements Met</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {attendanceData.map((record, index) => (
//                                     <tr key={index}>
//                                         <td>
//                                             {record.attendanceName?.studentName || 'N/A'}
//                                         </td>
//                                         <td>
//                                             {record.attendanceName?.studentLevel || 'N/A'}
//                                             {/* {record.studentLevel || 'N/A'} */}
//                                         </td>
//                                         <td>
//                                             {new Date(record.attendanceDate).toLocaleDateString()}
//                                         </td>
//                                         <td>
//                                             {record.attendanceRecords.length > 0
//                                                 ? new Date(record.attendanceRecords[0].timeIn).toLocaleTimeString()
//                                                 : 'N/A'}
//                                         </td>
//                                         <td>
//                                             {record.attendanceRecords.length > 0
//                                                 ? new Date(record.attendanceRecords[record.attendanceRecords.length - 1].timeOut).toLocaleTimeString()
//                                                 : 'N/A'}
//                                         </td>
//                                         <td>
//                                             {record.attendanceRecords.length > 0
//                                                 ? record.attendanceRecords[record.attendanceRecords.length - 1].requirementsMet
//                                                 : 'N/A'}
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 ) : (
//                     <p>No attendance records found. Try adjusting your filters.</p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default AttendanceFilter;