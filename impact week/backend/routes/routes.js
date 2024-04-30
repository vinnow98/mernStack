const express = require("express");
const route = express.Router();
const controller = require("../controller/controller");
const {checkAuth} = require("../AuthMiddleware/CheckAuth")

route.get("/",controller.homePage);
route.post("/post",checkAuth,controller.post);
route.delete("/del/post/:_id", controller.deleteData);
route.get("/get/post/:_id", controller.findData);
route.put("/update/post/:_id", controller.updateData);
route.post("/post/comments", controller.newComment);
route.get("/comments", controller.getComments);
route.post("/post/signup/", controller.postSignup);
route.post("/post/login/",
controller.postLogin);
route.delete("/comments/:_id", controller.deleteComments);
route.post("/post/user", controller.postSignup);

module.exports = route;
