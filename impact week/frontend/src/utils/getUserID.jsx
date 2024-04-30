import React from "react";
import Cookies from "js-cookie";

const getUserID = () => {
  let userID;
  if (!Cookies.get("token")) {
    return;
  }
  const token = Cookies.get("token").split(".");
  if (token) {
    const decoded = JSON.parse(atob(token[1]));
    const decodeduserID = decoded.userID;
    userID = decodeduserID
  }

  return userID;
};

export default getUserID;
