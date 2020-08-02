import React from "react";
import { Meteor } from "meteor/meteor";

const handelFinishGameClick = game => {
  // TODO present and copy results to the clipboard
  Meteor.call("games.finishGame", { _id: game._id });
};

const FinishGame = ({ game }) => {
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
