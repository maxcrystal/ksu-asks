import React from "react";
import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import { useTracker } from "meteor/react-meteor-data";

import Button from "@material-ui/core/Button";
import ExitIcon from "@material-ui/icons/ExitToApp";

const Logout = () => {
  const userId = useTracker(() => Meteor.userId(), []);

  const handleLogout = () => {
    Accounts.logout();
    Session.set("isSidePageOpen", false);
  };

  if (!userId) {
    return null;
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Button
        variant="contained"
        onClick={handleLogout}
        style={{ marginBottom: "1rem", marginTop: "2rem" }}
      >
        <ExitIcon style={{ marginRight: ".5rem" }} />
        Выйти из аккаунта
      </Button>
    </div>
  );
};

export { Logout };
