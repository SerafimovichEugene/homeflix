import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useVideos } from "../../data/api/api";
import "./index.css";

export const Videos = () => {
  const [page] = useState(1);

  const { useVideosList } = useVideos();

  const [search, setSearch] = useState("");

  const { data, isLoading, refetch } = useVideosList({
    page,
    limit: 100,
    ...(search ? { search } : {}),
  });

  return (
    <div className="container">
      <div className="row mb-2 border-1 border-dark">
        <div className="col-8">
          <input
            className="form-control form-control-sm"
            type="text"
            placeholder="search.."
            onChange={(event) => {
              console.log(event.target.value);
              setSearch(event.target.value);
            }}
          />
        </div>
        <div className="col-4">
          <button type="button" className="btn btn-outline-success btn-sm" onClick={() => refetch()}>
            Find
          </button>
        </div>
      </div>
      {isLoading && <h6>Loading...</h6>}
      {!isLoading &&
        data &&
        data.items.map((i) => {
          return (
            <div className="row align-items-start">
              <div className="col">
                <div className="p-1 border bg-body">
                  <Link to={i.id}>{i.name}</Link>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Videos;
