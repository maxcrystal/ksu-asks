import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
import { slugify } from "transliteration";
import SimpleSchema from "simpl-schema";

const Couples = new Mongo.Collection("couples");

/**
 * _id,
 * names: object {he: string, she: string},
 * slug: sanitized name to use as parto of the links adddress
 * gameId: game id
 * createdAT
 * updatedAT
 */

if (Meteor.isServer) {
  Meteor.publish("couples", () => {
    return Couples.find(); // TODO return only cpoules for the current gameId
  });
}

Meteor.methods({
  "couples.insert"({ he, she, gameId }) {
    const schema = new SimpleSchema({
      he: { type: String, min: 1 },
      she: { type: String, min: 1 },
      gameId: { type: String, min: 1 },
    });
    schema.clean({ he, she });
    schema.validate({ he, she, gameId });

    const names = { he, she };
    const slug = slugify(`${he}-${she}`, { replace: { ".": "-" } }); // TODO check for uniqness

    return Couples.insert({
      names,
      slug,
      gameId,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  },
  "couples.assignGame"({ gameId }) {
    new SimpleSchema({ gameId: { type: String, min: 1 } }).validate({ gameId });

    return Couples.update(
      { gameId: "new-game" },
      { $set: { gameId, updatedAt: Date.now() } },
      { multi: true }
    );
  },
  "couples.remove"({ _id }) {
    new SimpleSchema({ _id: { type: String, min: 1 } }).validate({ _id });

    Couples.remove({ _id });
  },
});

export { Couples };
