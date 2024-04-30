import React from 'react'
import Cookies from "js-cookie"

const getUsername = () => {

let username
    if (!Cookies.get("token")) {
      return;
    }
    const token = Cookies.get("token").split(".");
    if (token) {
      const decoded = JSON.parse(atob(token[1]));
      const decodedUsername = decoded.username;
      const capitalisedName =
        decodedUsername[0].toUpperCase() + decodedUsername.slice(1);
        username = capitalisedName
    }

  return username
}

export default getUsername
