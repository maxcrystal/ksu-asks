import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
import { slugify } from "transliteration";

const Couples = new Mongo.Collection("couples");

/**
 * _id,
 * names: object {he: string, she: string},
 * slug: sanitized name to use as parto of the links adddress
 * avatar: image
 * gameId: game id
 * createdAT
 */

if (Meteor.isServer) {
  Meteor.publish("couples", () => {
    return Couples.find(); // TODO return only cpoules for the current gameId
  });
}

Meteor.methods({
  "couples.insert"({ he, she, gameId }) {
    // TODO: validate

    const names = { he, she };
    const slug = slugify(`${he}-${she}`); // TODO check for uniqness

    Couples.insert({
      names,
      slug,
      gameId,
      createdAt: Date.now(),
    });
  },
});

export { Couples };
