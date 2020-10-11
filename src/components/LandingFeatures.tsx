import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import bootstrap from '../assets/img/bootstrap.png';
import cakephp from '../assets/img/cakephp_small.png';
import php from '../assets/img/php.png';
import sql from '../assets/img/sql.png';
import Feature from './Feature';


const LandingFeatures = () => {
  let fProps = [
    {
      color: "primary",
      title: "Supports PHP 7.4",
      imgPath: php,
      text: "Freedom to run on almost any server!"
    },
    {
      color: "primary",
      imgPath: sql,
      title: "Databases",
      text: "Compatible with both MySQL and PostgreSQL"
    },
    {
      color: "primary",
      title: "CakePHP",
      imgPath: cakephp,
      text: 'Powered by the very popular framework.',
    },
    {
      color: "primary",
      imgPath: bootstrap,
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
