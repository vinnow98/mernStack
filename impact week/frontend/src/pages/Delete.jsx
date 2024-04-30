import axios from "axios";
import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const Delete = () => {
  const id = useParams();
  const navigate = useNavigate();

  const handleDelete = () => {
    axios
      .delete(`http://localhost:3000/del/post/${id.id}`)
      .then(() => {
        axios
          .get(`http://localhost:3000/comments`)
          .then((result) => {
            result.data.forEach((comment) => {
              console.log(comment.postID);
              if (id.id == comment.postID) {
                axios
                  .delete(`http://localhost:3000/comments/${comment.postID}`)
                  .then(() => {})
                  .catch((err) => {
                    console.log(err.message);
                  });
              }
            });
            navigate("/");
          })
          .catch((err) => {
            console.log(err.message);
          });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center bg-light vh-100">
      <div className="d-flex flex-column justify-content-center w-75 rounded bg-white shadow border p-4">
        <h1 className="mx-auto">Delete this post?</h1>
        <div className="d-flex justify-content-center gap-3">
          <button onClick={handleDelete} className="btn btn-success">
            Yes
          </button>
          <Link to={"/"} className="btn btn-danger">
            No
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Delete;
