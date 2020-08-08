import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";

import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import QuestionIcon from "@material-ui/icons/ContactSupport";
import { palette } from "@material-ui/system";

import { Answers } from "../../api/answers";
import { Couples } from "../../api/couples";
import { Questions } from "../../api/questions";
import { Games } from "../../api/games";
import { Timer } from "./Timer";

const Answer = () => {
  const textarea = useRef();
  const { gameSlug, coupleSlug } = useParams();

  const game = useTracker(() => Games.findOne({ slug: gameSlug }), [gameSlug]);

  const question = useTracker(
    () => Questions.findOne({ _id: game.activeQuestionId }),
    [game.activeQuestionId]
  );
  const answer = useTracker(
    () => Answers.findOne({ gameSlug, questionId: game.activeQuestionId }),
    [gameSlug, game.activeQuestionId]
  );

  const thisCouple = useTracker(() => Couples.findOne({ slug: coupleSlug }), [
    coupleSlug,
  ]);

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
    Meteor.call("timers.off", { gameSlug });
    Meteor.call("timers.on", {
      gameSlug,
      reason: "VOTING",
      answerId: answer._id,
    });
  };

  const style = () => {
    const activeCouple = Couples.findOne({ gameSlug, isActive: true });
    if (!activeCouple) {
      return { name: "", color: "primary.main" };
    }
    const name =
      activeCouple.nextInCouple === "he"
        ? activeCouple.names.he
        : activeCouple.names.she;
    const color =
      activeCouple.nextInCouple === "he" ? "primary.main" : "secondary.main";
    return { name, color };
  };

  const content = () => {
    if (thisCouple.isActive) {
      return (
        <>
          <textarea
            ref={textarea}
            id="answer-text"
            onChange={handleTypingAnswer}
            value={text}
            disabled={answer ? answer.isAnswered : true}
            placeholder="Ответ..."
            style={{
              flex: 1,
              resize: "none",
              outline: "none",
              border: "none",
              fontSize: "1.2rem",
              padding: "1rem",
            }}
          />
          <Timer />
          <div style={{ alignSelf: "flex-end", marginTop: ".5rem" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmitAnswer}
              disabled={answer ? answer.isAnswered : true}
            >
              Ответить
            </Button>
          </div>
        </>
      );
    } else {
      return (
        <div
          style={{
            flex: 1,
            fontSize: "1rem",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span style={{ marginTop: "1rem" }}>
            Отвечает{" "}
            <Box component="b" color={style().color}>
              {style().name}
            </Box>
            :
          </span>
          <span
            style={{
              flex: 1,
              backgroundColor: "white",
              borderRadius: "4px",
              marginTop: ".5rem",
              padding: "1rem",
              whiteSpace: "pre-wrap",
            }}
          >
            {answer ? answer.text : null}
          </span>
          <Timer />
        </div>
      );
    }
  };

  return (
    <>
      <Paper
        style={{
          backgroundColor: "#eee",
          marginBottom: ".5rem",
          marginTop: "1rem",
          padding: "1rem",
          display: "flex",
          alignItems: "center",
        }}
      >
        <QuestionIcon color="primary" fontSize="large" />
        <span style={{ marginLeft: "1rem" }}>
          {question ? question.text : null}
        </span>
      </Paper>
      {content()}
    </>
  );
};

export { Answer };
