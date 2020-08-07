import React from "react";
import { useParams } from "react-router-dom";
import { useTracker } from "meteor/react-meteor-data";

import LinearProgress from "@material-ui/core/LinearProgress";
import TimerIcon from "@material-ui/icons/Timer";

import { Timers } from "../../api/timers";

const Timer = () => {
  const { gameSlug, coupleSlug } = useParams();
  const timer = useTracker(() => Timers.findOne({ gameSlug }), [gameSlug]);

  const getTime = () => {
    let label = "";
    if (timer.reason === "ANSWERING") {
      label = <>Время на ответ: </>;
    } else if (timer.reason === "VOTING") {
      label = <>Время на голосование: </>;
    }
    const time = ((timer.maxTime - timer.countdown) / 1000).toFixed(0);
    return (
      <span
        style={{
          display: "flex",
          alignItems: "center",
          fontSize: ".8rem",
          marginTop: ".5rem",
          color: "grey",
        }}
      >
        <TimerIcon
          style={{ fontSize: "1rem", marginRight: ".1rem", color: "grey" }}
        />
        {label}
        {time} сек.
      </span>
    );
  };

  return (
    <>
      <LinearProgress
        variant="determinate"
        value={(timer.countdown / timer.maxTime) * 100}
      />
      {timer.reason !== "STOP" ? getTime() : null}
    </>
  );
};

export { Timer };
