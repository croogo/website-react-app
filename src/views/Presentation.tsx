import React, { FunctionComponent } from "react";
import LandingHeader from "../components/LandingHeader";
import LandingFeatures from "../components/LandingFeatures";

const Presentation: FunctionComponent = (props) => {
  return (
    <div className='landing'>
      <LandingHeader />
      <LandingFeatures />
    </div>
  )
}

export default Presentation;
