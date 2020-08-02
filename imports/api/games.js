import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
import { slugify } from "transliteration";
import SimpleSchema from "simpl-schema";

const Games = new Mongo.Collection("games");

/**
 * _id,
 * name: string
 * slug: sanitized unique name
 * activeQuestionId: question id
 * admin: userId
 */

if (Meteor.isServer) {
  Meteor.publish("games", () => {
    return Games.find(); // TODO return only current game (store id in session storage)
  });
}

Meteor.methods({
  "games.insert"({ name }) {
    const schema = new SimpleSchema({
      name: { type: String, min: 1 },
    });
    schema.clean({ name });
    schema.validate({ name });

    return Games.insert({
      name,
      slug: slugify(name, { replace: { ".": "-" } }),
      isActive: true,
      activeQuestionId: "",
      admin: "test admin id", // TODO add admin parameter
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  },
  "games.finishGame"({ _id }) {
    new SimpleSchema({ _id: { type: String, min: 1 } }).validate({ _id });

    return Games.update(_id, { $set: { isActive: false } });
  },
  "games.setActiveQuestion"({ _id, activeQuestionId }) {
    const schema = new SimpleSchema({
      _id: { type: String, min: 1 },
      activeQuestionId: { type: String, min: 1 },
    });
    schema.validate({ _id, activeQuestionId });

    return Games.update(_id, {
      $set: { activeQuestionId, updatedAt: Date.now() },
    });
  },
  "games.resetActiveQuestion"({ _id }) {
    const schema = new SimpleSchema({
      _id: { type: String, min: 1 },
    });
    schema.validate({ _id });

    return Games.update(_id, {
      $set: { activeQuestionId: "", updatedAt: Date.now() },
    });
  },
});

export { Games };
