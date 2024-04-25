import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [post, showPost] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/posts").then((postResult) => {
      axios
        .get("http://localhost:3000/comments")
        .then((commentResult) => {
          const postWithComments = postResult.data.map((post) => ({
            ...post,
            comments: commentResult.data.filter(
              (comment) => comment.id === post.id
            ),
          }));
          showPost(postWithComments);
          
        })
        .catch((err) => {
          console.log(err.message);
        });
    })
  }, []);

   function handleComment(e, postId, commentText) {
     if (e.key == "Enter") {
       const newComment = {
         id: postId,
         comment: commentText,
       };
       axios
         .post("http://localhost:3000/comments", newComment)
         .then((result) => {
           console.log(result);
            e.target.value = "";
            window.location.reload();
         })
         .catch((err) => {
           console.log(err.message);
         });
     }
   }

  return (
    <div className="d-flex flex-column align-items-center bg-light vh-100">
      <h1 className="">Homepage</h1>
      <div className="w-75 rounded bg-white shadow border p-4">
        <div className="d-flex justify-content-end">
          <Link to="/create" className="btn btn-success">
            Make a Post!
          </Link>
        </div>

        {post.map((data, index) => (
          <div className="row align-items-center" key={index}>
            <div className="col-8">
              <div className="lead">
                <strong>{data.Username}</strong>
                <span className="fst-italic"> posted</span>
                {/* <em> posted:</em> */}
                <br />
                <div className="post p-2 mark mb-2">{data.PostText}</div>
              </div>
              <div>
                {data.comments.map((comment, commentIndex) => (
                  <div key={commentIndex} className="ms-3 mb-2 small">
                    "{comment.comment}"
                  </div>
                ))}
              </div>
              <input
                type="text"
                name="comment"
                id="comment"
                placeholder="add your comment here!"
                onKeyPress={(e) => {
                  handleComment(e, data.id, e.target.value);
                }}
              />
            </div>
            <div className="col-4">
              <Link
                to={`/update/${data.id}`}
                className="btn btn-sm btn-primary me-2"
              >
                Edit
              </Link>
              <Link to={`/delete/${data.id}`} className="btn btn-sm btn-danger">
                Delete
              </Link>
            </div>

            <p></p>
            <p></p>
          </div>
        ))}
      </div>
    </div>
  );
};


export default Home;
