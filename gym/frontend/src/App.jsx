import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import AddWorkout from "./pages/AddWorkout";
import Navbar from "./components/Navbar";

const App = () => {
  const location = useLocation();

  // Determine navbarHeader based on the current location
  let navbarHeader;
  switch (location.pathname) {
    case "/":
      navbarHeader = "Home";
      break;
    case "/addworkout":
      navbarHeader = "Add Workout";
      break;
    case "/login":
      navbarHeader = "Login";
      break;
    default:
      navbarHeader = "";
  }
  return (
    <div>
      <BrowserRouter>
        <Navbar navbarHeader={navbarHeader} />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/addworkout" element={<AddWorkout />} />
          <Route path="login" element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
