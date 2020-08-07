import React from "react";
import { useTracker } from "meteor/react-meteor-data";
import { Session } from "meteor/session";

import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const Alert = () => {
  const isOpen = useTracker(() => Session.get("isSnackbarOpen"));

  return (
    <Snackbar
      style={{ zIndex: 9000 }}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      open={isOpen}
      autoHideDuration={4000}
      onClose={() => Session.set("isSnackbarOpen", false)}
      message="Ссылки для игры скопированы"
      action={
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={() => Session.set("isSnackbarOpen", false)}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      }
    />
  );
};

export { Alert };
