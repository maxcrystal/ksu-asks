import React from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import { useParams } from "react-router-dom";

import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import HeartIcon from "@material-ui/icons/Favorite";
import HeartBorderIcon from "@material-ui/icons/FavoriteBorder";
import DotIcon from "@material-ui/icons/FiberManualRecord";

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
    const isVoted = answer
      ? answer.votedCouples.includes(thisCouple._id)
      : false;
    return isVoted;
  }, [answer]);

  const isAnswered = useTracker(() => {
    const isAnswered = answer ? answer.isAnswered : false;
    return isAnswered;
  }, [answer]);

  const handleVoteClick = points => {
    Meteor.call("answers.vote", {
      _id: answer._id,
      coupleId: thisCouple._id,
      points,
      gameSlug,
    });
  };

  return (
    <>
      <ButtonGroup
        variant="contained"
        style={{ display: "flex", marginTop: "1rem" }}
      >
        <Button
          disabled={isVoted || !isAnswered}
          onClick={() => handleVoteClick(2)}
          style={{ flexGrow: 1 }}
          color="primary"
        >
          <HeartIcon />
        </Button>
        <Button
          disabled={isVoted || !isAnswered}
          onClick={() => handleVoteClick(1)}
          style={{ flexGrow: 1 }}
          color="primary"
        >
          <HeartBorderIcon />
        </Button>
        <Button
          disabled={isVoted || !isAnswered}
          onClick={() => handleVoteClick(0)}
          style={{ flexGrow: 1 }}
          color="secondary"
        >
          <DotIcon fontSize="small" />
        </Button>
      </ButtonGroup>
    </>
  );
};

export { Voting };
