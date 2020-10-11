import React, { FunctionComponent } from "react";
import LandingFeatures from "../components/LandingFeatures";
import LandingHeader from "../components/LandingHeader";

const Presentation: FunctionComponent = (props) => {
  return (
    <div className='landing'>
      <LandingHeader />
      <LandingFeatures />
    </div>
  )
}

export default Presentation;
