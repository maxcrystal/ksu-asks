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
    Timer.update(
      {},
      { $set: { startDate, maxTime, isActive, updatedAt: Date.now(), reason } }
    );
  },
  "timer.stop"(reason) {
    Timer.update({}, { $set: { isActive: false, reason } });
  },
  "timer.start"(maxTime, reason) {
    Timer.update({}, { $set: { maxTime, isActive: true, reason } });
  },
});

export { Timer, timerReasons };
