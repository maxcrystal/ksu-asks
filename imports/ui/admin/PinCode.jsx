import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { Meteor } from "meteor/meteor";
import { Session } from "meteor/session";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { Couples } from "../../api/couples";

const PinCode = () => {
  const [error, setError] = useState("");
  const pinCodeInput = useRef();
  const history = useHistory();

  const handleClick = () => {
    setError("");

    const pinCode = pinCodeInput.current.value.trim().toLowerCase();

    Meteor.subscribe(
      "couples-invitation",
      { pinCode },
      {
        onReady: () => {
          const couple = Couples.findOne({ pinCode });
          console.log("READY", couple);
          if (!couple) {
            return setError("Неверный код приглашения");
          } else {
            pinCodeInput.current.value = "";
            Session.set("isSidePageOpen", false);
            history.push(`/${couple.gameSlug}/${couple.slug}/`);
          }
        },
      }
    );
  };

  return (
    <div
      style={{ display: "flex", alignItems: "flex-end", marginBottom: "2rem" }}
    >
      <TextField
        style={{ flexGrow: 1, marginRight: "1rem" }}
        error={!!error}
        id="pin-code"
        label="Код приглашения"
        helperText={error}
        inputProps={{ ref: pinCodeInput }}
        autoComplete="off"
      />
      <Button variant="contained" color="primary" onClick={handleClick}>
        ОК
      </Button>
    </div>
  );
};

export { PinCode };
