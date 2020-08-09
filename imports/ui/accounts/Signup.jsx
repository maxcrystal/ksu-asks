import React, { useState, useRef } from "react";
import { Accounts } from "meteor/accounts-base";
import { Session } from "meteor/session";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const Signup = () => {
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordRepeatError, setPasswordRepeatError] = useState("");
  const emailInput = useRef();
  const passwordInput = useRef();
  const passwordRepeatInput = useRef();

  const onSubmit = e => {
    e.preventDefault();

    setError("");
    setPasswordError("");
    setPasswordRepeatError("");

    const email = emailInput.current.value.trim();
    const password = passwordInput.current.value.trim();
    const passwordRepeat = passwordRepeatInput.current.value.trim();

    if (password.length < 8) {
      return setPasswordError("Пароль должен быть длиннее 8 символов");
    }

    if (password !== passwordRepeat) {
      return setPasswordRepeatError("Пароли не совпадают");
    }

    Accounts.createUser({ email, password }, error => {
      if (error) {
        setError(error.reason);
      } else {
        emailInput.current.value = "";
        passwordInput.current.value = "";
      }
    });
  };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <h3>Регистрация</h3>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
        }}
        onSubmit={onSubmit}
        noValidate
        autoComplete="off"
      >
        <TextField
          error={!!error}
          id="signup-email"
          label="Email"
          type="email"
          helperText={error}
          inputProps={{ ref: emailInput }}
        />
        <TextField
          style={{ marginTop: "1rem" }}
          error={!!passwordError}
          id="signup-password"
          label="Пароль"
          type="password"
          helperText={passwordError}
          inputProps={{ ref: passwordInput }}
        />
        <TextField
          style={{ marginTop: "1rem" }}
          error={!!passwordRepeatError}
          id="signup-password-repeat"
          label="Подтверждение пароля"
          type="password"
          helperText={passwordRepeatError}
          inputProps={{ ref: passwordRepeatInput }}
        />
        <Button
          style={{ marginTop: "2rem" }}
          type="submit"
          variant="contained"
          color="primary"
        >
          ОК
        </Button>
      </form>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
          flex: 1,
        }}
      >
        <Button
          style={{ fontSize: "0.7rem", marginBottom: "2rem" }}
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
