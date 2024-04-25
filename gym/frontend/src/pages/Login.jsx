import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddWorkout = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [reps, setReps] = useState("");
  const [load, setLoad] = useState("");
  async function handleSubmit(e) {
    e.preventDefault();
    await axios
      .post("http://localhost:4000/", {
        title: title,
        reps: reps,
        load: load,
      })
      .then((result) => {
        console.log(result);
        navigate("/");
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
  function handleGoBack() {
    navigate("/");
  }
  return (
    <div
      className="d-flex flex-column
        align-items-center mx-auto shadow rounded col-10 "
    >
      <div className="fw-bold m-3 bg-secondary p-3 col-3 text-center text-light rounded shadow">
        Log in
      </div>
      <form onSubmit={handleSubmit}>
        <div
          className="d-flex
        flex-column align-items-end"
        >
          <label htmlFor="title" className="mb-3">
            Title:{" "}
            <input
              type="text"
              className="ms-3"
              placeholder="Name of workout"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </label>
          <label htmlFor="reps" className="mb-3">
            Reps (KG):
            <input
              type="number"
              className="ms-3"
              placeholder="Number of Reps"
              value={reps}
              onChange={(e) => {
                setReps(e.target.value);
              }}
            />
          </label>
          <label htmlFor="load" className="mb-3">
            Load:
            <input
              type="number"
              className="ms-3"
              placeholder="Weight of Load"
              value={load}
              onChange={(e) => {
                setLoad(e.target.value);
              }}
            />
          </label>
        </div>
        <div className="d-flex gap-4 ms-5 mb-5">
          <button type="submit" className="btn btn-success">
            Submit
          </button>
          <button type="btn" className="btn btn-danger" onClick={handleGoBack}>
            Go back
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddWorkout;
