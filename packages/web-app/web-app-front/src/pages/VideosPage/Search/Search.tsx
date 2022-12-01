import React, { FC } from "react";
import { Button, Form, Stack } from "react-bootstrap";

interface SearchProps {
  setSearch: (value: string) => void;
  search: () => void;
}

export const Search: FC<SearchProps> = ({ setSearch, search }) => {
  return (
    <Stack direction="horizontal" gap={3}>
      <Form.Control 
        type="search" 
        placeholder="find.." 
        aria-label="Search" 
        onChange={(event) => {
          setSearch(event.target.value);
        }}
        onSubmit={search} />
      <Button variant="primary" type="submit" onClick={search}>
        Submit
      </Button>
    </Stack>
  );
};
