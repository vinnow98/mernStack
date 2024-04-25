import React, { useState, useEffect } from "react";
import axios from "axios";
import WorkoutDetails from "../components/WorkoutDetails";
import Navbar from "../components/Navbar";

const Home = () => {
  const [workouts, setWorkouts] = useState([]);
  useEffect(() => {
    const response = axios
      .get("http://localhost:4000/")
      .then((result) => {
        setWorkouts(result.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  return (
    <div>
      <div className="d-flex align-items-center">
        <WorkoutDetails workout={workouts} />
      </div>
    </div>
  );
};

export default Home;
