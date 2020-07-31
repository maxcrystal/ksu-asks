import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
import { slugify } from "transliteration";

const Couples = new Mongo.Collection("couples");

/**
 * _id,
 * names: object {he: string, she: string},
 * slug: sanitized name to use as parto of the links adddress
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
    const slug = slugify(`${he}-${she}`, { replace: { ".": "-" } }); // TODO check for uniqness

    Couples.insert({
      names,
      slug,
      gameId,
      createdAt: Date.now(),
    });
  },
  "couples.remove"({ _id }) {
    // TODO validate

    Couples.remove({ _id });
  },
});

export { Couples };
