import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";

import "../imports/startup/mongodb-configuration";
import "../imports/startup/simpl-schema-configuration";

import "../imports/api/questions";
import "../imports/api/answers";
import "../imports/api/couples";
import "../imports/api/games";
import "../imports/api/timers";
import "../imports/api/users";

import { Questions } from "../imports/api/questions";

Meteor.startup(() => {
  // Testing user credentials
  if (!Accounts.findUserByEmail("test@example.com")) {
    Accounts.createUser({
      email: "test@example.com",
      password: "password",
    });
    console.log("Testing user is set up");
  }

  // If the Questions collection is empty, add some data.
  if (Questions.find().count() === 0) {
    Assets.getText("questions.txt", (error, questions) => {
      questions.split("\n").forEach(q =>
        Questions.insert({
          text: q,
        })
      );
      console.log("Questions are set");
    });
  }
});
