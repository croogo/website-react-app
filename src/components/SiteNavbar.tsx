import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useCallback, useEffect, useState } from 'react';
import { NavLink as RNavLink } from 'react-router-dom';
import { useApi } from 'react-use-api';
import { Button, Collapse, Container, Nav, Navbar, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { MenuItem } from 'types/entities';
import config from '../config';
import { dataFormatter } from '../context/api';
import { useUi } from '../context/ui';

const logo = '/img/logo_croogo.png';

declare interface SiteNavbarProps {
  menuAlias: string;
}

const SiteNavbar = (props: SiteNavbarProps) => {
  const { setLoading, menuItems, setMenuItems } = useUi();
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const [linksPayload, {loading: linksLoading}] = useApi({
    url: '/links',
    params: {
      menuAlias: props.menuAlias,
    },
  });

  const links: MenuItem[] = linksPayload ? dataFormatter.deserialize(linksPayload) as any[]: [];

  useEffect(useCallback(() => {
    const newMenuItems = new Map(menuItems)
    newMenuItems.set(props.menuAlias, links);
    setMenuItems(newMenuItems);
    setLoading(linksLoading);
  }, [links, linksLoading, menuItems, props.menuAlias, setMenuItems, setLoading]), [linksPayload]);

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
