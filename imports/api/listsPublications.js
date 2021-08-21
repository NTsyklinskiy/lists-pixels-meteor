import { Meteor } from 'meteor/meteor';
import { ListsCollection } from '../db/ListsCollection';

Meteor.publish('lists', function publishLists() {
  return ListsCollection.find({});
});