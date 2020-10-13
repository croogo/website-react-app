import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useCallback, useEffect, useState } from 'react';
import { NavLink as RNavLink } from 'react-router-dom';
import { Button, Collapse, Container, Nav, Navbar, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import logo from '../assets/img/logo_croogo.png';
import config from '../config';
import { dataFormatter, useApi } from '../context/api';
import { useUi } from '../context/ui';

declare interface SiteNavbarProps {
  menuAlias: string;
}

const SiteNavbar = (props: SiteNavbarProps) => {
  const { Links } = useApi();
  const { setLoading, menuItems, setMenuItems } = useUi();
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  useEffect(useCallback(() => {
    setLoading(true);
    Links
      .index({
        params: {
          menuAlias: props.menuAlias,
        },
      })
      .then(res => res.data)
      .then(json => {
        const links = dataFormatter.deserialize(json) as any[];
        const newMenuItems = new Map(menuItems)
        newMenuItems.set(props.menuAlias, links);
        setMenuItems(newMenuItems);
      })
      .catch(e => console.error)
      .finally(() => setLoading(false));
  }, [Links, props.menuAlias, menuItems, setLoading, setMenuItems]), []);

  return (
    <Navbar expand="lg" light className="light mb-4">
      <Container>
        <NavLink to="/" tag={RNavLink} className="navbar-brand d-fles align-items-center text-dark">
          <img className="mr-2 img-fluid rounded" style={{ height: 30 }} src={logo} alt="logo" />
          {config.site.name}
        </NavLink>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-lg-auto" navbar>

            {
              menuItems.get(props.menuAlias)?.map(link => (
                <NavItem key={`nav-item-${link.id}`} className='mx-2'>
                  { link.path.startsWith('http')
                    ? <NavLink href={link.path} className={link.class} target={link.target} rel={link.rel}>{link.title}</NavLink>
                    : <NavLink to={link.path} tag={RNavLink}>{link.title}</NavLink>
                  }
                </NavItem>
              ))
            }

            <NavItem className='mx-2'>
              <Button color='primary' href='https://downloads.croogo.org'>
                <FontAwesomeIcon icon="download" /> {" "}
              Download
            </Button>
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}

export default SiteNavbar;
