import React from "react";
import { Session } from "meteor/session";
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MoreIcon from "@material-ui/icons/MoreVert";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import { Timer } from "./game/Timer";

const useStyles = makeStyles(theme => ({
  avatar: { margin: theme.spacing(1) },
  title: { flexGrow: 1 },
}));

const TopBar = () => {
  const classes = useStyles();

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
        />
        <Typography className={classes.title} variant="h6" noWrap>
          Ксюша спрашивает...
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
