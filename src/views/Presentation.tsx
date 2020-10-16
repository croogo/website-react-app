import LandingFeatures from 'components/LandingFeatures';
import LandingHeader from 'components/LandingHeader';
import React, { FunctionComponent } from 'react';

const Presentation: FunctionComponent = (props) => {
  return (
    <div className='landing'>
      <LandingHeader />
      <LandingFeatures />
    </div>
  )
}

export default Presentation;
