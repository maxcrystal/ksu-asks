import React from "react";
import copy from "copy-to-clipboard";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import { Session } from "meteor/session";

import Button from "@material-ui/core/Button";
import CopyIcon from "@material-ui/icons/FileCopyOutlined";

import { Couples } from "../../api/couples";

const copyLinks = ({ gameSlug, couples }) => {
  const shareLinks = couples.map(
    couple => `${couple.names.he} и ${couple.names.she} – ${couple.pinCode}`
    // couple =>
    //   `${couple.names.he} и ${couple.names.she}: ` +
    //   `${Meteor.absoluteUrl(`/${gameSlug}/${couple.slug}`, {
    //     secure: true,
    //     replaceLocalhost: true,
    //   })}`
  );

  const path = Meteor.absoluteUrl("/", {
    secure: true,
    replaceLocalhost: true,
  });
  const text =
    `Для того, чтобы начать игру, пройдите по ссылке ${path} ` +
    `и введите код приглашения вашей пары:\n\n` +
    shareLinks.sort().join("\n");

  copy(text, {
    debug: false,
    format: "text/plain",
    message: "Выделите и скопируйте текст приглашения",
  });

  Session.set("isSidePageOpen", false);
  Session.set("isSnackbarOpen", true);
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
