import React from "react";
import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import { useTracker } from "meteor/react-meteor-data";

import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

const Logout = () => {
  const userId = useTracker(() => Meteor.userId(), []);

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
        onClick={() => Accounts.logout()}
        style={{ marginBottom: "2rem" }}
      >
        Выйти из аккаунта
      </Button>
    </div>
  );
};

export { Logout };
