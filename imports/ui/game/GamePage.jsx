import React from "react";
import { useParams } from "react-router-dom";
import { useTracker } from "meteor/react-meteor-data";

import Box from "@material-ui/core/Box";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

import { SelectQuestion } from "./SelectQuestion";
import { Answer } from "./Answer";
import { Voting } from "./Voting";
import { Status } from "./Status";

import { Games } from "../../api/games";
import { Answers } from "../../api/answers";
import { Couples } from "../../api/couples";

const GamePage = () => {
  const { gameSlug, coupleSlug } = useParams();

  const isSubscriptionsReady = useTracker(() => {
    const subcriptions = [
      Meteor.subscribe("questions"),
      Meteor.subscribe("games", { slug: gameSlug }),
      Meteor.subscribe("answers", { gameSlug }),
      Meteor.subscribe("couples", { gameSlug }),
      Meteor.subscribe("timers", { gameSlug }),
    ];
    return subcriptions.every(s => s.ready());
  }, []);

  const game = useTracker(() => Games.findOne({ slug: gameSlug }), [gameSlug]);
  const answer = useTracker(
    () =>
      Answers.findOne({
        gameSlug,
        questionId: game ? game.activeQuestionId : null,
      }),
    [game, gameSlug]
  );
  const thisCouple = useTracker(() => Couples.findOne({ slug: coupleSlug }), [
    coupleSlug,
  ]);

  const isDataReady = isSubscriptionsReady && game && thisCouple;

  const showVoting = () => {
    if (!thisCouple.isActive) {
      return <Voting />;
    }
  };

  const content = () => {
    if (!isDataReady) {
      return (
        <Backdrop open={true} style={{ color: "#ddd" }}>
          <CircularProgress color="inherit" />
        </Backdrop>
      );
    } else if (!game.isActive) {
      return (
        <p style={{ marginTop: "2rem" }}>
          Игра "{game.name}" закончена, результаты внизу.
        </p>
      );
    } else if (!game.activeQuestionId) {
      return <SelectQuestion />;
    } else if (game.activeQuestionId) {
      return (
        <>
          <Answer />
          {showVoting()}
        </>
      );
    }
  };

  return (
    <>
      <Box flex="1" display="flex" flexDirection="column">
        {content()}
      </Box>
      <Status />
    </>
  );
};

export { GamePage };
