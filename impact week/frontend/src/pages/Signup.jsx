import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/post/user", {
        username: username,
        password: password,
      })
      .then((result) => {
        navigate("/login");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <div className="d-flex flex-column align-items-center justify-content-center bg-light vh-100">
      <div className="d-flex flex-column justify-content-center w-75 rounded bg-white shadow border p-4">
        <h1>New User</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label htmlFor="username">Username: </label>
            <input
              name="username"
              id="username"
              type="text"
              className="form-control"
              placeholder="Create a Username!"
              value={username}
              onChange={(e) => {
                setusername(e.target.value);
              }}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              name="password"
              id="password"
              className="form-control"
              placeholder="Create a password."
              required
              value={password}
              onChange={(e) => {
                setpassword(e.target.value);
              }}
            />
          </div>

          <button type="submit" className="btn btn-success">
            Submit
          </button>
          <Link to="/" className="btn btn-primary ms-3">
            Back
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Signup;
