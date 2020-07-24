import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Home";
import InfoCardForm from "./components/info_cards/form/InfoCardForm";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/cards/new">
          <InfoCardForm />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
