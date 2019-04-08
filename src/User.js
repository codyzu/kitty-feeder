import React, {useState} from 'react';
import {NavItem, Form, Input, Button, InputGroup, InputGroupAddon} from 'reactstrap';
import {matchPath} from 'react-router-dom';
import {MdExitToApp} from 'react-icons/md';
import firebase from './firebase-app';

const User = ({user, location}) => {
  const [email, setEmail] = useState('');

  function onEmailChange(event) {
    setEmail(event.target.value);
  }

  async function doSignIn() {
    try {
      const actionCodeSettings = {
        // URL you want to redirect back to. The domain (www.example.com) for this
        // URL must be whitelisted in the Firebase Console.
        url: `${window.location.protocol}//${window.location.host}/finishsignin?redirect=${location.pathname}`,
        // This must be true.
        handleCodeInApp: true
      };

      await firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings);
      // The link was successfully sent. Inform the user.
      // Save the email locally so you don't need to ask the user for it again
      // if they open the link on the same device.
      console.log('Storing email:', email);
      window.localStorage.setItem('emailForSignIn', email);
      console.log('Stored value:', window.localStorage.getItem('emailForSignIn'));
    } catch (error) {
      console.error(error);
    }
  }

  if (user.isGuest) {
    return (
      <Form inline>
        <InputGroup>
          <Input required name="email" id="signInEmail" type="email" placeholder="email address" value={email} onChange={onEmailChange}/>
          <InputGroupAddon addonType="append">
            <Button color="primary" onClick={doSignIn}>SignIn</Button>
          </InputGroupAddon>
        </InputGroup>
      </Form>
    );
  }

  return (
    <>
      <NavItem className="navbar-text">
        {user.email}
      </NavItem>
      <Button title="Sign Out" color="link" onClick={() => firebase.auth().signOut()}><MdExitToApp/></Button>
    </>
  );
};

export default User;
