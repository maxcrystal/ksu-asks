import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
import { slugify } from "transliteration";
import SimpleSchema from "simpl-schema";
import uid from "uid";

const Games = new Mongo.Collection("games");

/**
 * _id,
 * name: string
 * slug: sanitized unique name
 * activeQuestionId: question id
 * admin: userId
 */

if (Meteor.isServer) {
  Games.createIndex({ slug: 1 }, { unique: true });

  Meteor.publish("games", ({ slug }) => {
    return Games.find({ slug });
  });

  Meteor.publish("last-games", function () {
    return Games.find(
      { creator: this.userId },
      { sort: { updatedAt: -1 }, limit: 10 }
    );
  });
}

Meteor.methods({
  "games.insert"({ name }) {
    if (!Meteor.userId()) {
      throw new Meteor.Error("not-authorised");
    }

    const schema = new SimpleSchema({
      name: { type: String, min: 1 },
    });
    schema.clean({ name });
    schema.validate({ name });

    let slug = slugify(name, { replace: { ".": "-" } });

    let i = 0;
    while (Games.find({ slug }).count() !== 0) {
      slug += i === 0 ? "-" + uid(1) : uid(1);
      i++;
    }

    const _id = Games.insert({
      name,
      slug,
      isActive: true,
      activeQuestionId: "",
      creator: Meteor.userId(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    return { gameId: _id, gameSlug: slug };
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
