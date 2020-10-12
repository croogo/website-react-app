import React, { FunctionComponent, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import { NProgressBar } from '../components/NProgressBar';
import Region from '../components/Region';
import SiteNavbar from '../components/SiteNavbar';
import Footer from "./../components/Footer";

const BlogLayout: FunctionComponent = (props) => {

  const location = useLocation();
  useEffect(() => {
    document.querySelector('.card-title')?.scrollIntoView({ behavior: "smooth", block: 'nearest' });
  }, [location]);

  return (<>
    <NProgressBar />
    <SiteNavbar menuAlias='main' />
    <Container>

      <Row>
        <Col md={8}>
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
