import React from "react";
import {Link} from "react-router-dom"
import Yumi from "../assets/Yumi.png"
import getUsername from "../utils/getUsername";
import logout from "../utils/logout";

const Navbar = ({ NavbarHeader }) => {
  const username = getUsername()
  return (
    <>
      <div className="d-flex align-items-center col-12 bg-dark text-light position-fixed p-3">
        <div className="d-flex justify-content-start col-3">
          <img src={Yumi} alt="Yumilogo" className="col-6 rounded" />
        </div>
        <div className="d-flex justify-content-center col-6">
          <h2 className="">
            {username ? `${username}'s homepage` : "Guest User"}
          </h2>
        </div>
        <div className="d-flex justify-content-end col-3">
          {username ? (
            <button onClick={logout} className="btn btn-primary">Log Out</button>
          ) : (
            <Link to="/login" className="btn btn-primary">
              Log in!
            </Link>
          )}
        </div>
      </div>
      <div className="p-5"></div>
    </>
  );
};

export default Navbar;
