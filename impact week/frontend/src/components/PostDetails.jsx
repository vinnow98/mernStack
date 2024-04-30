import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import getUsername from "../utils/getUsername";
import getUserID from "../utils/getUserID";
import dateTimeFormatter from "../utils/dateTimeFormatter";

const PostDetails = ({ post }) => {
  function handleComment(e, postId, commentText) {
    if (e.key === "Enter" && commentText) {
      axios
        .post("http://localhost:3000/post/comments", {
          comment: commentText,
          postID: postId,
          username: getUsername(),
          userID: getUserID(),
        })
        .then(() => {
          e.target.value = "";
          window.location.reload();
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }


  return (
    <div>
      {post.map((data, index) => (
        <div className="row align-items-center shadow mb-3" key={index}>
          <div className="col-8">
            <div className="lead">
              <strong>
                {getUserID() && getUserID() === data.userID ? (
                  <>You</>
                ) : (
                  <>{data.username}</>
                )}
              </strong>
              <span className="fst-italic"> posted on</span>
              <br />
              <div className="fs-6">{dateTimeFormatter(data.updatedAt)}</div>
              <div className="post p-2 mark mb-2">
                <strong>{data.title}</strong>
                <br />
                {data.postText}
              </div>
              {data.url ? (
                <div>
                  <a href={data.url}>Read more</a>
                </div>
              ) : (
                <></>
              )}
            </div>
            <div>
              {!data.comments ? (
                <></>
              ) : (
                data.comments.map((comment, commentIndex) => (
                  <div key={commentIndex} className="ms-3 mb-2 small">
                    {getUserID() === comment.userID ? (
                      <>You </>
                    ) : (
                      <>{comment.username} </>
                    )}
                    commented: "{comment.comment}"
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="col-4">
            {getUserID() && getUserID() === data.userID ? (
              <>
                <Link
                  to={`/update/${data._id}`}
                  className="btn btn-sm btn-primary me-2"
                >
                  Edit
                </Link>
                <Link
                  to={`/delete/${data._id}`}
                  className="btn btn-sm btn-danger"
                >
                  Delete
                </Link>
              </>
            ) : (
              <></>
            )}
          </div>
          {getUserID() && data._id ? (
            <input
              type="text"
              name="comment"
              placeholder="Add your comment here!"
              className="col-8 mb-3 ms-2"
              onKeyPress={(e) => {
                handleComment(e, data._id, e.target.value);
              }}
            />
          ) : (
            <></>
          )}
        </div>
      ))}
    </div>
  );
};

export default PostDetails;
