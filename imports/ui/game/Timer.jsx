import React from "react";
import { useParams } from "react-router-dom";
import { useTracker } from "meteor/react-meteor-data";

import { Timers } from "../../api/timers";

const Timer = () => {
  const { gameSlug, coupleSlug } = useParams();
  const timer = useTracker(() => Timers.findOne({ gameSlug }), [gameSlug]);

  return (
    <div>
      <h3>Timer:</h3>
      <p>
        {timer.reason}: Ellapsed {timer.countdown} miliseconds out of{" "}
        {timer.maxTime}.
      </p>
    </div>
  );
};

export { Timer };
