import React, { FC, useContext, useEffect, useState } from 'react';
import { Button, Form, Stack } from 'react-bootstrap';
import { VideosPageContext, VideosPageContextInstance } from '../VidesPageContext/VideosPageContext';

export const Search: FC = () => {
  const { search, setSearch, setPage } = useContext<VideosPageContext>(VideosPageContextInstance);
  const [input, setInput] = useState('');
  const handleSubmit = () => {
    setPage(1);
    setSearch(input);
  };

  useEffect(() => {
    if (search !== undefined) {
      console.log('search', search);
      console.log('input', input);
      setInput(search);
    }
  }, [search]);

  return (
    <Stack direction="horizontal" gap={3}>
      <Form.Control
        key={search}
        defaultValue={search}
        type="search"
        placeholder="find.."
        aria-label="Search"
        onChange={(event) => {
          setInput(event.target.value);
        }}
        onKeyUp={(event) => {
          if (event.key === 'Enter') {
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
