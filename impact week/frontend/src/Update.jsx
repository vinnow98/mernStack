import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate,useParams} from "react-router-dom";

const Update = () => {
  const navigate = useNavigate();
  const id = useParams()
  const [username, setUsername]=useState("")
  const [postText, setPostText]=useState("")

  useEffect(()=>{
    axios.get(`http://localhost:3000/posts/${id.id}`).then((result) => {
        setUsername(result.data.Username)
        setPostText(result.data.PostText)
    }).catch((err) => {
        console.log(err.message)
         
    });
  },[])
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3000/posts/${id.id}`,{
        Username:username,
        PostText: postText
      } )
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
            <label htmlFor="username">Username: </label>
            <input
              name="username"
              id="username"
              type="text"
              className="form-control"
              placeholder="Update your username..."
              value={username}
              onChange={(e) => {
                setUsername(e.target.value)
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
                setPostText(e.target.value );
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
