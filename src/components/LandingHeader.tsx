import React from 'react';
import { Col, Container, Form, Row } from 'reactstrap';
import admin from '../assets/img/admin.png';
import plugin from '../assets/img/plugin.png';
import Slideshow from './Slideshow';

const LandingHeader = () => {

  const slideImages = [
    admin,
    plugin,
  ];

  return (
    <div className="header bg-white">
      <Container>
        <Row>
          <Col xs="12" md="5" className='my-5'>
            <h1 className="display-4">A CakePHP CMS</h1>
            <p className="lead my-4">Baking since 2005!</p>
            <Form className="form-subscribe form-inline mb-3">
              <a href='https://downloads.croogo.org/' className="btn btn-primary mt-0 mt-md-3 mt-lg-0">Download</a>
            </Form>
          </Col>
          <Col xs="12" md="7">
            <Slideshow images={slideImages} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LandingHeader;
