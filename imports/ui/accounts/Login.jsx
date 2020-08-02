import React, { useState, useRef } from "react";
import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";

const Login = () => {
  const [error, setError] = useState("");
  const [userId, setUserId] = useState(Meteor.userId());
  const emailInput = useRef();
  const passwordInput = useRef();

  const onSubmit = e => {
    e.preventDefault();

    const email = emailInput.current.value.trim();
    const password = passwordInput.current.value.trim();

    Meteor.loginWithPassword({ email }, password, error => {
      console.log(email, error);
      if (error) {
        setError(error.reason);
      } else {
        setError("");
        setUserId(Meteor.userId());
      }
    });
  };

  const handleLogoutClick = () => {
    Accounts.logout(error => {
      if (error) {
        setError(error.reason);
      } else {
        setUserId(null);
      }
    });
  };

  if (userId) {
    return (
      <div>
        <h3>Logout:</h3>
        <button onClick={handleLogoutClick}>Logout</button>
      </div>
    );
  }

  return (
    <div>
      <h3>Login:</h3>

      {error ? <p>{error}</p> : null}

      <form onSubmit={onSubmit.bind(this)} noValidate>
        <input type="email" ref={emailInput} name="email" placeholder="Email" />
        <input
          type="password"
          ref={passwordInput}
          name="password"
          placeholder="Password"
        />
        <button>Login</button>
      </form>
    </div>
  );
};

export { Login };
