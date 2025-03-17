import { useContext, useEffect, useState } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import './App.css'
import { UserContext } from "./contexts/UserContext";
// Component Imports
import NavBar from './components/NavBar/NavBar'
import SignInForm from "./components/SignInForm/SignInForm"
import SignUpForm from "./components/SignUpForm/SignUpForm";
import Student from "./components/Student/Student"
import StudentDetails from "./components/StudentDetail/StudentDetail";
import Attendance from "./components/Attendance/Attendance"
import ScanAttendance from "./components/ScanAttendance/ScanAttendance";
import Dashboard from "./components/Dashboard/Dashboard";
import StudentUpdate from "./components/StudentUpdate/StudentUpdate"
import Homepage from "./components/Homepage/Homepage"



const App = () => {


  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && window.location.pathname !== '/sign-in' && window.location.pathname !== '/sign-up') {
      navigate('/sign-in');
    }
  }, [user, navigate]);

  return (

    <div className="app-container">
      <NavBar user={user} />

      <main className="main-content">

        {user && (
          <p>
            Signed in as: {user.username} Role:
            {user.userRole ? `(${user.userRole})` : ''}
          </p>
        )}




        {/* {user && <p>Signed in as: {user.username} ({user.userRole})</p>} */}
        {/* <h2>Signed in as {user}</h2> */}
        {/* <p>Display different components here. </p> */}





        {/* <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/sign-in" element={<SignInForm />} />
          <Route path="/sign-up" element={<SignUpForm />} />

          <Route path="/students" element={<Student />} />
          <Route path="/students/:id" element={<StudentDetails />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/scanToday" element={<ScanAttendance />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/students/update/:id" element={<StudentUpdate />} />
        </Routes> */}

        <Routes>
          {/* Public routes */}
          <Route path="/sign-in" element={<SignInForm />} />
          <Route path="/sign-up" element={<SignUpForm />} />
          <Route path="/" element={<Homepage />} />


          <Route path="/scanToday" element={
            user?.userRole === "general" || user?.userRole === "admin" || user?.userRole === "staff" ? <ScanAttendance /> : <Navigate to="/" />
          } />

          <Route path="/students" element={
            (user?.userRole === "admin" || user?.userRole === "staff") ? <Student user={user} /> : <Navigate to="/" />
          } />

          <Route path="/students/:id" element={
            (user?.userRole === "admin" || user?.userRole === "staff") ? <StudentDetails user={user} /> : <Navigate to="/" />
          } />

          <Route path="/attendance" element={
            (user?.userRole === "admin" || user?.userRole === "staff") ? <Attendance /> : <Navigate to="/" />
          } />


          <Route path="/students/update/:id" element={
            user?.userRole === "admin" ? <StudentUpdate user={user} /> : <Navigate to="/dashboard" />
          } />

          <Route path="/dashboard" element={
            user ? <Dashboard /> : <Navigate to="/sign-in" />
          } />

          <Route path="*" element={<Navigate to={user ? "/" : "/sign-in"} />} />
        </Routes>


      </main>
    </div>

  )
}

export default App
