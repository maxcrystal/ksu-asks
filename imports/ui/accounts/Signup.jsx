import React, { useState, useRef } from "react";
import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import { useTracker } from "meteor/react-meteor-data";

const Signup = () => {
  const [error, setError] = useState("");
  const userId = useTracker(() => Meteor.userId());
  const emailInput = useRef();
  const passwordInput = useRef();

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

  if (userId) {
    return null;
  } else {
    return (
      <div>
        <h3>Signup:</h3>

        {error ? <p>{error}</p> : null}

        <form onSubmit={onSubmit} noValidate>
          <input
            type="email"
            ref={emailInput}
            name="signup-email"
            placeholder="Email"
          />
          <input
            type="password"
            ref={passwordInput}
            name="signup-password"
            placeholder="Password"
          />
          <button>Create Account</button>
        </form>
      </div>
    );
  }
};

export { Signup };
