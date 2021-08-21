import React, { useState } from 'react';
import styled from 'styled-components'
import { useTracker } from 'meteor/react-meteor-data';
import Lists from './Lists.jsx';
import Pixels from './Pixels.jsx';
import { ListsCollection } from '../db/ListsCollection.js';

export const App = () => {
  const [currentPixel, setCurrentPixel] = useState('')
  
  const lists = useTracker(() => {
    const handler = Meteor.subscribe('lists');

    if (!handler.ready()) {
      return { lists: [], isLoading: true };
    }

    return ListsCollection.find({},{
      sort: { createdAt: -1 },
    }
  ).fetch();
  }); 

  return(
  <Container>
    <Lists 
      lists={lists} 
      currentPixel={currentPixel} 
      setCurrentPixel={setCurrentPixel}
    />
    <Pixels currentPixel={currentPixel}/>
  </Container>
);
}


const Container = styled.div`
  display: flex;
  justify-content: center;
  gap: 1vw;
`