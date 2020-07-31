import React from "react";
import { Meteor } from "meteor/meteor";

import { AddGame } from "./AddGame";
import { AddCouple } from "./AddCouple";

const AdminPage = () => {
  return (
    <div>
      <hr />
      <p>AdminPage Content Here (visible to admins only)</p>
      <AddGame />
      <button>New Game</button>
      <AddCouple />
    </div>
  );
};

export { AdminPage };
