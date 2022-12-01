import React, { FC } from "react";

type PaginatorProps = {
  videosCout: number;
  videosLimit: number;
  changePage: (number: number) => void;
  activePage: number;
};

export const Paginator: FC<PaginatorProps> = ({ videosCout, videosLimit, changePage, activePage }) => {
  const pageNumbers = [];
  const allPages = Math.ceil(videosCout / videosLimit);

  for (let i = 1; i <= allPages; i += 1) {
    pageNumbers.push(i);
  }

  const firstPage = pageNumbers[0];
  const lastPage = pageNumbers[pageNumbers.length - 1];

  return (
    <nav aria-label="">
      <ul className="pagination">
        <li className={activePage === firstPage ? "page-item disabled" : "page-item"}>
          <a
            onClick={() => {
              changePage(activePage - 1);
            }}
            className="page-link"
            href="#"
          >
            Previous
          </a>
        </li>
        {pageNumbers.map((pageNumber) => (
          <li key={pageNumber} className={activePage === pageNumber ? "page-item active" : "page-item"}>
            <a
              onClick={() => {
                changePage(pageNumber);
              }}
              className="page-link"
              href="#"
            >
              {pageNumber}
            </a>
          </li>
        ))}
        <li className={activePage === lastPage ? "page-item disabled" : "page-item"}>
          <a
            onClick={() => {
              changePage(activePage + 1);
            }}
            className="page-link"
            href="#"
          >
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
};
