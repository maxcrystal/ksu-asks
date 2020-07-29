import React, { useEffect } from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";

import { AnswerPage } from "./AnswerPage";

import { Questions } from "../api/questions";
import { Games } from "../api/games";
import { Answers } from "../api/answers";

const MainPage = () => {
  const { questions, game, answers, isReady } = useTracker(() => {
    const subcriptions = [
      Meteor.subscribe("questions"),
      Meteor.subscribe("answers"), // TODO replace with proper logic using game id
      Meteor.subscribe("games"), // TODO replace with proper logic using game id
    ];

    const questions = Questions.find().fetch();
    const game = Games.findOne();
    const answers = Answers.find().fetch();

    const isReady = subcriptions.every(subscription => subscription.ready());

    return { questions, game, answers, isReady };
  }, []);

  const newQuestionClickHandler = () => {
    const randomQuestionNumber = Math.floor(Math.random() * questions.length);
    const randomQuestion = questions[randomQuestionNumber];

    Meteor.call("answers.insert", {
      text: "",
      questionId: randomQuestion._id,
      gameId: game._id,
      coupleId: "NQ2Tobha2ycSCaXmQ", // TODO replace for the proper logic
    });

    Meteor.call("games.setActiveQuestion", {
      _id: game._id,
      activeQuestionId: randomQuestion._id,
    });

    Meteor.call("timer.update", { startDate: Date.now(), isActive: true });

    console.log("activeQuestionId", randomQuestion._id, game.activeQuestionId);
  };

  if (!isReady) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {game.activeQuestionId ? (
        <AnswerPage
          question={questions.find(
            question => question._id === game.activeQuestionId
          )}
          game={game}
          answer={answers.find(
            answer =>
              answer.gameId === game._id &&
              answer.questionId === game.activeQuestionId
          )}
        />
      ) : (
        <button onClick={newQuestionClickHandler}>
          New question - <i>Visible only to one couple</i>
        </button>
      )}
    </div>
  );
};

export { MainPage };
