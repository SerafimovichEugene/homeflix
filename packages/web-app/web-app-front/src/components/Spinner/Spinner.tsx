import React, { FC } from "react";
import { Spinner } from "react-bootstrap";

export const CustomSpinner: FC = () => {
  return (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
};
