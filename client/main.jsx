import React from "react";
import { Meteor } from "meteor/meteor";
import { render } from "react-dom";

import "../imports/startup/simpl-schema-configuration";
import "../imports/startup/session-variables";

import { App } from "../imports/ui/App";

Meteor.startup(() => {
  render(<App />, document.getElementById("app"));
});
