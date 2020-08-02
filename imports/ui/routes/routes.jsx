import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { FrontPage } from "../setup/FrontPage";
import { AdminPage } from "../admin/AdminPage";
import { AccountPage } from "../accounts/AccountPage";
import { GamePage } from "../game/GamePage";
import { Logout } from "../accounts/Logout";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/">
        <FrontPage />
        <AdminPage />
        <AccountPage />
      </Route>
      <Route path="/:id">
        <GamePage />
        <Logout />
      </Route>
      <Route>
        <Redirect to="/" />
      </Route>
    </Switch>
  </BrowserRouter>
);

export { Routes };
