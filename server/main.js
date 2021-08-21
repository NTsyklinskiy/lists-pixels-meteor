import { Meteor } from 'meteor/meteor';
import { PixelsCollection } from '../imports/db/PixelsCollection';
import { ListsCollection } from '../imports/db/ListsCollection';
import '../imports/api/listMethod';
import '../imports/api/listsPublications';
import '../imports/api/pixelsPublications';

function insertList({ title }) {
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
}

Meteor.startup(() => {
  if (ListsCollection.find().count() === 0) {
   
    insertList({
      title: 'Цветок',
    });
  }
});

