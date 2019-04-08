import React, {useState} from 'react';
import {Route, Link} from 'react-router-dom';
import {Container, Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink} from 'reactstrap';

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
        <NavbarBrand className="text-success">KittyFeeder</NavbarBrand>
        <NavbarToggler onClick={toggle}/>
        <Collapse navbar isOpen={isOpen}>
          <Nav navbar>
            <NavItem>
              <RoutedNavLink to="/" label="All"/>
            </NavItem>
            <NavItem>
              <RoutedNavLink to="/add" label="Add"/>
            </NavItem>
            <NavItem>
              <RoutedNavLink to="/signin" label="SignIn"/>
            </NavItem>
          </Nav>
        </Collapse>
        <NavItem className="navbar-text">
          {user.isGuest === false ? user.email : 'Please sign in...'}
        </NavItem>
      </Navbar>
    </Container>
  );
};

export default Header;
