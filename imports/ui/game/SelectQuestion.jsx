import React from "react";
import { useParams } from "react-router-dom";
import { useTracker } from "meteor/react-meteor-data";
import { Random } from "meteor/random";

import { Games } from "../../api/games";
import { Couples } from "../../api/couples";
import { Answers } from "../../api/answers";
import { Questions } from "../../api/questions";

const SelectQuestion = () => {
  const { gameSlug, coupleSlug } = useParams();

  const thisCouple = useTracker(() => Couples.findOne({ slug: coupleSlug }), [
    coupleSlug,
  ]);
  const activeCouple = useTracker(
    () => Couples.findOne({ isActive: true }),
    []
  );
  const game = useTracker(() => Games.findOne({ slug: gameSlug }), [gameSlug]);

  const newQuestionClickHandler = () => {
    const answers = Answers.find({ gameSlug }).fetch();
    const questions = Questions.find().fetch();

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
    const randomQuestion = Random.choice(unansweredQuestions);

    Meteor.call(
      "answers.insert",
      {
        text: "",
        questionId: randomQuestion._id,
        gameId: game._id,
        gameSlug: game.slug,
        coupleId: thisCouple._id,
      },
      (error, answerId) => {
        if (answerId) {
          Meteor.call("timers.on", { gameSlug, reason: "ANSWERING", answerId });
        }
      }
    );

    Meteor.call("games.setActiveQuestion", {
      _id: game._id,
      activeQuestionId: randomQuestion._id,
    });

    console.log("activeQuestionId", randomQuestion._id, game.activeQuestionId);
  };

  const content = () => {
    if (!game.activeQuestionId && thisCouple.isActive) {
      const [name, whom] =
        thisCouple.nextInCouple === "he"
          ? [thisCouple.names.he, "ему"]
          : [thisCouple.names.she, "ей"];
      return (
        <div>
          <p>
            На следующий вопрос отвечает {name}. Пожалуйста, передай {whom}{" "}
            телефон.
          </p>
          <button onClick={newQuestionClickHandler}>Выбрать вопрос</button>
        </div>
      );
    }

    if (!game.activeQuestionId && !thisCouple.isActive) {
      const [name, whom] =
        activeCouple.nextInCouple === "he"
          ? [activeCouple.names.he, "ему"]
          : [activeCouple.names.she, "ей"];
      return <p>На следующий вопрос отвечает {name}. Готовимся голосовть.</p>;
    }
  };

  return (
    <div>
      <h3>SelectQuestion:</h3>
      {content()}
    </div>
  );
};

export { SelectQuestion };
