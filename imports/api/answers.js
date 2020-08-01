import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";

const Answers = new Mongo.Collection("answers");

if (Meteor.isServer) {
  Meteor.publish("answers", () => {
    return Answers.find();
  });
}

Meteor.methods({
  "answers.insert"({ text, questionId, coupleId, gameId }) {
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
    return Answers.update(_id, { $set: { text, updatedAt: Date.now() } });
    console.log(`set answer ${_id} updated with ${text}`);
  },
  "answers.setAnswered"({ _id }) {
    return Answers.update(_id, { $set: { isAnswered: true } });
    console.log(`set answer ${_id} answered is true`);
  },
  "answers.vote"({ _id, coupleId, points }) {
    return Answers.update(_id, { $push: { votedCouples: coupleId, points } });
    console.log(`couple ${coupleId} vouted ${points} points`);
  },
});

export { Answers };
