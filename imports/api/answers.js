import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
import SimpleSchema from "simpl-schema";

import { Couples } from "./couples";

const Answers = new Mongo.Collection("answers");

if (Meteor.isServer) {
  Meteor.publish("answers", ({ gameSlug }) => {
    return Answers.find({ gameSlug });
  });
}

Meteor.methods({
  "answers.insert"({ text, questionId, coupleId, gameId, gameSlug }) {
    const schema = new SimpleSchema({
      text: { type: String },
      questionId: { type: String, min: 1 },
      coupleId: { type: String, min: 1 },
      gameId: { type: String, min: 1 },
      gameSlug: { type: String, min: 1 },
    });
    schema.clean({ text });
    schema.validate({ text, questionId, coupleId, gameId, gameSlug });

    return Answers.insert({
      text,
      questionId,
      coupleId,
      gameId,
      gameSlug,
      isAnswered: false,
      isVoted: false,
      votedCouples: [],
      points: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  },
  "answers.update"({ _id, text }) {
    const schema = new SimpleSchema({
      _id: { type: String, min: 1 },
      text: { type: String },
    });
    schema.clean({ text });
    schema.validate({ _id, text });

    return Answers.update(_id, { $set: { text, updatedAt: Date.now() } });
  },
  "answers.setAnswered"({ _id }) {
    new SimpleSchema({ _id: { type: String, min: 1 } }).validate({ _id });

    return Answers.update(_id, {
      $set: { isAnswered: true, updatedAt: Date.now() },
    });
  },
  "answers.vote"({ _id, coupleId, points, gameSlug }) {
    const schema = new SimpleSchema({
      _id: { type: String, min: 1 },
      coupleId: { type: String, min: 1 },
      points: { type: Number, min: 0, max: 2 },
      gameSlug: { type: String, min: 1 },
    });
    schema.clean({ points });
    schema.validate({ _id, coupleId, points, gameSlug });

    const totalCouples = Couples.find({ gameSlug }).count();
    const votedCouples = Answers.findOne({ _id }).votedCouples.length;
    const isVoted = votedCouples >= totalCouples - 2;
    console.log("isVoted", totalCouples, votedCouples, isVoted);

    if (isVoted) {
      Meteor.call("timers.off", { gameSlug });
      Meteor.call("couples.nextCouple", { gameSlug });
    }

    Answers.update(_id, {
      $push: { votedCouples: coupleId, points },
      $set: { isVoted, updatedAt: Date.now() },
    });
  },
  "answers.setVoted"({ _id }) {
    new SimpleSchema({ _id: { type: String, min: 1 } }).validate({ _id });

    return Answers.update(_id, {
      $set: { isVoted: true, updatedAt: Date.now() },
    });
  },
});

export { Answers };
