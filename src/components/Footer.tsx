import React from 'react';
import {
  Button,
  Container
} from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Footer = (props: any) => {
  const year = (new Date()).getFullYear();
  return (
    <footer className="footer-1 bg-light text-dark">
      <Container>
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
      	<div className="links">
      		<ul className="footer-menu list-unstyled d-flex flex-row text-center text-md-left">
      			<li><a href="https://github.com/croogo?tab=members" target="_blank" rel="noopener noreferrer">Team</a></li>
      			<li><a href="https://github.com/croogo/croogo/blob/master/LICENSE.txt" target="_blank" rel="noopener noreferrer">License</a></li>
      		</ul>
      	</div>
      	<div className="social mt-4 mt-md-0">
          <Button color="blue" outline className="twitter btn-icon" href="https://twitter.com/croogo" target="_blank">
            <FontAwesomeIcon icon={['fab', 'twitter']} />
            <span className="sr-only">View our Twitter Profile</span>
          </Button>
          {" "}
          <Button color="black" outline className="github btn-icon" href="https://github.com/croogo" target="_blank">
            <FontAwesomeIcon icon={['fab', 'github']} />
            <span className="sr-only">View our GitHub Profile</span>
          </Button>
        </div>
      </div>
      <div className="copyright text-center">
      	<hr />
      	<p className="small">&copy; { year }, made with
          <span className="text-danger">
            {" "}<FontAwesomeIcon icon="heart" />{" "}
          </span>
          by Croogo Development Team
        </p>
      </div>
      </Container>
    </footer>
  );
};

export default Footer;
