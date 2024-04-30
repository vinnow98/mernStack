import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const Update = () => {
  const navigate = useNavigate();
  const id = useParams();

  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:3000/get/post/${id.id}`)
      .then((result) => {
        setTitle(result.data.title);
        setPostText(result.data.postText);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3000/update/post/${id.id}`, {
        title: title,
        postText: postText,
      })
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
        <h1>Update your post!</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label htmlFor="title">Title: </label>
            <input
              name="title"
              id="title"
              type="text"
              className="form-control"
              placeholder="Update your title..."
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
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
              placeholder="Update your post!"
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

export default Update;
