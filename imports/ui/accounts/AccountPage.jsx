import React from "react";
import { useTracker } from "meteor/react-meteor-data";
import { Session } from "meteor/session";

import { Login } from "./Login";
import { Logout } from "./Logout";
import { Signup } from "./Signup";

const AccountPage = () => {
  const userId = useTracker(() => Meteor.userId(), []);
  const isLoginVisible = useTracker(() => Session.get("isLoginVisible"), []);

  const content = () => {
    if (userId) {
      return <Logout />;
    } else {
      return isLoginVisible ? <Login /> : <Signup />;
    }
  };

  return content();
};

export { AccountPage };
