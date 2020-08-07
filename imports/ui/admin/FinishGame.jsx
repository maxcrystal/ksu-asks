import React from "react";
import { Meteor } from "meteor/meteor";
import { useHistory } from "react-router-dom";

import Button from "@material-ui/core/Button";
import CheckIcon from "@material-ui/icons/CheckCircleOutline";

const FinishGame = ({ game }) => {
  const history = useHistory();

  const handelFinishGameClick = game => {
    Meteor.call("games.finishGame", { _id: game._id });
    history.push("/"); // TODO present and copy results to the clipboard
  };

  return (
    <div style={{ display: "flex", marginTop: "1rem" }}>
      <Button
        variant="contained"
        onClick={() => handelFinishGameClick(game)}
        style={{ flexGrow: 1 }}
      >
        <CheckIcon style={{ marginRight: ".5rem" }} />
        Завершить игру
      </Button>
    </div>
  );
};

export { FinishGame };
