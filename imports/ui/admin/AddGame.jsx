import React, { useRef } from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";

import { Couples } from "../../api/couples";

const AddGame = () => {
  const couples = useTracker(() => {
    const userId = Meteor.userId();
    const subscription = Meteor.subscribe("couples", { gameSlug: userId });
    const couples = Couples.find({ gameId: userId }).fetch();
    return couples;
  }, []);
  const gameNameInput = useRef();

  const handleOkClick = e => {
    e.preventDefault();

    const newGameName = gameNameInput.current.value.trim();
    if (newGameName.length === 0) {
      return;
    }

    Meteor.call(
      "games.insert",
      { name: newGameName },
      (error, { gameId, gameSlug }) => {
        if (error) {
          throw new Meteor.Error(error.reason);
        }
        console.log("new game id", gameId);
        Meteor.call("couples.assignGame", { gameId, gameSlug });
      }
    );

    gameNameInput.current.value = "";
  };

  if (couples.length < 2) {
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
