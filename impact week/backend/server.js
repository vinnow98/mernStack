require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cookieParser = require("cookie-parser");
const{checkAuth}=require("./AuthMiddleware/CheckAuth")
const app = express();
app.use(cookieParser());
const routes = require("./routes/routes");
const cors = require("cors");
//app.use is a middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    optionsSuccessStatus:200
  })
);
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
