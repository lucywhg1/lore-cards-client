import React from "react";

import { Container, Button, Media } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import logo from "./logo.svg";
import InfoCardForm from "./components/info_cards/InfoCardForm";

const Home: React.FC = () => {
  return (
    <>
      <Container className="p-2 bg-info text-light" fluid>
        <Media>
          <img
            alt="logo"
            src={logo}
            width="30"
            height="30"
            className="align-self-center ml-1 mr-3 border border-light rounded"
          />
          <Media.Body>
            <LinkContainer to="/">
              <Button>Home</Button>
            </LinkContainer>
            <LinkContainer to="/cards/new">
              <Button>New Card</Button>
            </LinkContainer>
          </Media.Body>
        </Media>
      </Container>
      <h1>Testing</h1>
      <InfoCardForm />
    </>
  );
};

export default Home;
