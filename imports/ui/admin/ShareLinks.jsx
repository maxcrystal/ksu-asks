import React from "react";
import copy from "copy-to-clipboard";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";

import { Couples } from "../../api/couples";
import { Games } from "../../api/games";

const handleShareLinks = couples => {
  const shareLinks = couples.map(
    // TODO add game slug to the link
    couple =>
      `${couple.names.he} & ${couple.names.she}: ` +
      `${Meteor.absoluteUrl()}testovaya-igra/${couple.slug}/`
  );
  copy(shareLinks.sort().join("\n"), {
    debug: false,
    message: "Press #{key} to copy",
  });
};

const ShareLinks = () => {
  const { couples, game } = useTracker(() => {
    const game = Games.find({ isActive: true }).fetch();
    const couples = Couples.find({ gameId: game._id }).fetch(); // TODO fetch only couples for the particular game id
    return { couples, game };
  });

  return (
    <div>
      <button onClick={() => handleShareLinks(couples)}>Share Links</button>
    </div>
  );
};

export { ShareLinks };
