import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import getUsername from "../utils/getUsername";
import getUserID from "../utils/getUserID";

const Create = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:3000/post",
        {
          title: title,
          postText: postText,
          username: getUsername(),
          userID: getUserID(),
        }
        ,{ headers: { cookies: Cookies.get("token") } }
      )
      .then((result) => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <div className="d-flex flex-column align-items-center justify-content-center bg-light vh-100">
      <div className="d-flex flex-column justify-content-center w-75 rounded bg-white shadow border p-4">
        <h1>New Post</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label htmlFor="username">Title: </label>
            <input
              name="username"
              id="username"
              type="text"
              className="form-control"
              placeholder="Enter your username..."
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="postText">Post Text: </label>
            <textarea
              name="postText"
              id="postText"
              cols="30"
              rows="10"
              className="form-control"
              placeholder="What are you thinking?"
              required
              value={postText}
              onChange={(e) => {
                setPostText(e.target.value);
              }}
            ></textarea>
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

export default Create;
