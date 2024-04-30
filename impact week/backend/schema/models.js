const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  postText: {
    type: String,
    required: true,
  },
  username:{
    type:String,
    required:true
  },
  userID:{
    type:String,
    required:true
  }
},{timestamps:true});
const data = mongoose.model("post", postSchema);

const commentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
  postID: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  userID: {
    type: String,
    required: true,
  },
});

const Comment = mongoose.model("comment", commentSchema);

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("user", userSchema);

module.exports = {
  async getData() {
    const alldata = await data.find();
    return alldata;
  },
  async postData(title, postText,username,userID) {
    const createdPost = await data.create({
      title: title,
      postText: postText,
      username:username,
      userID:userID
    });
    return createdPost;
  },
  async delData(id) {
    const myData = await data.findByIdAndDelete(id);
    return myData;
  },
  async findData(id) {
    const myData = await data.findById(id);
    console.log(myData);
    return myData;
  },
  async updateData(id, title, postText) {
    const myData = await data.findByIdAndUpdate(id, {
      title: title,
      postText: postText,
    });
    return myData;
  },
  async postComment(comment, id,username,userID) {
    const newComment = await Comment.create({
      comment: comment,
      postID: id,
      username: username,
      userID: userID,
    });
    return newComment;
  },
  async getComment() {
    const allComments = await Comment.find();
    return allComments;
  },
  async newUser(username, password) {
    const newUser = await User.create({
      username: username,
      password: password,
    });
    return newUser;
  },
  async checkUser(username) {
    const checkUser = await User.findOne({
      username: username,
    });
    return checkUser;
  },

  async deleteComments(postID) {
    const myData = await Comment.findOneAndDelete({ postID: postID });
    return myData;
  },
};
