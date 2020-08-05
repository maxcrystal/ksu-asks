import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { useTracker } from "meteor/react-meteor-data";

import { SelectQuestion } from "./SelectQuestion";
import { Answer } from "./Answer";
import { Voting } from "./Voting";
import { Timer } from "./Timer";
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
    if (!thisCouple.isActive && answer.isAnswered) {
      return <Voting />;
    }
  };

  const content = () => {
    if (!isDataReady) {
      return <p>Loading...</p>; // FIXME with beautiful loading screen
    } else if (!game || !game.isActive) {
      return <p>No active games.</p>;
    } else if (!game.activeQuestionId) {
      return <SelectQuestion />;
    } else if (game.activeQuestionId) {
      return (
        <div>
          <Timer />
          <Answer />
          {showVoting()}
        </div>
      );
    }
  };

  return (
    <div>
      <h2>GamePage:</h2>
      <Status />
      {content()}
    </div>
  );
};

export { GamePage };
