import React from "react";

import { GamePage } from "./game/GamePage";
import { AdminPage } from "./admin/AdminPage";
import { AccountPage } from "./accounts/AccountPage";

export const App = props => {
  return (
    <div>
      <GamePage />
      <AdminPage />
      <AccountPage />
    </div>
  );
};
