import React, { FC } from "react";
import { Pagination } from "react-bootstrap";

interface PaginatorProps {
  videosCount: number;
  videosLimit: number;
  changePage: (number: number) => void;
  activePage: number;
}

export const Paginator: FC<PaginatorProps> = ({ videosCount, videosLimit, activePage, changePage }) => {
  const pageNumbers = [];
  const allPages = Math.ceil(videosCount / videosLimit);

  if (allPages === 1) {
    return null;
  }

  for (let number = 1; number <= allPages; number += 1) {
    pageNumbers.push(
      <Pagination.Item
        key={number}
        active={number === activePage}
        onClick={() => {
          changePage(number);
        }}
      >
        {number}
      </Pagination.Item>
    );
  }

  return <Pagination style={{ flexWrap: "wrap" }}>{pageNumbers}</Pagination>;
};
