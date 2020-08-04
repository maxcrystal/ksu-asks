import React from "react";
import copy from "copy-to-clipboard";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";

import { Couples } from "../../api/couples";

const ShareLinks = ({ game }) => {
  const couples = useTracker(() => {
    const subscription = Meteor.subscribe("couples", { gameSlug: game.slug });
    const couples = Couples.find({ gameSlug: game.slug }).fetch();
    return couples;
  }, []);

  const handleShareLinks = ({ couples }) => {
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
      <button onClick={() => handleShareLinks({ couples })}>Share Links</button>
    </div>
  );
};

export { ShareLinks };
