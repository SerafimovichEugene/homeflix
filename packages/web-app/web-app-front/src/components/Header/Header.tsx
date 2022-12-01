import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

const Header: React.FC = () => {
  return (
    <nav className="navbar bg-light">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          Homeflix
        </Link>
      </div>
    </nav>
  );
};

export default Header;
