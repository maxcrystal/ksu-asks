import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";

import "../imports/startup/simpl-schema-configuration";
import "../imports/api/questions";
import "../imports/api/couples";
import "../imports/api/games";
import "../imports/api/answers";
import "../imports/api/timer";
import "../imports/api/users";

import { Questions } from "../imports/api/questions";
import { Games } from "../imports/api/games";
import { Couples } from "../imports/api/couples";
import { Answers } from "../imports/api/answers";
import { Timer } from "../imports/api/timer";

Meteor.startup(() => {
  Mongo.Collection.prototype.aggregate = function (pipelines, options) {
    const coll = this.rawCollection();
    return Meteor.wrapAsync(coll.aggregate.bind(coll))(pipelines, options);
  };

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
    console.log("Questions are set");
    for (let i = 0; i < 10; i++) {
      Questions.insert({
        text: `This is a question text number ${i}. What is your answer?`,
      });
    }
  }

  if (Timer.find().count() === 0) {
    console.log("Timer is set");
    Timer.insert({ startDate: 0, isActive: false });
  }
});
