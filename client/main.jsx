import React from "react";
import { Meteor } from "meteor/meteor";
import { render } from "react-dom";
import { Tracker } from "meteor/tracker";

import "../imports/startup/simpl-schema-configuration";
import { Routes } from "../imports/ui/routes/Routes";

Meteor.startup(() => {
  render(<Routes />, document.getElementById("app"));
});
