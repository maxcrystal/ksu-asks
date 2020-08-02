import React, { useEffect } from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";

import { AnswerPage } from "./AnswerPage";

import { Questions } from "../../api/questions";
import { Games } from "../../api/games";
import { Answers } from "../../api/answers";
import { Couples } from "../../api/couples";
import { timerReasons } from "../../api/timer";

const GamePage = () => {
  const { questions, game, answers, couples, isReady } = useTracker(() => {
    const subcriptions = [
      Meteor.subscribe("questions"),
      Meteor.subscribe("answers"), // TODO replace with proper logic using game id
      Meteor.subscribe("games"), // TODO replace with proper logic using game id
      Meteor.subscribe("couples"), // TODO replace with proper logic using game id
    ];

    const questions = Questions.find().fetch();
    const game = Games.findOne();
    const answers = Answers.find().fetch();
    const couples = Couples.find().fetch();

    const isReady = subcriptions.every(subscription => subscription.ready());

    return { questions, game, answers, couples, isReady };
  });

  const newQuestionClickHandler = () => {
    const answeredQuestionsIds = answers.map(answer => answer.questionId);
    if (answeredQuestionsIds.length === questions.length) {
      console.log("ALL QUESTIONS ANSWERED"); // TODO create a proper logic to handle this
      return;
    }
    const unansweredQuestions = questions.filter(question => {
      if (answeredQuestionsIds.length === 0) {
        return true;
      } else {
        return !answeredQuestionsIds.includes(question._id);
      }
    });
    const randomQuestionNumber = Math.floor(
      Math.random() * unansweredQuestions.length
    );
    const randomQuestion = unansweredQuestions[randomQuestionNumber];
    console.log(
      "answered, unanswered, random question id:",
      answeredQuestionsIds.length,
      unansweredQuestions.length,
      randomQuestion._id
    );

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

    Meteor.call("timer.update", {
      startDate: Date.now(),
      isActive: true,
      maxTime: 10000,
      reason: timerReasons.answering,
    });

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
          couples={couples}
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

export { GamePage };