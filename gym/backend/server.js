require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const routes = require("./routes/routes");
const cors = require("cors");
//app.use is a middleware
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use(routes);
mongoose
  .connect(process.env.MONG_URI)
  .then(() => {
    console.log("Database is connected!");
    app.listen(process.env.PORT, () => {
      console.log(`listening on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {});
