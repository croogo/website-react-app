import Footer from "components/Footer";
import { NProgressBar } from 'components/NProgressBar';
import SiteNavbar from 'components/SiteNavbar';
import React, { FunctionComponent } from 'react';

const DefaultLayout: FunctionComponent = (props) => {
  return (<>
    <NProgressBar />
    <SiteNavbar menuAlias='main' />
    {props.children}
    <Footer />
  </>);
};

export default DefaultLayout;
