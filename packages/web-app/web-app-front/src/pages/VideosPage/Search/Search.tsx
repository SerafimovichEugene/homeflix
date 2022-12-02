import React, { FC, useState } from "react";
import { Button, Form, Stack } from "react-bootstrap";

interface SearchProps {
  setSearch: (value: string) => void;
}

export const Search: FC<SearchProps> = ({ setSearch }) => {
  const [input, setInput] = useState("");
  const handleSubmit = () => {
    setSearch(input);
  };

  return (
    <Stack direction="horizontal" gap={3}>
      <Form.Control
        type="search"
        placeholder="find.."
        aria-label="Search"
        onChange={(event) => {
          console.log(event.target.value);
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
