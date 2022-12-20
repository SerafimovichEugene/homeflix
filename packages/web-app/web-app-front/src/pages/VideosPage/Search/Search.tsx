import React, { FC, useContext, useState } from "react";
import { Button, Form, Stack } from "react-bootstrap";
import { VideosPageContext, VideosPageContextInstance } from "../VidesPageContext/VideosPageContext";

export const Search: FC = () => {
  const { search, setSearch, setPage } = useContext<VideosPageContext>(VideosPageContextInstance);
  const [input, setInput] = useState("");
  const handleSubmit = () => {
    setPage(1);
    setSearch(input);
  };

  return (
    <Stack direction="horizontal" gap={3}>
      <Form.Control
        defaultValue={search}
        type="search"
        placeholder="find.."
        aria-label="Search"
        onChange={(event) => {
          setInput(event.target.value);
        }}
        onKeyUp={(event) => {
          if (event.key === "Enter") {
            handleSubmit();
          }
        }}
      />
      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Submit
      </Button>
    </Stack>
  );
};
