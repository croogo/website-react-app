import React, { FunctionComponent } from 'react';
import Footer from "./../components/Footer";
import SiteNavbar from '../components/SiteNavbar';

const DefaultLayout: FunctionComponent = (props) => {
  return (
    <>
      <SiteNavbar />
      {props.children}
      <Footer />
    </>
  );
};

export default DefaultLayout;
