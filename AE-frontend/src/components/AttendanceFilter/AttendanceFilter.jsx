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
            // { value: 'Below P1', label: 'Below P1' },
            // { value: 'Above P6', label: 'Above P6' },
            // { value: 'Unknown', label: 'Unknown' }
        ],
    }

    const handleFilterChange = (event) => {
        // console.log(`Before handleFilterChange ${JSON.stringify(filters)}`)
        setFilters({
            ...filters, [event.target.name]: event.target.value
        })

        //? Below for testing
        // setFilters(prevFilters => {
        //     const newFilters = {
        //         ...prevFilters, 
        //         [event.target.name]: event.target.value
        //     };
        //     console.log(`After handleFilterChange ${JSON.stringify(newFilters)}`);
        //     return newFilters;
        // });
        //! LOOK HERE! -------------------------------------------------------------------------------------------------------------------------
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

    // #region - Not needed at the moment.
    // Call calculateWeekDates and tabulate start and end week
    useEffect(() => {
        if (weeks.weeklyAttendance) {
            calculateWeekDates(weeks.weeklyAttendance);
        }
    }, [weeks.weeklyAttendance]);


    // Auto Fill in Start and End Date   (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getDay)
    const calculateWeekDates = (selectedDate) => {
        const date = new Date(selectedDate);
        const day = date.getDay(); // 0 = Sunday, 1 = Monday, 2 = Tuesday 


        // Thursday (day=5)  1-5 = -4  || day is now 1 aka Monday
        const mondayOffset = day === 0 ? -6 : 1 - day;
        const monday = new Date(date);
        monday.setDate(date.getDate() + mondayOffset);

        // If today is already Saturday (6), offset is 0, otherwise calculate days until Saturday
        const saturdayOffset = day === 6 ? 0 : 6 - day;
        const saturday = new Date(date);
        saturday.setDate(date.getDate() + saturdayOffset);

        // set Monday start tune
        monday.setHours(0, 0, 0, 0);

        // set Saturday end time
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
    // #endregion 

    // useEffect - getFilteredAttendance
    useEffect(() => {
        const fetchFilteredAttendance = async () => {
            try {
                // Call the service with the current filters
                const data = await attendanceService.getFilteredAttendance(filters);
                //! LOOK HERE! -------------------------------------------------------------------------------------------------------------------------
                // console.log(`**************************************test fetchFilteredAttendance: ${JSON.stringify(filters)}`)
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

    
    // #region Return
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
    // #endregion
}
export default AttendanceFilter;


