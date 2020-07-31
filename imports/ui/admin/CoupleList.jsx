import React from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";

import { Couples } from "../../api/couples";

const handleRemoveCoupleClick = _id => {
  Meteor.call("couples.remove", { _id });
};

const Couple = ({ couple }) => {
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
    return Couples.find().fetch();
  });

  return (
    <div>
      {couples.map(couple => (
        <Couple key={couple._id} couple={couple} />
      ))}
    </div>
  );
};

export { CoupleList };
