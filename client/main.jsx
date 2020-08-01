import React from "react";
import { Meteor } from "meteor/meteor";
import { render } from "react-dom";
import { Tracker } from "meteor/tracker";

import "../imports/startup/simpl-schema-configuration";
import { App } from "/imports/ui/App";

Meteor.startup(() => {
  render(<App />, document.getElementById("app"));
});
