import { useContext, useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { UserContext } from "./contexts/UserContext";
// Component Imports
import NavBar from './components/NavBar/NavBar'
import SignInForm from "./components/SignInForm/SignInForm"
import SignUpForm from "./components/SignUpForm/SignUpForm";
import Student from "./components/Student/Student"


const App = () => {
  const { user } = useContext(UserContext);
  const [users, setUsers] = useState([]);

  // useEffect(() => {
  //   const fetchValues = async () => {
  //     try {
  //       if (user) {
  //         const fetchedValues = await valuesService.show(user._id);

  //         if (!fetchedValues) {
  //           console.log("No values returned");  // Debug log
  //           return;
  //         }
  //         setValuesResults(fetchedValues);
  //       }
  //     } catch (err) {
  //       console.log("Error fetching values:", err);
  //     }
  //   };

  //   fetchValues();
  // }, [user]);




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


        </Routes>
      </main>
    </div>

  )
}

export default App
