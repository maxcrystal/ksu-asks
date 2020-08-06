import React from "react";
import { Session } from "meteor/session";
import { useTracker } from "meteor/react-meteor-data";

import Drawer from "@material-ui/core/SwipeableDrawer";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";

import { AdminPage } from "./admin/AdminPage";
import { AccountPage } from "./accounts/AccountPage";

const SidePage = () => {
  const isSidePageOpen = useTracker(() => Session.get("isSidePageOpen"), []);

  const toggleDrawer = () => {
    Session.set("isSidePageOpen", !isSidePageOpen);
  };

  return (
    <Drawer
      anchor="right"
      open={isSidePageOpen}
      onClose={() => toggleDrawer()}
      onOpen={() => toggleDrawer()}
    >
      <Container
        style={{
          width: "100vw",
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <AdminPage />
        <Divider />
        <AccountPage />
      </Container>
    </Drawer>
  );
};

export { SidePage };
