import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FunctionComponent, useState } from 'react';
import { Button, Collapse, Container, Nav, Navbar, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import logo from '../assets/img/logo_croogo.png';
import { NavLink as RNavLink } from 'react-router-dom';

const SiteNavbar: FunctionComponent = props => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar expand="lg" className="mb-4">
    <Container>
      <NavLink to="/" tag={ RNavLink } className="navbar-brand d-fles align-items-center text-dark">
        <img className="mr-2 img-fluid rounded" style={{height: 30}} src={logo} alt="logo" />
        Croogo
      </NavLink>
      <NavbarToggler onClick={ toggle } />
      <Collapse isOpen={ isOpen } navbar>
        <Nav className="ml-lg-auto" navbar>
          <NavItem className='mx-2'>
            <NavLink href='//docs.croogo.org/'>
              Documentation
            </NavLink>
          </NavItem>
          <NavItem className='mx-2'>
            <NavLink to='/blog' tag={ RNavLink }>
              Blog
            </NavLink>
          </NavItem>
          <NavItem className='mx-2'>
            <NavLink to='/support' tag={ RNavLink }>
              Support
            </NavLink>
          </NavItem>
          <NavItem className='mx-2'>
            <NavLink href='//github.com/croogo/croogo'>
              Source
            </NavLink>
          </NavItem>
          <NavItem className='mx-2'>
            <NavLink href='//github.com/croogo/croogo/issues'>
              Issues
            </NavLink>
          </NavItem>
          <NavItem className='mx-2'>
            <NavLink href='https://groups.google.com/forum/?fromgroups#!forum/croogo'>
              Discuss
            </NavLink>
          </NavItem>
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
