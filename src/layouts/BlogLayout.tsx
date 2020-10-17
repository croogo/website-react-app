import Footer from "components/Footer";
import { NProgressBar } from 'components/NProgressBar';
import Region from 'components/Region';
import SiteNavbar from 'components/SiteNavbar';
import { useUi } from "context/ui";
import React, { FunctionComponent, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';

const BlogLayout: FunctionComponent = (props) => {
  const location = useLocation();
  const { isLoading } = useUi();

  useEffect(() => {
    if (isLoading) {
      return;
    }
    setTimeout(() => {
      const container = window.document.getElementById('left-container');
      container && container.scrollIntoView({ behavior: "smooth", block: 'start' });
    }, 250);
  }, [location.pathname, location.search, isLoading]);

  return (<>
    <NProgressBar />
    <SiteNavbar menuAlias='main' />
    <Container>

      <Row>
        <Col id='left-container' md={8}>
          {props.children}
        </Col>
        <Col md={4}>
          <Region name='right' />
        </Col>
      </Row>
    </Container>
    <Footer />
  </>);
};

export default BlogLayout;
