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

  const thisCouple = useTracker(
    () => Couples.findOne({ slug: coupleSlug }),
    []
  );
  const activeCouple = useTracker(
    () => Couples.findOne({ isActive: true }),
    []
  );
  const game = useTracker(() => Games.findOne(), []);

  const newQuestionClickHandler = () => {
    const answers = Answers.find().fetch();
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
    // const randomQuestionNumber = Math.floor(
    //   Math.random() * unansweredQuestions.length
    // );
    // const randomQuestion = unansweredQuestions[randomQuestionNumber];
    const randomQuestion = Random.choice(unansweredQuestions);

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

    console.log("activeQuestionId", randomQuestion._id, game.activeQuestionId);
  };

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
};

export { SelectQuestion };
