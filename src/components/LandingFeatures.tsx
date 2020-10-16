import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import Feature from './Feature';

const LandingFeatures = () => {
  let fProps = [
    {
      color: "primary",
      title: "Supports PHP 7.4",
      imgPath: '/img/php.png',
      text: "Freedom to run on almost any server!"
    },
    {
      color: "primary",
      imgPath: '/img/sql.png',
      title: "Databases",
      text: "Compatible with both MySQL and PostgreSQL"
    },
    {
      color: "primary",
      title: "CakePHP",
      imgPath: '/img/cakephp_small.png',
      text: 'Powered by the very popular framework.',
    },
    {
      color: "primary",
      imgPath: '/img/bootstrap.png',
      title: "Works with Bootstrap",
      text: "Built with Bootstrap for responsive admini UI.",
    },]

  let features = fProps.map((feature, index) => {
    return (
      <Col xs="12" md="3" key={`feature-${index}`}>
        <Feature {...feature} />
      </Col>
    );
  });

  return (
    <div className="features">
      <Container>

        <h1 className='text-center'>
          Built on proven technologies
        </h1>

        <Row>
          {features}
        </Row>
      </Container>
    </div>
  );
};

export default LandingFeatures;
