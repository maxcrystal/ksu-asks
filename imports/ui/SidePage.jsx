import React from "react";
import { Session } from "meteor/session";
import { useTracker } from "meteor/react-meteor-data";

import Drawer from "@material-ui/core/SwipeableDrawer";
import Container from "@material-ui/core/Container";

import { AdminPage } from "./admin/AdminPage";
import { AccountPage } from "./accounts/AccountPage";

const SidePage = () => {
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
    >
      <Container
        style={{
          width: "90vw",
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <AdminPage />
        <AccountPage />
      </Container>
    </Drawer>
  );
};

export { SidePage };
