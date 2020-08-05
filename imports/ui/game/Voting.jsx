import React from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import { useParams } from "react-router-dom";

import { Games } from "../../api/games";
import { Answers } from "../../api/answers";
import { Couples } from "../../api/couples";

const Voting = () => {
  const { gameSlug, coupleSlug } = useParams();
  const game = useTracker(() => Games.findOne({ slug: gameSlug }), []);
  const answer = useTracker(
    () => Answers.findOne({ questionId: game.activeQuestionId }),
    [game]
  );
  const thisCouple = useTracker(
    () => Couples.findOne({ slug: coupleSlug }),
    []
  );

  const isVoted = useTracker(() => {
    const isVoted = answer.votedCouples.includes(thisCouple._id);
    console.log("isVoted", isVoted, answer.votedCouples);
    return isVoted;
  }, [answer.votedCouples.length]);

  const handleVoteClick = points => {
    Meteor.call("answers.vote", {
      _id: answer._id,
      coupleId: thisCouple._id,
      points,
      gameSlug,
    });
  };

  return (
    <div>
      <h3>Voting:</h3>
      <button disabled={isVoted} onClick={() => handleVoteClick(2)}>
        +2
      </button>
      <button disabled={isVoted} onClick={() => handleVoteClick(1)}>
        +1
      </button>
      <button disabled={isVoted} onClick={() => handleVoteClick(0)}>
        0
      </button>
    </div>
  );
};

export { Voting };
