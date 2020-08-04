import React, { useState } from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";

const Voting = ({ answer, thisCouple }) => {
  const isVoted = useTracker(() => {
    const isVoted = answer.votedCouples.includes(thisCouple._id); //FIXME proper use of couple ID through session var
    console.log("isVoted", isVoted, answer.votedCouples);
    return isVoted;
  }, [answer.votedCouples.length]);

  const handleVoteClick = points => {
    Meteor.call("answers.vote", {
      _id: answer._id,
      coupleId: thisCouple._id,
      points,
    });
  };

  return (
    <div>
      <p>VotingPage Content</p>
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
