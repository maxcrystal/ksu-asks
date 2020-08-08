import React from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import { Session } from "meteor/session";
import { useHistory } from "react-router-dom";

import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MoreIcon from "@material-ui/icons/MoreVert";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  avatar: { margin: theme.spacing(1), cursor: "pointer" },
  title: { flexGrow: 1 },
}));

const TopBar = () => {
  const classes = useStyles();
  const history = useHistory();

  const serverStatus = useTracker(() => Meteor.status(), []);
  if (serverStatus.staus === "offline") {
    console.log("Client is onffine, reconnecting...");
    Meteor.reconnect(); // TODO review how it works
  }

  const handleClick = () =>
    Session.set("isSidePageOpen", !Session.get("isSidePageOpen"));

  return (
    <AppBar position="static">
      <ToolBar>
        <Avatar
          className={classes.avatar}
          alt="Ксюша"
          src="/images/ksu.jpg"
          edge="start"
          onClick={() => history.push("/")}
        />
        <Typography className={classes.title} variant="h6" noWrap>
          Ксюша спрашивает...
          <sup>{"   "}β</sup>
        </Typography>
        <IconButton
          aria-label="меню"
          edge="end"
          color="inherit"
          onClick={handleClick}
        >
          <MoreIcon />
        </IconButton>
      </ToolBar>
    </AppBar>
  );
};

export { TopBar };
