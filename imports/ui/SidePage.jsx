import React from "react";
import { Session } from "meteor/session";
import { useTracker } from "meteor/react-meteor-data";

import Drawer from "@material-ui/core/SwipeableDrawer";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

import { AdminPage } from "./admin/AdminPage";
import { AccountPage } from "./accounts/AccountPage";

const useStyles = makeStyles(theme => ({
  scrollable: {
    height: "100%",
    display: "block",
    overflowY: "scroll",
    WebkitOverflowScrolling: "touch",
  },
}));

const SidePage = () => {
  const classes = useStyles();
  const isSidePageOpen = useTracker(() => Session.get("isSidePageOpen"), []);
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

  const toggleDrawer = () => {
    Session.set("isSidePageOpen", !isSidePageOpen);
  };

  return (
    <Drawer
      disableBackdropTransition={!iOS}
      disableDiscovery={iOS}
      anchor="right"
      open={isSidePageOpen}
      onClose={() => toggleDrawer()}
      onOpen={() => toggleDrawer()}
      classes={{ paper: classes.scrollable }}
    >
      <Container
        style={{
          width: "90vw",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <AdminPage />
        <AccountPage />
      </Container>
    </Drawer>
  );
};

export { SidePage };
