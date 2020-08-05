import React from "react";
import { Meteor } from "meteor/meteor";
import { useHistory } from "react-router-dom";

const FinishGame = ({ game }) => {
  const history = useHistory();

  const handelFinishGameClick = game => {
    Meteor.call("games.finishGame", { _id: game._id });
    history.push("/"); // TODO present and copy results to the clipboard
  };

  return (
    <div>
      <h3>FinishGame:</h3>
      <button onClick={() => handelFinishGameClick(game)}>
        Завершить игру
      </button>
    </div>
  );
};

export { FinishGame };
