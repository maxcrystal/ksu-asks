import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";

import { Timer as TimerCollection, timerReasons } from "../api/timer";

const Timer = ({ onTimeEllapsed }) => {
  const [ellapsedTime, setEllapsedTime] = useState(0);

  const { isActive, startDate, maxTime, reason } = useTracker(() => {
    const subscription = Meteor.subscribe("timer");
    const isReady = subscription.ready();

    const timer = TimerCollection.findOne();
    const isActive = isReady ? timer.isActive : false;
    const startDate = isReady ? timer.startDate : null;
    const maxTime = isReady ? timer.maxTime : null;
    const reason = isReady ? timer.reason : "";
    return { isActive, startDate, maxTime, reason };
  }, []);

  useEffect(() => {
    if (isActive) {
      if (ellapsedTime >= maxTime) {
        onTimeEllapsed(reason);
      }

      const update = setTimeout(() => {
        setEllapsedTime(Date.now() - startDate);
        console.log("Interval ticks");
      }, 1000);

      return () => {
        // console.log("interval cleared");
        clearTimeout(update);
      };
    } else {
      setEllapsedTime(0);
    }
  }, [isActive, ellapsedTime]);

  return (
    <div>
      <p>
        Timer is {isActive ? "ON" : "OFF"}, ellapsed time: {ellapsedTime} out of{" "}
        {maxTime} miliseconds{" "}
        <i>(timer should be integrated later to check time to answer)</i>.
      </p>
    </div>
  );
};

Timer.defaultProps = {
  onTimeEllapsed: () => {
    console.log("Time is ellapsed!");
  },
};

Timer.protoTypes = {
  onTimeEllapsed: PropTypes.func.isRequired,
};

export { Timer };
