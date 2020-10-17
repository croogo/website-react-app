import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { dataFormatter } from 'context/api';
import { useUi } from 'context/ui';
import React, { useCallback, useEffect } from 'react';
import { useApi } from 'react-use-api';
import {
  Button,
  Container
} from "reactstrap";
import { MenuItem } from 'types/entities';

export interface FooterProps {
  useCache: boolean;
}

const Footer = (props: FooterProps) => {
  const { useCache } = props;
  const { setLoading } = useUi();
  const year = (new Date()).getFullYear();

  const [linksPayload, {loading: linksLoading}] = useApi({
    url: '/links',
    params: {
      menuAlias: 'footer',
    },
  }, { useCache });

  const links: MenuItem[] = linksPayload ? dataFormatter.deserialize(linksPayload) as MenuItem[]: [];

  useEffect(useCallback(() => {
    setLoading(linksLoading);
  }, [setLoading, linksLoading]), []);

  return (
    <footer className="footer-1 bg-light text-dark" style={{ position: "inherit"}}>
      <Container>
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
          <div className="links">
            <ul className="footer-menu list-unstyled d-flex flex-row text-center text-md-left">
              {links && links.map(link => (
                <li key={`link-${link.id}`}><a href={link.path} target={link.target} rel={link.rel}>{link.title}</a></li>
              ))}
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
          <p className="small">&copy; {year}, made with
          <span className="text-danger">
              {" "}<FontAwesomeIcon icon="heart" />{" "}
            </span>
          by Croogo Development Team (based on <a rel='noopener noreferrer' target='_blank' href='https://bootstrapbay.com/theme/lazy-free-react-ui-kit-BD90DEB'>Lazy Kit UI Kit</a>)
        </p>
        </div>
      </Container>
    </footer>
  );
};

Footer.defaultProps = {
  useCache: true,
}

export default Footer;
