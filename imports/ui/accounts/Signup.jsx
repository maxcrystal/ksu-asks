import React, { useState, useRef } from "react";
import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import { useTracker } from "meteor/react-meteor-data";
import { Session } from "meteor/session";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  login__form: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    "& > *": {
      margin: theme.spacing(1),
      marginLeft: 0,
    },
  },
  login__input: { flex: 1 },
  login__div: {
    display: "flex",
    justifyContent: "center",
  },
  login__button: {
    fontSize: 10,
    marginTop: theme.spacing(1),
  },
}));

const Signup = () => {
  const [error, setError] = useState("");
  const emailInput = useRef();
  const passwordInput = useRef();
  const classes = useStyles();

  const onSubmit = e => {
    e.preventDefault();

    const email = emailInput.current.value.trim();
    const password = passwordInput.current.value.trim();

    if (password.length < 8) {
      return setError("Password must be more than 8 characters long");
    }

    Accounts.createUser({ email, password }, error => {
      if (error) {
        setError(error.reason);
      } else {
        emailInput.current.value = "";
        passwordInput.current.value = "";
        setError("");
      }
    });
  };

  return (
    <div>
      <h3>Регистрация</h3>
      <form
        className={classes.login__form}
        onSubmit={onSubmit}
        noValidate
        autoComplete="off"
      >
        <TextField
          className={classes.login__input}
          error={!!error}
          id="signup-email"
          label="Email"
          type="email"
          helperText={error}
          inputProps={{ ref: emailInput }}
        />
        <TextField
          className={classes.login__input}
          error={false}
          id="signup-password"
          label="Пароль"
          type="password"
          helperText={""}
          inputProps={{ ref: passwordInput }}
        />
        <Button type="submit" variant="contained" color="primary">
          ОК
        </Button>
      </form>
      <div className={classes.login__div}>
        <Button
          className={classes.login__button}
          size="small"
          color="primary"
          onClick={() =>
            Session.set("isLoginVisible", !Session.get("isLoginVisible"))
          }
        >
          Я уже зарегестрирован
        </Button>
      </div>
    </div>
  );
};

export { Signup };
