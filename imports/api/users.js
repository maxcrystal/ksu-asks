import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import SimpleSchema from "simpl-schema";

const validateNewUser = user => {
  const email = user.emails[0].address;

  const schema = new SimpleSchema({
    email: {
      type: String,
      regEx: SimpleSchema.RegEx.EmailWithTLD,
    },
  });
  schema.clean({ email });
  schema.validate({ email });

  return true;
};

if (Meteor.isServer) {
  Accounts.validateNewUser(validateNewUser);
}
