import { check } from 'meteor/check';
import { ListsCollection } from '../db/ListsCollection';
import { PixelsCollection} from '../db/PixelsCollection'
 
Meteor.methods({
  'list.insert'(title) {
    check(title, String);
 
    const pixel = PixelsCollection.insert({
      pixels: Array(100).fill(0).map((_,i) => ({
        id: i+1,
        pixel: false
      }))
    })
    ListsCollection.insert({
      title,
      pixel,
      createdAt: new Date(),
    });
  },
 
  'list.remove'(_id, pixelId) {
    check(_id, String);
    check(pixelId, String);
 
    ListsCollection.remove(_id);
    PixelsCollection.remove(pixelId);
  },
 
  'list.setIsPixel'(pixelId, id, isPixel) {
    check(pixelId, String);
    check(id, Number);
    check(isPixel, Boolean);
 
    PixelsCollection.update({_id: pixelId}, {
      $set: {
        [`pixels.${id - 1}.pixel`]: isPixel
      }
    });
  }
});