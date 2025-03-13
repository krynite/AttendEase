import React from 'react';
import '../../css/NavBar.css';

function NavBar() {


    return (
        <nav className="vertical-navbar">
            <div className="logo">
                <h2>Logo here.</h2>
            </div>
            <ul className="nav-links">
                <li className="nav-item">
                    <p>Link to Home</p>
                </li>
                <li className="nav-item">
                    <p>Link to Dashboard</p>
                </li>
                <li className="nav-item">
                    <p>Link to Student Profile</p>
                </li>
                <li className="nav-item">
                    <p>Link to Attendance</p>
                </li>
                <li className="nav-item">
                    <p>Link to Scan Attendance</p>
                </li>
            </ul>
            <div className="nav-footer">
                <p>AttendEase</p>
            </div>
        </nav>
    );
}

export default NavBar;