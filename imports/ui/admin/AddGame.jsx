import React, { useRef } from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import { Session } from "meteor/session";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

import { Couples } from "../../api/couples";
import { copyLinks } from "./ShareLinks";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  input: { flex: 1, marginRight: theme.spacing(1) },
}));

const AddGame = () => {
  const couples = useTracker(() => {
    const userId = Meteor.userId();
    const subscription = Meteor.subscribe("couples", { gameSlug: userId });
    const couples = Couples.find({ gameId: userId }).fetch();
    return couples;
  }, []);
  const gameNameInput = useRef();
  const classes = useStyles();

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
        Meteor.call("couples.assignGame", { gameId, gameSlug });
        Meteor.call("timers.insert", { gameSlug });
        copyLinks({ gameSlug, couples });
        // Session.set("isSidePageOpen", false); FIXME copyLinks doesn't work
      }
    );

    gameNameInput.current.value = "";
  };

  if (couples.length < 2) {
    return null;
  }
  return (
    <div className={classes.root}>
      <TextField
        className={classes.input}
        id="game-name"
        label="Название игры"
        helperText="Чтобы начать игру, назовите ее и жмите ОК"
        type="email"
        inputProps={{ ref: gameNameInput }}
        autoComplete="off"
      />
      <Button variant="contained" color="primary" onClick={handleOkClick}>
        ОК
      </Button>
    </div>
  );
};

export { AddGame };
