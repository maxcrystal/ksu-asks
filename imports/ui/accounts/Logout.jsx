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
        flex: 1,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
      }}
    >
      <Button
        variant="contained"
        onClick={handleLogout}
        style={{ marginBottom: "2rem", marginTop: "1rem" }}
      >
        <ExitIcon style={{ marginRight: ".5rem" }} />
        Выйти из аккаунта
      </Button>
    </div>
  );
};

export { Logout };
