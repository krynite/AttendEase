import React from 'react';
import '../../css/NavBar.css';
import { Link } from "react-router";

function NavBar({ user }) {


    return (
        <nav className="vertical-navbar">
            <div className="logo">
                <h2>AttendEase</h2>
            </div>
            <ul className="nav-links">
                <li className="nav-item">
                    <Link to="/">HOME</Link>
                </li>

                {user?.userRole === "admin" || user?.userRole === "staff" ? <li className="nav-item">
                    <Link to="/dashboard">DASHBOARD</Link>
                </li> : ''}


                {user?.userRole === "admin" || user?.userRole === "staff" ? <li className="nav-item">
                    <Link to="/students">STUDENTS</Link>
                </li> : ''}



                {user?.userRole === "admin" || user?.userRole === "staff" ? <li className="nav-item">
                    <Link to="/attendance">ATTENDANCE</Link>
                </li> : ''}



                {user?.userRole === "admin" || user?.userRole === "staff" ? <li className="nav-item">
                    <Link to="/scfa">SCFA</Link>
                </li> : ''}


                {user?.userRole === "general" || user?.userRole === "admin" || user?.userRole === "staff" ? <li className="nav-item">
                    <Link to="/scanToday">SCAN ATTENDANCE</Link>
                </li> : ''}
            </ul>
            <div className="nav-footer">
                <Link to="/sign-in">Sign-in</Link>
            </div>
        </nav>
    );
}

export default NavBar;