import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie"

const Login = () => {
  const navigate = useNavigate();
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!username||!password){
        return
    }
    axios
      .post(
        "http://localhost:3000/post/login/",
        {
          username: username,
          password: password,
        },{
          withCredentials:true
        }
      )
      .then((response) => {
        const token = response.data.token
        console.log(token + "from login")
          Cookies.set("token", token,{expires:1});
           navigate("/");
           window.location.reload();
       
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <div className="d-flex flex-column align-items-center justify-content-center bg-light vh-100">
      <div className="d-flex flex-column justify-content-center w-75 rounded bg-white shadow border p-4">
        <h1>Log in!</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label htmlFor="username">Username: </label>
            <input
              name="username"
              id="username"
              type="text"
              className="form-control"
              placeholder="Enter your Username!"
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
              placeholder="Enter your password."
              required
              value={password}
              onChange={(e) => {
                setpassword(e.target.value);
              }}
            />
          </div>
          <div className="fs-6 mb-3">
            Not a user? {<Link to="/signup">Sign Up</Link>} here!
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

export default Login;
