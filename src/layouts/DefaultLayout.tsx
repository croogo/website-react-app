import React, { FunctionComponent } from 'react';
import { NProgressBar } from '../components/NProgressBar';
import SiteNavbar from '../components/SiteNavbar';
import Footer from "./../components/Footer";

const DefaultLayout: FunctionComponent = (props) => {
  return (<>
    <NProgressBar />
    <SiteNavbar menuAlias='main' />
    {props.children}
    <Footer />
  </>);
};

export default DefaultLayout;
