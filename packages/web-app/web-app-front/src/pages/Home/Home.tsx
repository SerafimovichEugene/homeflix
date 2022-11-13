import React from "react";
import { Link, Outlet } from "react-router-dom";

const Home = () => (
  <div>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <div className="navbar" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="videos">Videos</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div className="container">
      <div className="mb-2"></div>
      <Outlet />
    </div>
  </div>
);

export default Home;
