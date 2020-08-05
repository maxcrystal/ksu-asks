import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import { AdminPage } from "./admin/AdminPage";
import { AccountPage } from "./accounts/AccountPage";
import { GamePage } from "./game/GamePage";
import { SetupPage } from "./common/SetupPage";

const App = () => {
  return (
    <BrowserRouter>
      <SetupPage />
      <AccountPage />
      <AdminPage />
      <Route path="/:gameSlug/:coupleSlug">
        <GamePage />
      </Route>
    </BrowserRouter>
  );
};

export { App };
