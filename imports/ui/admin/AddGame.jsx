import React, { useRef } from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";

import { Couples } from "../../api/couples";

const AddGame = ({ game }) => {
  const { userId, couples } = useTracker(() => {
    const userId = Meteor.userId();
    const couples = Couples.find({ gameId: userId }).fetch();
    return { userId, couples };
  }, []);
  const gameNameInput = useRef();

  const handleOkClick = e => {
    e.preventDefault();

    const newGameName = gameNameInput.current.value.trim();
    if (newGameName.length === 0) {
      return;
    }

    Meteor.call("games.insert", { name: newGameName }, (error, newGameId) => {
      console.log("new game id", newGameId);
      Meteor.call("couples.assignGame", { gameId: newGameId });
    });

    gameNameInput.current.value = "";
  };

  if (game || couples.length < 2) {
    return null;
  }
  return (
    <form>
      <span>New game: </span>
      <input type="text" ref={gameNameInput} />
      <button onClick={handleOkClick}>Ok</button>
    </form>
  );
};

export { AddGame };
