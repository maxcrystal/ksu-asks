import React from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";

import { Couples } from "../../api/couples";

const Couple = ({ couple }) => {
  const handleRemoveCoupleClick = _id => {
    Meteor.call("couples.remove", { _id });
  };

  return (
    <div>
      <span>
        {couple.names.he}-{couple.names.she}
      </span>
      <button onClick={() => handleRemoveCoupleClick(couple._id)}>-</button>
    </div>
  );
};

const CoupleList = () => {
  const couples = useTracker(() => {
    const userId = Meteor.userId();
    const subscription = Meteor.subscribe("couples", { gameSlug: userId });
    const couples = Couples.find({ gameId: userId }).fetch();
    return couples;
  }, []);

  return (
    <div>
      <h3>CoupleList:</h3>
      {couples.map(couple => (
        <Couple key={couple._id} couple={couple} />
      ))}
    </div>
  );
};

export { CoupleList };
