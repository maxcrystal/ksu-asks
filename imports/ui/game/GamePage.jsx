import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";

import { Answer } from "./Answer";

import { Questions } from "../../api/questions";
import { Games } from "../../api/games";
import { Answers } from "../../api/answers";
import { Couples } from "../../api/couples";
import { timerReasons } from "../../api/timer";

const GamePage = () => {
  const { gameSlug, coupleSlug } = useParams();

  const isReady = useTracker(() => {
    const subcriptions = [
      Meteor.subscribe("questions"),
      Meteor.subscribe("games", { slug: gameSlug }),
      Meteor.subscribe("answers", { gameSlug }),
      Meteor.subscribe("couples", { gameSlug }),
    ];
    return subcriptions.every(s => s.ready());
  }, [gameSlug]);

  const questions = Questions.find().fetch();
  const answers = Answers.find().fetch();
  const game = Games.findOne();

  const couples = Couples.find().fetch(); // FIXME
  const thisCouple = Couples.findOne({ slug: coupleSlug });
  const activeCouple = Couples.findOne({ isActive: true });

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

    Meteor.call("answers.insert", {
      text: "",
      questionId: randomQuestion._id,
      gameId: game._id,
      gameSlug: game.slug,
      coupleId: thisCouple._id,
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

  if (!thisCouple || !game.isActive) {
    return null;
  }

  if (!game.activeQuestionId && thisCouple.isActive) {
    const [name, whom] =
      thisCouple.nextInCouple === "he"
        ? [thisCouple.names.he, "him"]
        : [thisCouple.names.she, "her"];
    return (
      <div>
        <p>
          Next question goes to {name}. Please pass {whom} the phone.
        </p>
        <button onClick={newQuestionClickHandler}>New question</button>
      </div>
    );
  }

  if (!game.activeQuestionId && !thisCouple.isActive) {
    const [name, whom] =
      activeCouple.nextInCouple === "he"
        ? [activeCouple.names.he, "him"]
        : [activeCouple.names.she, "her"];
    return <div>{<p>Next question goes to {name}</p>}</div>;
  }

  if (game.activeQuestionId) {
    const question = questions.find(
      question => question._id === game.activeQuestionId
    );
    const answer = answers.find(
      answer =>
        answer.gameId === game._id &&
        answer.questionId === game.activeQuestionId
    );

    return (
      <div>
        <Answer
          game={game}
          question={question}
          thisCouple={thisCouple}
          activeCouple={activeCouple}
          couples={couples}
          answer={answer}
        />
      </div>
    );
  }

  return null;
};

export { GamePage };
