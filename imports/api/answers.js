import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
import SimpleSchema from "simpl-schema";

const Answers = new Mongo.Collection("answers");

if (Meteor.isServer) {
  Meteor.publish("answers", () => {
    return Answers.find();
  });
}

Meteor.methods({
  "answers.insert"({ text, questionId, coupleId, gameId }) {
    const schema = new SimpleSchema({
      text: { type: String },
      questionId: { type: String, min: 1 },
      coupleId: { type: String, min: 1 },
      gameId: { type: String, min: 1 },
    });
    schema.clean({ text });
    schema.validate({ text, questionId, coupleId, gameId });

    return Answers.insert({
      text,
      questionId,
      coupleId,
      gameId,
      isAnswered: false,
      votedCouples: [],
      points: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  },
  "answers.update"({ _id, text }) {
    const schema = new SimpleSchema({
      _id: { type: String, min: 1 },
      text: { type: String, min: 1 },
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
  "answers.vote"({ _id, coupleId, points }) {
    const schema = new SimpleSchema({
      _id: { type: String, min: 1 },
      coupleId: { type: String, min: 1 },
      points: { type: Number, min: 0, max: 2 },
    });
    schema.clean({ points });
    schema.validate({ _id, coupleId, points });

    return Answers.update(_id, {
      $push: { votedCouples: coupleId, points },
      $set: { updatedAt: Date.now() },
    });
  },
});

export { Answers };
