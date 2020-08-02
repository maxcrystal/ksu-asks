import React from "react";
import { useTracker } from "meteor/react-meteor-data";

import { AddGame } from "./AddGame";
import { AddCouple } from "./AddCouple";
import { CoupleList } from "./CoupleList";
import { ShareLinks } from "./ShareLinks";
import { FinishGame } from "./FinishGame";
import { Games } from "../../api/games";

const AdminPage = () => {
  const game = useTracker(() => {
    return Games.findOne({ isActive: true });
  });
  return (
    <div>
      <hr />
      <h3>AdminPage Content Below (visible to admins only):</h3>
      <CoupleList />
      <AddCouple />
      <hr />
      <AddGame />
      <FinishGame game={game} />
      <hr />
      <ShareLinks />
    </div>
  );
};

export { AdminPage };
