import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
import { slugify } from "transliteration";

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
    return Games.insert({
      name,
      slug: slugify(name, { replace: { ".": "-" } }),
      isActive: true,
      activeQuestionId: "",
      admin: "test admin id", // TODO add admin parameter
      createdAt: Date.now(),
    });
  },
  "games.setActiveQuestion"({ _id, activeQuestionId }) {
    return Games.update(_id, { $set: { activeQuestionId } });
  },
  "games.resetActiveQuestion"(_id) {
    return Games.update(_id, { $set: { activeQuestionId: "" } });
  },
});

export { Games };
