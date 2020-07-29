import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";

const Questions = new Mongo.Collection("questions");

/**
 * _id
 * text: string
 * isActive: bool
 */

if (Meteor.isServer) {
  Meteor.publish("questions", () => {
    return Questions.find();
  });
}

Meteor.methods({
  "questions.insert"({ text }) {
    Questions.insert({
      text,
      createdAt: new Date().valueOf(),
    });
  },
});

export { Questions };
