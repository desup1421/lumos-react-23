import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar bg-primary">
      <div className="container">
        <Link to="/" className="navbar-brand text-white">
          <i className="bi bi-brightness-high-fill"></i> LumosBlog
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
