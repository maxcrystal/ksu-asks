import React from "react";
import copy from "copy-to-clipboard";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";

import { Couples } from "../../api/couples";
import { Games } from "../../api/games";

const ShareLinks = () => {
  const { couples, game, userId } = useTracker(() => {
    const subscriptions = [
      Meteor.subscribe("couples"),
      Meteor.subscribe("games"),
    ];
    const userId = Meteor.userId();
    const game = Games.findOne({ isActive: true }) || { _id: userId };
    const couples = Couples.find({ gameId: game._id }).fetch();
    return { couples, game, userId };
  }, []);

  const handleShareLinks = ({ couples, game }) => {
    if (game._id === userId) {
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

  return (
    <div>
      <button onClick={() => handleShareLinks({ couples, game })}>
        Share Links
      </button>
    </div>
  );
};

export { ShareLinks };
