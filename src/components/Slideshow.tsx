import { Slide } from 'react-slideshow-image';
import React from 'react';

const properties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: true,
  indicators: true,
  arrows: true,
  pauseOnHover: true,
  onChange: (oldIndex: number, newIndex: number) => {
    //console.log(`slide transition from ${oldIndex} to ${newIndex}`);
  }
}

const Slideshow = (props: any) => {
  const { images } = props;
  return (
    <div className="slide-container">
      <Slide {...properties}>
        {images.map((imageUrl: string) => (
          <div className="each-slide">
            <div style={{ backgroundSize: 'cover', backgroundImage: `url(${imageUrl})` }}>
            </div>
          </div>
        ))}
      </Slide>
    </div>
  )
}

export default Slideshow;
