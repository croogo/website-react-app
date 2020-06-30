import React, { FunctionComponent } from 'react';
import { Col, Container, Row } from 'reactstrap';
import Region from '../components/Region';
import SiteNavbar from '../components/SiteNavbar';
import Footer from "./../components/Footer";

const BlogLayout: FunctionComponent = (props) => {
  return (
    <>
      <SiteNavbar />
      <Container>

      <Row>
        <Col md={ 8 }>
          {props.children}
        </Col>
        <Col md={ 4 }>
            <Region name='right'/>
        </Col>
      </Row>
      </Container>
      <Footer />
    </>
  );
};

export default BlogLayout;
