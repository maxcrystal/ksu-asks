import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";

Mongo.Collection.prototype.aggregate = function (pipelines, options) {
  const coll = this.rawCollection();
  return Meteor.wrapAsync(coll.aggregate.bind(coll))(pipelines, options);
};

Mongo.Collection.prototype.createIndex = function (fields, options) {
  const coll = this.rawCollection();
  return Meteor.wrapAsync(coll.createIndex.bind(coll))(fields, options);
};
