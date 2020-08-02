import React from "react";
import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import { useTracker } from "meteor/react-meteor-data";

const Logout = () => {
  const userId = useTracker(() => Meteor.userId(), []);

  if (!userId) {
    return null;
  }
  return <button onClick={() => Accounts.logout()}>Logout</button>;
};

export { Logout };
