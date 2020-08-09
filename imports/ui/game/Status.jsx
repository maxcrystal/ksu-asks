import React from "react";
import { useParams } from "react-router-dom";
import { useTracker } from "meteor/react-meteor-data";
import FlipMove from "react-flip-move";

import Divider from "@material-ui/core/Divider";
import Badge from "@material-ui/core/Badge";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import HeartIcon from "@material-ui/icons/Favorite";
import HeartOutlinedIcon from "@material-ui/icons/FavoriteBorder";
import DotIcon from "@material-ui/icons/FiberManualRecord";

import { Couples } from "../../api/couples";
import { Games } from "../../api/games";
import { Answers } from "../../api/answers";

const Status = () => {
  const { gameSlug, coupleSlug } = useParams();

  const game = useTracker(() => Games.findOne({ slug: gameSlug }), [gameSlug]);
  const couples = useTracker(() => Couples.find({ gameSlug }).fetch(), [
    gameSlug,
  ]);
  const answers = useTracker(() => Answers.find({ gameSlug }).fetch(), [
    gameSlug,
  ]);

  if (!game || !couples) {
    return null;
  }

  const makeLedder = () => {
    const votingCouples = couples.length - 1;
    const calculatePoints = coupleId => {
      return answers.reduce((points, answer) => {
        if (answer.coupleId === coupleId) {
          points += answer.points.reduce((p, c) => p + c, 0) / votingCouples;
        }
        return points;
      }, 0);
    };

    return (ledder = couples
      .map(c => {
        return {
          _id: c._id,
          pair: `${c.names.he} И ${c.names.she}`.toUpperCase(),
          points: calculatePoints(c._id),
        };
      })
      .sort((c1, c2) => c2.points - c1.points));
  };

  const renderChips = () => {
    const ledder = makeLedder();

    const getVotingStyle = coupleId => {
      const activeAnswer = Answers.findOne({
        gameSlug,
        questionId: game.activeQuestionId,
      });

      let badgeVariant = "standard";
      let badgeContent = "";

      if (!activeAnswer) {
        return { badgeVariant, badgeContent };
      }

      if (activeAnswer.votedCouples.includes(coupleId)) {
        const index = activeAnswer.votedCouples.indexOf(coupleId);
        if (activeAnswer.points[index] === 2) {
          badgeContent = <HeartIcon color="secondary" fontSize="small" />;
        } else if (activeAnswer.points[index] === 1) {
          badgeContent = (
            <HeartOutlinedIcon color="secondary" fontSize="small" />
          );
        } else if (activeAnswer.points[index] === 0) {
          badgeContent = <DotIcon color="disabled" fontSize="small" />;
        }
      }

      return { badgeVariant, badgeContent };
    };

    const getPositionStyle = position => {
      let chipColor = "default";
      let chipVariant = "outlined";
      let avatarColor = "inherit";
      if (position === 1) {
        chipColor = "secondary";
      } else if (position === 2) {
        chipColor = "primary";
      }
      return { chipColor, chipVariant, avatarColor };
    };

    let position = 0;
    const chips = ledder.map(l => {
      ++position;
      const avatar = position;
      const positionStyle = getPositionStyle(position);
      const votingStyle = getVotingStyle(l._id);
      return (
        <div key={l._id} style={{ marginTop: ".5rem", marginRight: ".5rem" }}>
          <Badge
            style={{ backgroundColor: "transparent" }}
            badgeContent={votingStyle.badgeContent}
            variant={votingStyle.variant}
            overlap="rectangle"
          >
            <Chip
              size="small"
              variant={positionStyle.chipVariant}
              color={positionStyle.chipColor}
              avatar={<Avatar>{avatar}</Avatar>}
              label={`${l.pair} ― ${l.points.toFixed(1)}`}
            />
          </Badge>
        </div>
      );
    });
    return chips;
  };

  return (
    <div>
      <Divider style={{ marginTop: "1rem" }} />
      <FlipMove
        style={{
          display: "flex",
          flexWrap: "wrap",
          marginTop: ".5rem",
          marginBottom: "1rem",
        }}
      >
        {renderChips()}
      </FlipMove>
    </div>
  );
};

export { Status };
