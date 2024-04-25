import axios from 'axios';
import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom';



const Create = () => {
    const navigate = useNavigate()
   const [value,useValue] = useState({
    Username:"",
    PostText: ""
   })
   const handleSubmit = (e) => {
    e.preventDefault()
     axios.post("http://localhost:3000/posts",value).then((result) => {
           navigate("/");
     }).catch((err) => {
     console.log(err.message)
     });;
   };
  return (
    <div className="d-flex flex-column align-items-center justify-content-center bg-light vh-100">
      <div className="d-flex flex-column justify-content-center w-75 rounded bg-white shadow border p-4">
        <h1>New Post</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label htmlFor="username">Username: </label>
            <input
            name='username'
            id='username'
              type="text"
              className="form-control"
              placeholder="Enter your username..."
              onChange={e =>{
                    useValue({Username: e.target.value})
                }
              }
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
                onChange={e =>{
                    useValue({...value,  PostText: e.target.value})
                }
            }
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
}

export default Create
