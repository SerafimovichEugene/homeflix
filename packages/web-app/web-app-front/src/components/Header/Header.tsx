import React, { FC } from 'react';
import { Container, Navbar } from 'react-bootstrap';
import './styles.css';

const Header: FC = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">Homeflix</Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Header;
