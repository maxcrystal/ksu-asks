import React from "react";
import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import { useTracker } from "meteor/react-meteor-data";

import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";

useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "row-reverse",
  },
}));

const Logout = () => {
  const userId = useTracker(() => Meteor.userId(), []);
  const classes = useStyles();

  if (!userId) {
    return null;
  }
  return (
    <div className={classes.root}>
      <Button variant="contained" onClick={() => Accounts.logout()}>
        Выйти
      </Button>
    </div>
  );
};

export { Logout };
