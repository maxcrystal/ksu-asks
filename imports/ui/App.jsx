import React from "react";

import { GamePage } from "./game/GamePage";
import { AdminPage } from "./admin/AdminPage";
import { Login } from "./accounts/Login";

export const App = props => {
  return (
    <div>
      <GamePage />
      <AdminPage />
      <Login />
    </div>
  );
};
