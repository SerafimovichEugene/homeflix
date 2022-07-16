import React from "react";
import { Link, Outlet } from "react-router-dom";

const Home = () => (
  <div>
    <nav>
      <Link to="videos">Videos</Link> | {" "}
      {/*<Link to="dashboard">Dashboard</Link>*/}
    </nav>
    <div className="content">
      <Outlet />
    </div>
  </div>
);

export default Home;
