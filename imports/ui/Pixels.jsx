import { Meteor } from 'meteor/meteor';
import React from 'react'
import styled from 'styled-components'
import { PixelsCollection } from '../db/PixelsCollection';
import { useTracker } from 'meteor/react-meteor-data';

const Pixels = ({currentPixel}) => {
  const pixel = useTracker(() => {
    if(currentPixel){
      const handler = Meteor.subscribe('pixel',currentPixel );

      if (!handler.ready()) {
        return { pixel: [],isLoading: true };
      }

      return PixelsCollection.find({_id: currentPixel},{
        sort: { createdAt: -1 },
      }
      ).fetch();
    }
    return []
  }); 

  const handlerPixel = (pixelId, id, isPixel) => {
    Meteor.call('list.setIsPixel', pixelId, id, isPixel);
  }

  return (
    <PixelsStyle>
      {
        !pixel.length 
          ? <div className='static'>Выберите комнату</div>
          : pixel[0]?.pixels.map((pix)=>{
            return (<PixelBox 
              style={{background: pix.pixel ? 'black' : 'white'}} 
              key={pix.id} 
              onClick={() =>handlerPixel(pixel[0]?._id,pix.id,!pix.pixel)}
              />)
            })
      }
      
    </PixelsStyle>
  )
}

const PixelsStyle = styled.div`
position: relative;
  flex: 0 0 70%;
  display: grid;
  background: white;
  grid-template-columns: repeat(10, 1fr);
  padding: 20px 30px 20px 20px;
  .static {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%)
  }
`;

const PixelBox = styled.div`
  height: 100%;
  border: 1px solid #d8d8d8;
  min-width: 10px;
  width: 100%;
`;

export default Pixels
