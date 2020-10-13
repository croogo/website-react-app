import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Button,
  Container
} from "reactstrap";
import { dataFormatter, useApi } from '../context/api';
import { useUi } from '../context/ui';
import { MenuItem } from '../types/entities';

const Footer = () => {
  const { Links } = useApi();
  const { setLoading } = useUi();
  const year = (new Date()).getFullYear();
  const [links, setLinks] = useState([] as MenuItem[]);

  useEffect(useCallback(() => {
    setLoading(true);
    Links
      .index({
        params: {
          menuAlias: 'footer',
        },
      })
      .then(res => res.data)
      .then(json => {
        const links = dataFormatter.deserialize(json) as MenuItem[];
        setLinks(links);
      })
      .catch(e => console.error)
      .finally(() => setLoading(false));
  }, [Links, setLoading]), []);

  return (
    <footer className="footer-1 bg-light text-dark">
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

export default Footer;
