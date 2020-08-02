import React from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";

const FrontPage = () => {
  const userId = useTracker(() => Meteor.userId(), []);

  if (userId) {
    return null;
  }

  return (
    <div>
      <h2>FrontPage Content</h2>
      <h3>Rules</h3>
      <p>
        Login or Signup to setup a new game or wait for a url from your game
        admin.
      </p>
      <h3>Last Games</h3>
      <p>A list of last games here.</p>
    </div>
  );
};

export { FrontPage };
