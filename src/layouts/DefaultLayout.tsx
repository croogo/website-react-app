import React, { FunctionComponent } from 'react';
import SiteNavbar from '../components/SiteNavbar';
import Footer from "./../components/Footer";

const DefaultLayout: FunctionComponent = (props) => {
  return (
    <>
      <SiteNavbar menuAlias='main'/>
      {props.children}
      <Footer />
    </>
  );
};

export default DefaultLayout;
