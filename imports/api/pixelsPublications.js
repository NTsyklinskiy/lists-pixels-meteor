import { Meteor } from 'meteor/meteor';
import { PixelsCollection } from '../db/PixelsCollection';

Meteor.publish('pixel', function publishPixels(currentPixel) {
  return PixelsCollection.find({_id: currentPixel});
});