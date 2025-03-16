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


        </Routes>
      </main>
    </div>

  )
}

export default App
