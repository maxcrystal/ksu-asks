import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
import SimpleSchema from "simpl-schema";

const Questions = new Mongo.Collection("questions");

/**
 * _id
 * text: string
 */

if (Meteor.isServer) {
  Meteor.publish("questions", () => {
    return Questions.find();
  });
}

Meteor.methods({
  "questions.insert"({ text }) {
    if (!Meteor.userId()) {
      throw new Meteor.Error("not-authorised");
    }

    const schema = new SimpleSchema({
      text: { type: String, min: 1 },
    });
    schema.clean();
    schema.validate();

    return Questions.insert({
      text,
      createdAt: new Date().valueOf(),
    });
  },
});

export { Questions };
