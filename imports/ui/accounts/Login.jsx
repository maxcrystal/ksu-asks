import React, { useState, useRef } from "react";
import { Meteor } from "meteor/meteor";
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

const Login = () => {
  const [error, setError] = useState("");
  const emailInput = useRef();
  const passwordInput = useRef();
  const classes = useStyles();

  const onSubmit = e => {
    e.preventDefault();

    const email = emailInput.current.value.trim();
    const password = passwordInput.current.value.trim();

    Meteor.loginWithPassword({ email }, password, error => {
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
      <h3>Вход</h3>
      <form
        className={classes.login__form}
        onSubmit={onSubmit}
        noValidate
        autoComplete="off"
      >
        <TextField
          className={classes.login__input}
          error={!!error}
          id="login-email"
          label="Email"
          type="email"
          helperText={error}
          inputProps={{ ref: emailInput }}
        />
        <TextField
          className={classes.login__input}
          error={false}
          id="login-password"
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
          Я не зарегестрирован
        </Button>
      </div>
    </div>
  );
};

export { Login };
