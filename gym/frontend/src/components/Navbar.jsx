import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ NavbarHeader }) => {
  return (
    <div className="d-flex align-items-center col-12 bg-dark text-light position-fixed p-3">
      <div className="d-flex gap-5 position-absolute">
        <div className="col-1 ">Test</div>
        <div className="col-1">Test</div>
        <div className="col-1">Test</div>
      </div>
      <div className="fs-2 mx-auto text-light">{NavbarHeader}</div>
      <div className="position-absolute end-0 me-3">
        <button className="btn btn-success">
          {/* position-absolute end-0 top-0 me-3 mt-3 */}
          <Link to="/addworkout" className="text-decoration-none text-light">
            Add +
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
