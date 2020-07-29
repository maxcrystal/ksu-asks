import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
import { slugify } from "transliteration";

const Couples = new Mongo.Collection("couples");

/**
 * _id,
 * names: object {he: string, she: string},
 * slug: sanitized name to use as parto of the links adddress
 * avatar: image
 * points: number,
 * createdAT
 */

Meteor.methods({
  "couples.insert"({ he, she }) {
    // TODO: validate

    const names = { he, she };
    const slug = slugify(`${he}-${she}`); // TODO check for uniqness

    Couples.insert({
      names,
      slug,
      pints: 0,
      createdAt: Date.now(),
    });
  },
});

export { Couples };
