import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
import { Random } from "meteor/random";
import { slugify } from "transliteration";
import SimpleSchema from "simpl-schema";
import uid from "uid";

import { Games } from "./games";

const Couples = new Mongo.Collection("couples");

/**
 * _id,
 * names: object {he: string, she: string},
 * slug: sanitized name to use as part of the links adddress
 * gameId: game id
 * gameSlug,
 * isActive,
 * nextInCouple
 * nextCoupleId
 * createdAT
 * updatedAT
 * pinCode
 */

if (Meteor.isServer) {
  Couples.createIndex({ gameId: 1, slug: 1 }, { unique: true });
  Couples.createIndex({ pinCode: 1 }, { unique: true });

  Meteor.publish("couples", ({ gameSlug }) => {
    return Couples.find({ gameSlug });
  });
  Meteor.publish("couples-invitation", ({ pinCode }) => {
    return Couples.find({ pinCode });
  });
}

Meteor.methods({
  "couples.insert"({ he, she, gameId, gameSlug }) {
    if (!Meteor.userId()) {
      throw new Meteor.Error("not-authorised");
    }

    const schema = new SimpleSchema({
      he: { type: String, min: 1 },
      she: { type: String, min: 1 },
      gameId: { type: String, min: 1 },
      gameSlug: { type: String, min: 1 },
    });
    schema.clean({ he, she });
    schema.validate({ he, she, gameId, gameSlug });

    const names = { he, she };
    let slug = slugify(`${he}-${she}`, { replace: { ".": "-" } });

    let i = 0;
    while (Couples.find({ gameId, slug }).count() !== 0) {
      slug += i === 0 ? "-" + uid(1) : uid(1);
      i++;
    }

    let pinCode = uid(4);
    while (Couples.find({ pinCode }).count() !== 0) {
      pinCode += uid(1);
    }

    return Couples.insert({
      names,
      slug,
      gameId,
      gameSlug,
      pinCode,
      isActive: false,
      nextInCouple: Random.choice(["he", "she"]),
      nextCoupleId: "",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  },
  "couples.assignGame"({ gameId, gameSlug }) {
    if (!Meteor.userId()) {
      throw new Meteor.Error("not-authorised");
    }

    const schema = new SimpleSchema({
      gameId: { type: String, min: 1 },
      gameSlug: { type: String, min: 1 },
    });
    schema.validate({ gameId, gameSlug });

    const userId = Meteor.userId();
    const couples = Couples.find({ gameId: userId }).fetch();
    const length = couples.length;
    for (let i = 0; i < length; i++) {
      const _id = couples[i]._id;
      const nextCoupleId = i < length - 1 ? couples[i + 1]._id : couples[0]._id;
      Couples.update(
        { _id },
        {
          $set: {
            nextCoupleId,
            gameId,
            gameSlug,
            isActive: i === 0,
            updatedAt: Date.now(),
          },
        }
      );
    }
  },
  "couples.nextCouple"({ gameSlug }) {
    Games.update({ slug: gameSlug }, { $set: { activeQuestionId: "" } });

    const activeCouple = Couples.findOne({ gameSlug, isActive: true });

    Couples.update(
      { _id: activeCouple._id },
      {
        $set: {
          isActive: false,
          nextInCouple: activeCouple.nextInCouple === "he" ? "she" : "he",
          updateAt: Date.now(),
        },
      }
    );
    Couples.update(
      { _id: activeCouple.nextCoupleId },
      { $set: { isActive: true, updatedAt: Date.now() } }
    );
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
