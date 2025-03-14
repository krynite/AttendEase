import React from 'react';
import '../../css/NavBar.css';
import { Link } from "react-router";

function NavBar() {


    return (
        <nav className="vertical-navbar">
            <div className="logo">
                <h2>Logo here.</h2>
            </div>
            <ul className="nav-links">
                <li className="nav-item">
                    {/* <p>Link to Home</p> */}
                    <Link to="/">HOME</Link>
                </li>
                <li className="nav-item">
                    {/* <p>Link to Dashboard</p> */}
                    <Link to="/dashboard">DASHBOARD</Link>
                </li>
                <li className="nav-item">
                    {/* <p>Link to Student</p> */}
                    <Link to="/students">STUDENTS</Link>
                </li>
                <li className="nav-item">
                    {/* <p>Link to Attendance</p> */}
                    <Link to="/attendance">ATTENDANCE</Link>
                </li>
                <li className="nav-item">
                    {/* <p>Link to Scan Attendance</p> */}
                    <Link to="/scfa">SCFA</Link>
                </li>
                <li className="nav-item">
                    {/* <p>Link to Scan Attendance</p> */}
                    <Link to="/scanToday">SCAN ATTENDANCE</Link>
                </li>
            </ul>
            <div className="nav-footer">
                <p>AttendEase</p>
            </div>
        </nav>
    );
}

export default NavBar;