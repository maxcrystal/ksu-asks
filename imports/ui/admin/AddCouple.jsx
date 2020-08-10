import React, { useRef } from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";

import Button from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import AddIcon from "@material-ui/icons/AddCircle";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(1),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    "& > *": { margin: theme.spacing(1), marginLeft: 0 },
  },
  input: { flex: 1 },
}));

const AddCouple = () => {
  const userId = useTracker(() => Meteor.userId(), []);
  const hisNameInput = useRef();
  const herNameInput = useRef();
  const classes = useStyles();

  const handleAddCoupleClick = e => {
    e.preventDefault();
    const he = hisNameInput.current.value.trim();
    const she = herNameInput.current.value.trim();
    if (he.length === 0 || she.length === 0) {
      return;
    }

    Meteor.call("couples.insert", {
      he,
      she,
      nextCoupleId: "",
      gameId: userId,
      gameSlug: userId,
    });
    hisNameInput.current.value = "";
    herNameInput.current.value = "";
  };

  return (
    <>
      <div className={classes.root}>
        <TextField
          className={classes.input}
          id="his-name"
          label="Он"
          inputProps={{ ref: hisNameInput }}
          autoComplete="off"
          helperText="Добавьте пару"
        />
        <TextField
          className={classes.input}
          id="her-name"
          label="Она"
          inputProps={{ ref: herNameInput }}
          autoComplete="off"
        />
        <Button color="primary" onClick={handleAddCoupleClick}>
          <AddIcon />
        </Button>
      </div>
    </>
  );
};

export { AddCouple };
