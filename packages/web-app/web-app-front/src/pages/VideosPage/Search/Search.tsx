import React, { useState } from "react";
import { Stack } from "react-bootstrap";
import { DEFAULT_LIMIT, DEFAULT_PAGE } from "../../../constants";
import { useVideos } from "../../../data/api/api";

export const Search = () => {
  const [page] = useState(DEFAULT_PAGE);
  const { useVideosList } = useVideos();
  const [search, setSearch] = useState("");
  const { refetch } = useVideosList({
    page,
    limit: DEFAULT_LIMIT,
    ...(search ? { search } : {}),
  });

  return (
    <Stack direction="horizontal" gap={3}>
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
              refetch().then();
            }
          }}
        />
        <button className="btn btn-outline-success" type="submit" onClick={() => refetch()}>
          Search
        </button>
      </form>
    </Stack>
  );
};
