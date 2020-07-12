import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import logo from "./logo.svg";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import { LinkContainer } from "react-router-bootstrap";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Container className="p-3">
        <Jumbotron>
          <h1 className="header">
            Welcome To React-Bootstrap TypeScript Example
          </h1>
          <h2>
            Current Page is{" "}
            <Switch>
              <Route path="/about"></Route>
              <Route path="/users"></Route>
              <Route path="/"></Route>
            </Switch>
          </h2>
          <h2>
            Navigate to{" "}
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
          </h2>
        </Jumbotron>
      </Container>
    </BrowserRouter>
  );
};

export default App;
