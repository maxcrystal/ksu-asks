import React from "react";
import copy from "copy-to-clipboard";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";

import Button from "@material-ui/core/Button";
import CopyIcon from "@material-ui/icons/FileCopyOutlined";

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
    <div style={{ display: "flex", marginTop: "1rem" }}>
      <Button
        variant="contained"
        color="primary"
        style={{ flexGrow: 1 }}
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
        <CopyIcon style={{ marginRight: ".5rem" }} />
        Скопировать приглашение
      </Button>
    </div>
  );
};

export { ShareLinks, copyLinks };
