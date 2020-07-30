import React, { useState, useEffect } from "react";
import { Meteor } from "meteor/meteor";

import { VotingPage } from "./VotingPage";
import { Timer } from "./Timer";
import { timerReasons } from "../api/timer";

const AnswerPage = ({ question, game, answer, couples }) => {
  [text, setText] = useState(answer ? answer.text : "");

  useEffect(() => {
    document.getElementById("answer-text").focus();
  }, []);

  useEffect(() => {
    const isVoteFinished = answer.votedCouples.length === couples.length - 2; // FIXME chnge to -1 (-2 for debug only)
    if (isVoteFinished) {
      resetActiveQuestion();
    }
  }, [answer.votedCouples.length]);

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
    startVoting();
  };

  const onTimeEllapsed = reason => {
    console.log("REASON", reason);
    switch (reason) {
      case timerReasons.answering:
        console.log(timerReasons.answering);
        startVoting();
        return;
      case timerReasons.voting:
        console.log(timerReasons.voting);
        resetActiveQuestion();
        return;
    }
  };

  const startVoting = () => {
    Meteor.call("timer.stop", timerReasons.answeringTimeOut);
    Meteor.call("answers.setAnswered", { _id: answer._id });

    Meteor.call("timer.update", {
      startDate: Date.now(),
      isActive: true,
      maxTime: 15000,
      reason: timerReasons.voting,
    });
  };

  const resetActiveQuestion = () => {
    Meteor.call("games.resetActiveQuestion", game._id);
    console.log("reset active question for game", game);
  };

  return (
    <div>
      <Timer onTimeEllapsed={onTimeEllapsed} />
      <hr />
      <p>{question.text}</p>
      <form>
        <i>Textarea and button are only visible to an answering couple</i>
        <textarea
          id="answer-text"
          onChange={handleTypingAnswer}
          value={text}
          disabled={answer.isAnswered}
        />
        <button onClick={handleSubmitAnswer} disabled={false}>
          Ок
        </button>
      </form>
      <hr />
      <i>This text below is visible only to voting couples:</i>
      <pre>{answer ? answer.text : undefined}</pre>
      {answer.isAnswered ? (
        <VotingPage
          answer={answer}
          couples={{ _id: "NQ2Tobha2ycSCaXmQ" } /*FIXME couples prop*/}
        />
      ) : undefined}{" "}
    </div>
  );
};

export { AnswerPage };
