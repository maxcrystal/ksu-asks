import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
import SimpleSchema from "simpl-schema";

const Timers = new Mongo.Collection("timers");

if (Meteor.isServer) {
  Meteor.publish("timers", ({ gameSlug }) => {
    return Timers.find({ gameSlug });
  });

  const runningTimers = {};

  Meteor.methods({
    "timers.insert"({ gameSlug }) {
      new SimpleSchema({
        gameSlug: { type: String, min: 1 },
      }).validate({ gameSlug });

      Timers.insert({
        gameSlug,
        isRunning: false,
        countdown: null,
        start: null,
        maxTime: null,
        reason: "STOP",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
    },
    "timers.on"({ gameSlug, reason, answerId }) {
      console.log("timer is on", gameSlug, reason);
      new SimpleSchema({
        gameSlug: { type: String, min: 1 },
        reason: { type: String, allowedValues: ["VOTING", "ANSWERING"] },
      }).validate({ gameSlug, reason });

      const maxTime = {
        VOTING: 300000,
        ANSWERING: 300000,
      };

      const updates = {
        isRunning: true,
        countdown: 0,
        start: Date.now(),
        maxTime: maxTime[reason],
        reason,
        updatedAt: Date.now(),
      };

      Timers.update({ gameSlug }, { $set: { ...updates } });

      const onTick = ({ gameSlug, start, maxTime, answerId, reason }) => {
        const countdown = Math.min(Date.now() - start, maxTime);

        Timers.update(
          { gameSlug },
          {
            $set: {
              countdown,
              updatedAt: Date.now(),
            },
          }
        );
        if (countdown === maxTime) {
          Meteor.call("timers.off", { gameSlug });

          if (reason === "ANSWERING") {
            Meteor.call("answers.setAnswered", { _id: answerId });
            Meteor.call("timers.on", { gameSlug, reason: "VOTING", answerId });
          } else if (reason === "VOTING") {
            Meteor.call("answers.setVoted", { _id: answerId });
            Meteor.call("couples.nextCouple", { gameSlug });
            console.log("answer is voted logic here");
          }
        }
      };

      runningTimers[gameSlug] = setInterval(
        Meteor.bindEnvironment(() =>
          onTick({
            gameSlug,
            start: updates.start,
            maxTime: maxTime[reason],
            answerId,
            reason,
          })
        ),
        1000
      );
    },
    "timers.off"({ gameSlug }) {
      console.log("timer is off", gameSlug);
      clearInterval(runningTimers[gameSlug]);
      // delete runningTimers[gameSlug];
      Timers.update(
        { gameSlug },
        {
          $set: {
            isRunning: false,
            // countdown: null,
            // start: null,
            // maxTime: null,
            reason: "STOP",
            updatedAt: Date.now(),
          },
        }
      );
    },
  });
}

export { Timers };
