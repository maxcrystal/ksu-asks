import React from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";

import { AddGame } from "./AddGame";
import { AddCouple } from "./AddCouple";
import { CoupleList } from "./CoupleList";
import { ShareLinks } from "./ShareLinks";
import { FinishGame } from "./FinishGame";
import { Games } from "../../api/games";

const AdminPage = () => {
  const { userId, game } = useTracker(() => {
    const userId = Meteor.userId();
    const game = Games.findOne({ isActive: true });
    return { userId, game };
  }, []);

  if (!userId) {
    return null;
  }
  return (
    <div>
      <hr />
      <h3>AdminPage Content Below (visible to admins only):</h3>
      <CoupleList />
      <AddCouple game={game} />
      <AddGame game={game} />
      <FinishGame game={game} />
      <hr />
      <ShareLinks />
    </div>
  );
};

export { AdminPage };
