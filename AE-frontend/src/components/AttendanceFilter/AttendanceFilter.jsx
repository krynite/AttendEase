import { useState, useEffect } from "react";
import attendanceService from "../../services/attendanceService";
import AttendanceFilterGrid from "../AttendanceFilterGrid/AttendanceFilterGrid";
import '../../css/AttendanceFilter.css';

const AttendanceFilter = () => {
    const [filters, setFilters] = useState({
        studentLevel: "-",
        attendanceStartDate: "",
        attendanceEndDate: "",
        attendanceStartEpoch: null,
        attendanceEndEpoch: null,
    });

    const [filteredAttendance, setFilteredAttendance] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [hasAppliedFilters, setHasAppliedFilters] = useState(false);

    const [weeks, setWeeks] = useState({
        weeklyAttendance: "",
    });

    const filterOptions = {
        studentLevel: [
            { value: "P1", label: "P1" },
            { value: "P2", label: "P2" },
            { value: "P3", label: "P3" },
            { value: "P4", label: "P4" },
            { value: "P5", label: "P5" },
            { value: "P6", label: "P6" },
            // { value: 'Below P1', label: 'Below P1' },
            // { value: 'Above P6', label: 'Above P6' },
            // { value: 'Unknown', label: 'Unknown' }
        ],
    };

    const handleLevelChange = (event) => {
        setFilters({
            ...filters,
            [event.target.name]: event.target.value,
        });
    };

    const convertToEpoch = (date) => {
        const newDate = new Date(date);
        return newDate.getTime();
    };

    const handleDateChange = (e) => {
        setFilters((prevFilters) => {
            const newFilters = {
                ...prevFilters,
                [e.target.name]: e.target.value,
                ...(e.target.name === "attendanceStartDate"
                    ? { attendanceStartEpoch: convertToEpoch(e.target.value) }
                    : {}),
                ...(e.target.name === "attendanceEndDate"
                    ? { attendanceEndEpoch: convertToEpoch(e.target.value) }
                    : {}),
            };
            return newFilters;
        });
    };

    const handleWeekChange = (e) => {
        setWeeks({
            ...weeks,
            [e.target.name]: e.target.value,
        });
    };

    // Call calculateWeekDates when the week selection changes
    useEffect(() => {
        if (weeks.weeklyAttendance) {
            calculateWeekDates(weeks.weeklyAttendance);
        }
    }, [weeks.weeklyAttendance]);

    // Calculate the start and end dates for a selected week
    const calculateWeekDates = (selectedDate) => {
        const date = new Date(selectedDate);
        const day = date.getDay(); // 0 = Sunday, 1 = Monday, 2 = Tuesday

        // Calculate Monday
        const mondayOffset = day === 0 ? -6 : 1 - day;
        const monday = new Date(date);
        monday.setDate(date.getDate() + mondayOffset);

        // Calculate Saturday
        const saturdayOffset = day === 6 ? 0 : 6 - day;
        const saturday = new Date(date);
        saturday.setDate(date.getDate() + saturdayOffset);

        // Set times
        monday.setHours(0, 0, 0, 0);
        saturday.setHours(23, 59, 59, 999);

        const mondayEpoch = monday.getTime();
        const saturdayEpoch = saturday.getTime();

        // Format dates for input fields
        const formatDate = (date) => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const day = String(date.getDate()).padStart(2, "0");
            return `${year}-${month}-${day}`;
        };

        setFilters((prev) => ({
            ...prev,
            attendanceStartDate: formatDate(monday),
            attendanceEndDate: formatDate(saturday),
            attendanceStartEpoch: mondayEpoch,
            attendanceEndEpoch: saturdayEpoch,
        }));
    };

    // Check if filters are applied
    useEffect(() => {
        const isAnyFilterApplied =
            filters.studentLevel !== "-" &&
            filters.studentLevel !== "" &&
            (filters.attendanceStartDate || filters.attendanceEndDate);
        
        setHasAppliedFilters(isAnyFilterApplied);
    }, [filters]);

    // Fetch filtered attendance data
    useEffect(() => {
        const fetchFilteredAttendance = async () => {
            if (!hasAppliedFilters) {
                setFilteredAttendance([]);
                return;
            }
           
            setLoading(true);
            setError(null);
            
            try {
                const data = await attendanceService.getFilteredAttendance(filters);

                setFilteredAttendance(data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching filtered attendance:", err);
                setError(`Failed to fetch attendance data: ${err.message}`);
                setLoading(false);
            }
        };

        fetchFilteredAttendance();
    }, [filters, hasAppliedFilters]);

    // Clear all filters
    const clearFilters = () => {
        setFilters({
            studentLevel: "-",
            attendanceStartDate: "",
            attendanceEndDate: "",
            attendanceStartEpoch: null,
            attendanceEndEpoch: null,
        });
        setWeeks({
            weeklyAttendance: "",
        });
    };

    // Apply the filters
    const applyFilters = () => {
        // This will trigger the useEffect that fetches data
        setHasAppliedFilters(true);
    };

    return (
        <div className="attendance-filter-container">
            <h1>Attendance Filter</h1>
            
            <div className="filter-section">
                <div className="filter-header">
                    <h3>Filter Attendance</h3>
                </div>
                
                <div className="filter-field">
                    <label htmlFor="student-level">Student Level</label>
                    <select
                        id="student-level"
                        name="studentLevel"
                        value={filters.studentLevel}
                        onChange={handleLevelChange}
                    >
                        <option value="-">-</option>
                        <option value="all">All</option>
                        {filterOptions.studentLevel.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="date-controls">
                    <div className="filter-field">
                        <label htmlFor="attendance-start-date">Start Date</label>
                        <input
                            id="attendance-start-date"
                            type="date"
                            name="attendanceStartDate"
                            value={filters.attendanceStartDate || ""}
                            onChange={handleDateChange}
                        />
                    </div>
                    
                    <div className="filter-field">
                        <label htmlFor="attendance-end-date">End Date</label>
                        <input
                            id="attendance-end-date"
                            type="date"
                            name="attendanceEndDate"
                            value={filters.attendanceEndDate || ""}
                            onChange={handleDateChange}
                        />
                    </div>
                </div>

                <div className="week-selection">
                    <div className="filter-field">
                        <label htmlFor="weekly-attendance">Select Week</label>
                        <input
                            id="weekly-attendance"
                            type="date"
                            name="weeklyAttendance"
                            value={weeks.weeklyAttendance || ""}
                            onChange={handleWeekChange}
                        />
                        <small>Selecting a date will set the start and end dates to that week (Monday-Saturday)</small>
                    </div>
                </div>

                <div className="filter-actions">
                    <button onClick={applyFilters} className="filter-button">
                        Apply Filters
                    </button>
                    <button onClick={clearFilters} className="clear-button">
                        Clear Filters
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="loading-state">Loading attendance data...</div>
            ) : error ? (
                <div className="error-state">Error: {error}</div>
            ) : !hasAppliedFilters ? (
                <div className="empty-state">
                    <p>Select filters and click "Apply Filters" to view attendance data</p>
                </div>
            ) : filteredAttendance.length === 0 ? (
                <div className="empty-state">
                    <p>No attendance records found matching the selected filters</p>
                </div>
            ) : (
                <div className="attendance-table-container">
                    <AttendanceFilterGrid filteredAttendance={filteredAttendance} />
                </div>
            )}
        </div>
    );
};

export default AttendanceFilter;