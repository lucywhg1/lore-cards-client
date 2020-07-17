import React from "react";

import { Container, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import logo from "./logo.svg";
import InfoCardForm from "./components/info_cards/form/Form";

const Home: React.FC = () => {
  return (
    <>
      <Container className="p-2 bg-info text-light d-flex" fluid>
        <img
          alt="logo"
          src={logo}
          width="30"
          height="30"
          className="align-self-center ml-1 mr-auto border border-light rounded"
        />
        <LinkContainer to="/">
          <Button>Home</Button>
        </LinkContainer>
        <LinkContainer to="/cards/new">
          <Button>New Card</Button>
        </LinkContainer>
      </Container>
      <InfoCardForm />
    </>
  );
};

export default Home;
