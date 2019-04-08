import React, {useState} from 'react';
import {Route, Link} from 'react-router-dom';
import {Container, Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink} from 'reactstrap';
import User from './User';

const RoutedNavLink = ({to, label}) => (
  <Route exact path={to}>
    {({match}) => <NavLink active={match !== null} tag={Link} to={to}>{label}</NavLink>}
  </Route>
);

const Header = ({user}) => {
  const [isOpen, setIsOpen] = useState(false);

  function toggle() {
    setIsOpen(!isOpen);
  }

  return (
    <Container>
      <Navbar light color="light" expand="md">
        <NavbarBrand className="text-primary">KittyFeeder</NavbarBrand>
        <NavbarToggler onClick={toggle}/>
        <Collapse navbar isOpen={isOpen}>
          <Nav navbar pills>
            <NavItem>
              <RoutedNavLink to="/" label="All"/>
            </NavItem>
            <NavItem>
              <RoutedNavLink to="/add" label="Add"/>
            </NavItem>
          </Nav>
        </Collapse>
        <Route render={props => <User user={user} {...props}/>}/>
      </Navbar>
    </Container>
  );
};

export default Header;
