const express = require("express");
const routes = express.Router();
const controller = require("../controller/controller");

routes.get("/", controller.getAlldata);
routes.get("/:id", controller.getData);
routes.post("/", controller.postData);
routes.delete("/:id", controller.deleteData);
routes.patch("/:id", (req, res) => {
  res.json({ mssg: `This is vpatching workout ${req.params.id}` });
});

module.exports = routes;
