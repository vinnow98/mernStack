require("dotenv").config();
const jwt = require("jsonwebtoken");
require("../server");

const checkAuth = (req, res, next) => {
    
  const token = req.headers.cookies;
  console.log(token)
  if (token) {
    jwt.verify(token, process.env.MYSECRET, function (err, decoded) {
      if (err) {
        console.error("Error verifying token:", err.message, "blahblag");
        return res
          .status(500)
          .json({ error: "Unauthorized: Token is invalid" });
      }
      console.log(decoded);
      req.decodedToken = decoded;
      next(); // Call next() to proceed to the next middleware
    });
  } else {
    res.status(501).json({ error: "Unauthorized: You need to login first" });
  }
};

module.exports = { checkAuth };
