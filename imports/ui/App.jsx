import React from "react";

import { GamePage } from "./game/GamePage";
import { AdminPage } from "./admin/AdminPage";

export const App = props => {
  return (
    <div>
      <GamePage />
      <AdminPage />
    </div>
  );
};
