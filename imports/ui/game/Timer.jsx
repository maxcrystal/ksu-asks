import React from "react";
import { useParams } from "react-router-dom";
import { useTracker } from "meteor/react-meteor-data";

import LinearProgress from "@material-ui/core/LinearProgress";

import { Timers } from "../../api/timers";

const Timer = () => {
  const { gameSlug, coupleSlug } = useParams();
  const timer = useTracker(() => Timers.findOne({ gameSlug }), [gameSlug]);

  return (
    <LinearProgress
      variant="determinate"
      value={(timer.countdown / timer.maxTime) * 100}
    />
  );
};

export { Timer };
