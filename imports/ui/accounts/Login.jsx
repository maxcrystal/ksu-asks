import React, { useState, useRef } from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";

const Login = () => {
  const [error, setError] = useState("");
  const userId = useTracker(() => Meteor.userId(), []);
  const emailInput = useRef();
  const passwordInput = useRef();

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

  if (userId) {
    return null;
  }
  return (
    <div>
      <h3>Login:</h3>

      {error ? <p>{error}</p> : null}

      <form onSubmit={onSubmit} noValidate>
        <input
          type="email"
          ref={emailInput}
          name="login-email"
          placeholder="Email"
        />
        <input
          type="password"
          ref={passwordInput}
          name="login-password"
          placeholder="Password"
        />
        <button>Войти</button>
      </form>
    </div>
  );
};

export { Login };
