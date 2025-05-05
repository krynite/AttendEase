import React, {useContext} from "react";
import "../../css/NavBar.css";
import { Link } from "react-router";
import { UserContext } from "../../contexts/UserContext"

function NavBar() {

    const { user, setUser} = useContext(UserContext)
    // console.log(user);

    const handleSignOut = (event) => {
        event.preventDefault();
        localStorage.removeItem("token");
        setUser(null);
    };



    return (
        <nav className="vertical-navbar">
            <div className="logo">
                <h2>AttendEase</h2>
            </div>
            <ul className="nav-links">
                <li className="nav-item">
                    <Link to="/">HOME</Link>
                </li>

                {user?.userRole === "admin" || user?.userRole === "staff" ? (
                    <li className="nav-item">
                        <Link to="/dashboard">DASHBOARD</Link>
                    </li>
                ) : (
                    ""
                )}

                {user?.userRole === "admin" || user?.userRole === "staff" ? (
                    <li className="nav-item">
                        <Link to="/students">STUDENTS</Link>
                    </li>
                ) : (
                    ""
                )}

                {user?.userRole === "admin" || user?.userRole === "staff" ? (
                    <li className="nav-item">
                        <Link to="/attendance">ATTENDANCE</Link>
                    </li>
                ) : (
                    ""
                )}

                {user?.userRole === "admin" || user?.userRole === "staff" ? (
                    <li className="nav-item">
                        <Link to="/scfa">SCFA</Link>
                    </li>
                ) : (
                    ""
                )}

                {user?.userRole === "general" ||
                    user?.userRole === "admin" ||
                    user?.userRole === "staff" ? (
                    <li className="nav-item">
                        <Link to="/scanToday">SCAN ATTENDANCE</Link>
                    </li>
                ) : (
                    ""
                )}
            </ul>
            {user ? (
                <div className="nav-footer">



                    <div >Signed in as: {user?.username}</div>




                    <Link to="/" onClick={handleSignOut}>Sign Out</Link>
                    {/* <button onClick={handleSignOut}>Sign Out</button> */}
                </div>
            ) : (
                // "Not Signed in"
                <div className="nav-footer">
                    <Link to="/sign-in">Sign-in</Link>
                </div>
                
            )}

            {/* <div className="nav-footer">
        <Link to="/sign-in">Sign-in</Link>
      </div> */}
        </nav>
    );
}

export default NavBar;
