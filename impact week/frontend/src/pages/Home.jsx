import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import PostDetails from "../components/PostDetails";
import getUserID from "../utils/getUserID";
import getNews from "../utils/getNews";


const Home = () => {
  const [post, showPost] = useState([]);
  const [news, showNews] = useState([]);
 
 
  useEffect(() => {
    getNews()
      .then((result) => {
        showNews(result)
      })
      .catch((err) => {
        console.log(err.message)
      });
    axios
      .get(
        "http://localhost:3000/",
        { headers: { "Content-Type": "application/json" 
      }},
        { withCredentials: true }
      )
      .then((postResult) => {
        axios
          .get(
            "http://localhost:3000/comments",
            { headers: { "Content-Type": "application/json" } },
            { withCredentials: true }
          )
          .then((commentResult) => {
            const postWithComments = postResult.data.map((post) => ({
              ...post,
              comments: commentResult.data.filter(
                (comment) => comment.postID === post._id
              ),
            }));
          showPost(postWithComments);
          })
          .catch((err) => {
            console.log(err.message);
          });
      });
  }, []);
    const combinedData = [...post, ...news].sort((a, b) => {
      const dateA = new Date(a.updatedAt);
      const dateB = new Date(b.updatedAt);
      return dateB - dateA; // Sort in descending order
    });
  return (
    <div className="d-flex flex-column align-items-center bg-light vh-100">
     
     
      <div className="w-75 rounded bg-white shadow border p-4">
        <div className="d-flex justify-content-end">
          {getUserID()?(<Link to="/create" className="btn btn-success mb-2">
            Make a Post!
          </Link>):<></>}
          
        </div>
        <PostDetails post={combinedData} />
      </div>
    </div>
  );
};

export default Home;
