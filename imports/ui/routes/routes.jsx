import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

const routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/"></Route>
    </Switch>
  </BrowserRouter>
);
