import React from "react";

import { Container, ButtonToolbar, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import logo from "./logo.svg";

const Home: React.FC = () => {
  return (
    <Container>
      <h1>Welcome to Lore Cards!</h1>
      <img
        alt="logo"
        src={logo}
        width="30"
        height="30"
        className="align-top ml-2 border border-dark rounded-circle"
      />
      <h2>Navigate to</h2>
      <ButtonToolbar className="custom-btn-toolbar">
        <LinkContainer to="/">
          <Button>Home</Button>
        </LinkContainer>
        <LinkContainer to="/about">
          <Button>About</Button>
        </LinkContainer>
        <LinkContainer to="/users">
          <Button>Users</Button>
        </LinkContainer>
      </ButtonToolbar>
    </Container>
  );
};

export default Home;
