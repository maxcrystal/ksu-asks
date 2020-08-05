import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";

import { Answers } from "../../api/answers";
import { Couples } from "../../api/couples";
import { Questions } from "../../api/questions";
import { Games } from "../../api/games";

const Answer = () => {
  const textarea = useRef();
  const { gameSlug, coupleSlug } = useParams();

  const game = useTracker(() => Games.findOne({ slug: gameSlug }));

  const question = useTracker(
    () => Questions.findOne({ _id: game.activeQuestionId }),
    []
  );
  const answer = useTracker(
    () => Answers.findOne({ questionId: game.activeQuestionId }),
    []
  );

  const thisCouple = useTracker(
    () => Couples.findOne({ slug: coupleSlug }),
    []
  );

  const [text, setText] = useState(answer ? answer.text : "");

  useEffect(() => {
    textarea.current ? textarea.current.focus() : null;
  }, []);

  const handleTypingAnswer = e => {
    if (!answer) {
      setText("");
    } else {
      Meteor.call("answers.update", { _id: answer._id, text: e.target.value });
      setText(e.target.value);
    }
  };

  const handleSubmitAnswer = e => {
    e.preventDefault();
    Meteor.call("answers.setAnswered", { _id: answer._id });
    console.log("START VOTING");
  };

  const content = () => {
    if (thisCouple.isActive) {
      return (
        <form>
          <textarea
            ref={textarea}
            id="answer-text"
            onChange={handleTypingAnswer}
            value={text}
            disabled={answer.isAnswered}
          />
          <button onClick={handleSubmitAnswer} disabled={answer.isAnswered}>
            Ок
          </button>
        </form>
      );
    } else {
      return <pre>{answer ? answer.text : null}</pre>;
    }
  };

  return (
    <div>
      <h3>Answer:</h3>
      <p>{question.text}</p>
      {content()}
    </div>
  );
};

export { Answer };
