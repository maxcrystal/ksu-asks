import React from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import { useParams } from "react-router-dom";

import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import HeartIcon from "@material-ui/icons/Favorite";
import HeartBorderIcon from "@material-ui/icons/FavoriteBorder";

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
    <>
      <ButtonGroup
        variant="contained"
        style={{ display: "flex", marginTop: "1rem" }}
      >
        <Button
          disabled={isVoted}
          onClick={() => handleVoteClick(2)}
          style={{ flexGrow: 3 }}
          color="primary"
        >
          <HeartIcon />
          <HeartIcon />
        </Button>
        <Button
          disabled={isVoted}
          onClick={() => handleVoteClick(1)}
          style={{ flexGrow: 4 }}
          color="primary"
        >
          <HeartIcon />
        </Button>
        <Button
          disabled={isVoted}
          onClick={() => handleVoteClick(0)}
          style={{ flexGrow: 4 }}
          color="secondary"
        >
          <HeartBorderIcon />
        </Button>
      </ButtonGroup>
    </>
  );
};

export { Voting };
