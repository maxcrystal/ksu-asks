import React from "react";
import { Meteor } from "meteor/meteor";

import { AddGame } from "./AddGame";
import { AddCouple } from "./AddCouple";
import { CoupleList } from "./CoupleList";

const AdminPage = () => {
  return (
    <div>
      <hr />
      <p>AdminPage Content Here (visible to admins only)</p>
      <CoupleList />
      <AddCouple />
      <hr />
      <AddGame />
      <button>New Game</button>
    </div>
  );
};

export { AdminPage };
