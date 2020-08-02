import React from "react";
import { Meteor } from "meteor/meteor";

const FinishGame = ({ game }) => {
  const handelFinishGameClick = game => {
    // TODO present and copy results to the clipboard
    Meteor.call("games.finishGame", { _id: game._id });
  };

  if (!game) {
    return null;
  }
  return (
    <div>
      <button onClick={() => handelFinishGameClick(game)}>Finish Game</button>
    </div>
  );
};

export { FinishGame };
