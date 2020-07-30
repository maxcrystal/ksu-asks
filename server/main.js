import { Meteor } from "meteor/meteor";

import { Questions } from "../imports/api/questions";
import { Games } from "../imports/api/games";
import { Couples } from "../imports/api/couples";
import { Answers } from "../imports/api/answers";
import { Timer } from "../imports/api/timer";

import "../imports/api/questions";
import "../imports/api/couples";
import "../imports/api/games";
import "../imports/api/answers";
import "../imports/api/timer";

Meteor.startup(() => {
  Mongo.Collection.prototype.aggregate = function (pipelines, options) {
    const coll = this.rawCollection();
    return Meteor.wrapAsync(coll.aggregate.bind(coll))(pipelines, options);
  };

  // If the Questions collection is empty, add some data.
  if (Questions.find().count() === 0) {
    console.log("Questions are set");
    for (let i = 0; i < 10; i++) {
      Meteor.call("questions.insert", {
        text: `This is a question text number ${i}. What is your answer?`,
      });
    }
  }

  if (Couples.find().count() === 0) {
    console.log("Couplse are set");
    Meteor.call("couples.insert", {
      he: "Макс",
      she: "Ксю",
      gameId: "FfKA4D8iXXmr9LYXP",
    });
    Meteor.call("couples.insert", {
      he: "Лелик",
      she: "Марианна",
      gameId: "FfKA4D8iXXmr9LYXP",
    });
    Meteor.call("couples.insert", {
      he: "Вовчик",
      she: "Оля",
      gameId: "FfKA4D8iXXmr9LYXP",
    });
  }

  if (Games.find().count() === 0) {
    console.log("Test game is set");
    Meteor.call("games.insert", {
      name: "Тестовая игра",
    });
  }

  if (Timer.find().count() === 0) {
    console.log("Timer is set");
    Timer.insert({ startDate: 0, isActive: false });
  }

  // if (Answers.find().count() == 0) {
  //   console.log("Answers is set");
  //   Answers.insert({ votedCouple: [] });
  // }
});
