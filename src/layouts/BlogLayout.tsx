import Footer from "components/Footer";
import { NProgressBar } from 'components/NProgressBar';
import Region from 'components/Region';
import SiteNavbar from 'components/SiteNavbar';
import React, { FunctionComponent, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';

const BlogLayout: FunctionComponent = (props) => {
  const location = useLocation();
  useEffect(() => {
    setTimeout(() => {
      const cards = document.querySelectorAll('.card');
      if (cards.length > 0) {
        cards[0].scrollIntoView({ behavior: "smooth", block: 'start' });
      }
    }, 250);
  }, [location.pathname, location.search]);

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
