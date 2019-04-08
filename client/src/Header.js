import React, {useState} from 'react';
import {Route, Link} from 'react-router-dom';
import {Container, Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink, Form, Input, Button, InputGroup, InputGroupAddon} from 'reactstrap';
import {MdExitToApp} from 'react-icons/md';
import firebase from './firebase-app';

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
        {
          user.isGuest === false ?
            <>
              <NavItem className="navbar-text">
                {user.email}
              </NavItem>
              <Button title="Sign Out" color="link" onClick={() => firebase.auth().signOut()}><MdExitToApp/></Button>
            </> :
            <Form inline>
              <InputGroup>
                <Input required type="email" placeholder="email address"/>
                <InputGroupAddon addonType="append">
                  <Button color="primary">SignIn</Button>
                </InputGroupAddon>
              </InputGroup>
            </Form>
        }
      </Navbar>
    </Container>
  );
};

export default Header;
