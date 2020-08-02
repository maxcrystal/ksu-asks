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
 * nextCoupleId
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
    if (!Meteor.userId()) {
      throw new Meteor.Error("not-authorised");
    }

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
      nextCoupleId: "",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  },
  "couples.assignGame"({ gameId }) {
    if (!Meteor.userId()) {
      throw new Meteor.Error("not-authorised");
    }

    new SimpleSchema({ gameId: { type: String, min: 1 } }).validate({ gameId });
    const userId = Meteor.userId();
    const couples = Couples.find({ gameId: userId }).fetch();
    const length = couples.length;
    for (let i = 0; i < length; i++) {
      const _id = couples[i]._id;
      const nextCoupleId = i < length - 1 ? couples[i + 1]._id : couples[0]._id;
      Couples.update(
        { _id },
        { $set: { nextCoupleId, gameId, updatedAt: Date.now() } }
      );
    }
  },
  "couples.remove"({ _id }) {
    if (!Meteor.userId()) {
      throw new Meteor.Error("not-authorised");
    }

    new SimpleSchema({ _id: { type: String, min: 1 } }).validate({ _id });

    Couples.remove({ _id });
  },
});

export { Couples };
