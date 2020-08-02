import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";

const Timer = new Mongo.Collection("timer");

const timerReasons = {
  voting: "VOTING",
  votingTimeOut: "VOTING_TIME_OUT",
  answering: "ANSWERING",
  answeringTimeOut: "ANSWERING_TIME_OUT",
};

if (Meteor.isServer) {
  Meteor.publish("timer", () => {
    return Timer.find();
  });
}

Meteor.methods({
  "timer.update"({ startDate, maxTime, isActive, reason }) {
    return Timer.update(
      {},
      { $set: { startDate, maxTime, isActive, reason, updatedAt: Date.now() } }
    );
  },
  "timer.stop"(reason) {
    return Timer.update(
      {},
      { $set: { isActive: false, reason, updatedAt: Date.now() } }
    );
  },
  "timer.start"(maxTime, reason) {
    return Timer.update(
      {},
      { $set: { maxTime, isActive: true, reason, updatedAt: Date.now() } }
    );
  },
});

export { Timer, timerReasons };
