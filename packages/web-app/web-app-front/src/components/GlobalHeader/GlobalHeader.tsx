import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useVideos } from "../../data/api";
import { DEFAULT_PAGE, DEFAULT_LIMIT } from '../../globalConstants';
import "./styles.css";

const GlobalHeader: React.FC = () => {
  const [page] = useState(DEFAULT_PAGE);

  const { useVideosList } = useVideos();

  const [search, setSearch] = useState("");

  const { refetch } = useVideosList({
    page,
    limit: DEFAULT_LIMIT,
    ...(search ? { search } : {}),
  });

  return (
    <div className="container-fluid header-container">
      <nav className="navbar bg-light">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            Homeflix
          </Link>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={(event) => {
                setSearch(event.target.value);
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  refetch();
                }
              }}
            />
            <button className="btn btn-outline-success" type="submit" onClick={() => refetch()}>
              Search
            </button>
          </form>
        </div>
      </nav>
    </div>
  );
};

export default GlobalHeader;
