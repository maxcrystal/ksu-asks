import React from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";

import { Games } from "../../api/games";

import { AddGame } from "./AddGame";
import { AddCouple } from "./AddCouple";
import { CoupleList } from "./CoupleList";
import { ShareLinks } from "./ShareLinks";
import { FinishGame } from "./FinishGame";

const AdminPage = () => {
  const { userId, activeGame } = useTracker(() => {
    const userId = Meteor.userId();
    // const subscription = Meteor.subscribe("last-games");
    const activeGame = Games.findOne({ isActive: true });
    return { userId, activeGame };
  }, []);

  const content = () => {
    if (!userId) {
      return (
        <p>
          Чтобы организовать игру надо войти или зарегистрироваться, но можно и
          подождать, когда кто-нибудь пришлет приглашение.
        </p>
      );
    } else if (activeGame) {
      return (
        <div>
          <ShareLinks game={activeGame} />
          <FinishGame game={activeGame} />
        </div>
      );
    } else {
      return (
        <div>
          <CoupleList />
          <AddCouple />
          <AddGame />
        </div>
      );
    }
  };

  return (
    <div>
      <h2>AdminPage:</h2>
      {content()}
    </div>
  );
};

export { AdminPage };
