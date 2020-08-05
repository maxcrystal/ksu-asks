import React from "react";
import copy from "copy-to-clipboard";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";

import { Couples } from "../../api/couples";

const copyLinks = ({ gameSlug, couples }) => {
  const shareLinks = couples.map(
    couple =>
      `${couple.names.he} & ${couple.names.she}: ` +
      `${Meteor.absoluteUrl()}${gameSlug}/${couple.slug}/`
  );
  copy(shareLinks.sort().join("\n"), {
    debug: false,
    message: "Press #{key} to copy",
  });
};

const ShareLinks = ({ game }) => {
  const subscription = useTracker(() => {
    return Meteor.subscribe("couples", { gameSlug: game.slug });
  });
  return (
    <div>
      <h3>ShareLinks:</h3>
      <button
        onClick={() =>
          copyLinks(
            {
              gameSlug: game.slug,
              couples: Couples.find({ gameSlug: game.slug }).fetch(),
            },
            []
          )
        }
      >
        Copy links
      </button>
    </div>
  );
};

export { ShareLinks, copyLinks };
