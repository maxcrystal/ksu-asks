import React from "react";
import copy from "copy-to-clipboard";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";

import { Couples } from "../../api/couples";
import { Games } from "../../api/games";

const handleShareLinks = ({ couples, game }) => {
  if (game._id === "new-game") {
    console.log("ADD PROMPT TO START NEW GAME HERE"); // TODO add prompt
    return;
  }
  console.log(couples, game);

  const shareLinks = couples.map(
    couple =>
      `${couple.names.he} & ${couple.names.she}: ` +
      `${Meteor.absoluteUrl()}${game.slug}/${couple.slug}/`
  );
  copy(shareLinks.sort().join("\n"), {
    debug: false,
    message: "Press #{key} to copy",
  });
};

const ShareLinks = () => {
  const { couples, game } = useTracker(() => {
    const game = Games.findOne({ isActive: true }) || { _id: "new-game" };
    const couples = Couples.find({ gameId: game._id }).fetch();
    return { couples, game };
  });

  return (
    <div>
      <button onClick={() => handleShareLinks({ couples, game })}>
        Share Links
      </button>
    </div>
  );
};

export { ShareLinks };
