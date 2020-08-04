import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { AdminPage } from "../admin/AdminPage";
import { AccountPage } from "../accounts/AccountPage";
import { GamePage } from "../game/GamePage";
import { SetupPage } from "../common/SetupPage";

const Routes = () => (
  <BrowserRouter>
    <Route exact path={["/", "/:gameSlug", "/:gameSlug/:coupleSlug"]}>
      <SetupPage />
      <AccountPage />
      <AdminPage />
      <GamePage />
    </Route>
  </BrowserRouter>
);

export { Routes };
