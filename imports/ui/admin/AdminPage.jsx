import React from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import { Link } from "react-router-dom";

import { Games } from "../../api/games";

import { AddGame } from "./AddGame";
import { AddCouple } from "./AddCouple";
import { CoupleList } from "./CoupleList";
import { ShareLinks } from "./ShareLinks";
import { FinishGame } from "./FinishGame";

const AdminPage = () => {
  const { userId, activeGame } = useTracker(() => {
    const userId = Meteor.userId();
    const subscription = Meteor.subscribe("admin-games");
    const activeGame = Games.findOne({ isActive: true });
    return { userId, activeGame };
  }, []);

  if (!userId) {
    return null;
  }

  if (activeGame) {
    return (
      <div>
        <p>
          Game "<Link to={activeGame.slug}>{activeGame.name}</Link>" is in
          progress.
        </p>
        <ShareLinks game={activeGame} />
        <FinishGame game={activeGame} />
      </div>
    );
  }

  return (
    <div>
      <h3>AdminPage Content (visible to admins only):</h3>
      <CoupleList />
      <AddCouple />
      <AddGame />
    </div>
  );
};

export { AdminPage };
