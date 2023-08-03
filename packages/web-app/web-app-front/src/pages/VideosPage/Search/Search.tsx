import React, { FC, useContext, useEffect, useState } from 'react';
import { Button, Form, Stack } from 'react-bootstrap';
import { VideosPageContext, VideosPageContextInstance } from '../VidesPageContext/VideosPageContext';
import { ASC, DESC, SortByUnion } from '../../../domain';
import { SortPointer } from './SortPointer/SortPointer';

export const Search: FC = () => {
  const { search, setSearch, setPage, setSortBy, setSortTo, sortTo, sortBy } =
    useContext<VideosPageContext>(VideosPageContextInstance);

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

  const handleChangeSortBy: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    e.persist();
    console.log(e.target.value, e.target.value);
    setPage(1);
    setSortBy(() => e.target.value as SortByUnion);
  };

  const handleChangeSortTo = () => {
    const sort = sortTo === ASC ? DESC : ASC;
    setPage(1);
    setSortTo(sort);
  };

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

      <div>
        <Form.Group controlId="id1">
          <Form.Check
            type="radio"
            id="name"
            label="name"
            value="name"
            checked={sortBy === 'name'}
            onChange={handleChangeSortBy}
          />
          <Form.Check
            type="radio"
            id="creted"
            label="created"
            value="created"
            checked={sortBy === 'created'}
            onChange={handleChangeSortBy}
          />
          <Form.Check
            type="radio"
            id="size"
            label="size"
            value="size"
            checked={sortBy === 'size'}
            onChange={handleChangeSortBy}
          />
        </Form.Group>
      </div>

      <SortPointer to={sortTo} onClick={handleChangeSortTo} />
    </Stack>
  );
};
