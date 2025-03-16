import { useContext, useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
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



const App = () => {

  return (

    <div className="app-container">
      <NavBar />

      <main className="main-content">
        <h1>Link Header here</h1>
        {/* <h2>Signed in as {user}</h2> */}
        <p>Display different components here. </p>
        <Routes>
          <Route path="/sign-in" element={<SignInForm />} />
          <Route path="/sign-up" element={<SignUpForm />} />
          <Route path="/students" element={<Student />} />
          <Route path="/students/:id" element={<StudentDetails />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/scanToday" element={<ScanAttendance />} />
          <Route path="/dashboard" element={<Dashboard />} />


        </Routes>
      </main>
    </div>

  )
}

export default App
