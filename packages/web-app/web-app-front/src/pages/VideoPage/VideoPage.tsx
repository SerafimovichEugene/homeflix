import React, { FC } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import "./index.css";

const Video: FC = () => {
  const { id } = useParams();
  return (
    <Container>
      <Row>
        <h6>My id: {id}</h6>
      </Row>
      <Row>
        <Col>
          <video controls className="video">
            <source src={`/api/videos/${id}`} type="video/mp4" />
          </video>
        </Col>
      </Row>
    </Container>
  );
};

export default Video;
