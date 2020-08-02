import React from "react";
import { Login } from "./Login";
import { Logout } from "./Logout";
import { Signup } from "./Signup";

const AccountPage = () => {
  return (
    <div>
      <h2>AccountPage:</h2>
      <Logout />
      <Login />
      <Signup />
    </div>
  );
};

export { AccountPage };
