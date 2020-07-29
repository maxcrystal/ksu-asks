import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";

const Timer = new Mongo.Collection("timer");

if (Meteor.isServer) {
  Meteor.publish("timer", () => {
    return Timer.find();
  });
}

Meteor.methods({
  "timer.update"({ startDate, isActive }) {
    Timer.update({}, { $set: { startDate, isActive, updatedAt: Date.now() } });
  },
  "timer.stop"() {
    Timer.update({}, { $set: { isActive: false } });
  },
  "timer.start"() {
    Timer.update({}, { $set: { isActive: true } });
  },
});

export { Timer };
