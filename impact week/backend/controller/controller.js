const Post = require("../schema/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();


module.exports = {
  async homePage(req, res) {
    await Post.getData()
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        console.log("Error getting all data!", err);
      });
  },

  async post(req, res) {
    try {
      const { title, postText,username,userID } = req.body;
      const createdPost = await Post.postData(title, postText,username,userID);
      res.json(createdPost);
    } catch (err) {
      console.log("Error posting!", err);
      res.status(500).json({ error: "Error posting data" });
    }
  },
  async deleteData(req, res) {
    await Post.delData(req.params._id)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        console.log("Error deleting on backend", err);
      });
  },
  async findData(req, res) {
    await Post.findData(req.params._id)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        console.log(err.msg);
      });
  },
  async updateData(req, res) {
    console.log(req.body);
    await Post.updateData(req.params._id, req.body.title, req.body.postText)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        console.log("Error updating on backend", err.message);
      });
  },
  async newComment(req, res) {
    try {
      const{comment,postID,username,userID} = req.body

      const myComment = await Post.postComment(comment, postID,username,userID);
      res.json(myComment);
    } catch (err) {
      console.log(err.message);
    }
  },
  async getComments(req, res) {
    try {
      const getComments = await Post.getComment();
      res.json(getComments);
    } catch (error) {
      console.error("Error fetching comments:", error);
      res.status(500).json({ error: "Failed to fetch comments" });
    }
  },
  async postSignup(req, res) {
    try {
      const { username, password } = req.body;
      console.log("backend problem?");
      hashedPassword = bcrypt.hashSync(password, 10);
      const newUser = await Post.newUser(username, hashedPassword);
      res.json(newUser);
    } catch (error) {
      res
        .status(500)
        .json({ error: `Error posting data from backend ${error.message}` });
    }
  },
  async postLogin(req, res) {
    try {
      const { username, password } = req.body;
      const newUser = await Post.checkUser(username);
      
      // Check if user exists
      if (!newUser) {
       
        return res.status(401).json({ error: "Invalid username or password" });
      }
     
      const passwordMatch = await bcrypt.compare(password, newUser.password);
 
      if (passwordMatch) {
        const token = jwt.sign({username:username,userID:newUser._id},process.env.MYSECRET,{expiresIn:"1h"})
        // res.cookie("token", token, {
        //   httpOnly: true,
        //   maxAge: 360000,
        //   sameSite: "none",
        // });
      
        res.status(200).json({ success: true,
          token:token
         });
      } else {
        console.log("Password failed!");
        res.status(401).json({ error: "Invalid username or password" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: `Error checking user from backend: ${error.message}` });
    }
  },
  async deleteComments(req, res) {
    await Post.deleteComments(req.params._id)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        console.log("Error deleting on backend", err);
      });
  },
};
