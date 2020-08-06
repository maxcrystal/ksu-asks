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
    const subscription = Meteor.subscribe("last-games");
    const activeGame = Games.findOne({ isActive: true });
    return { userId, activeGame };
  }, []);

  const content = () => {
    if (!userId) {
      return (
        <p>
          Чтобы играть, не нужно регистрироваться, достаточно подождать, когда
          кто-нибудь пришлет приглашение. Но чтобы организовать новую игру, надо
          войти или зарегистрироваться.
        </p>
      );
    } else if (activeGame) {
      return (
        <>
          <ShareLinks game={activeGame} />
          <FinishGame game={activeGame} />
        </>
      );
    } else {
      return (
        <>
          <AddGame />
          <AddCouple />
          <CoupleList />
        </>
      );
    }
  };

  return (
    <>
      <h3>Администрирование игры</h3>
      {content()}
    </>
  );
};

export { AdminPage };
