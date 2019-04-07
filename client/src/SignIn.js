import React, {useState} from 'react';
import {Row, Col, Form, FormGroup, Label, Input, Button} from 'reactstrap';
import firebase from './firebase-app';

const SignIn = ({user}) => {
  const [email, setEmail] = useState('');

  function onEmailChange(event) {
    setEmail(event.target.value);
  }

  async function doSignIn() {
    try {
      const actionCodeSettings = {
        // URL you want to redirect back to. The domain (www.example.com) for this
        // URL must be whitelisted in the Firebase Console.
        url: `${window.location.protocol}//${window.location.host}/finishsignin`,
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

  return user ?
    (
      <Row>
        <Col>
          <h1>Already signed in as {user.email}</h1>
          <Button onClick={() => firebase.auth().signOut()}>Sign Out</Button>
        </Col>
      </Row>
    ) :
    (
      <Row>
        <Col>
          <Form>
            <FormGroup>
              <Label for="signInEmail">Email</Label>
              <Input type="email" name="email" id="signInEmail" placeholder="you@email.com" value={email} onChange={onEmailChange}/>
            </FormGroup>
            <Button onClick={doSignIn}>Sign In</Button>
          </Form>
        </Col>
      </Row>
    );
};

export default SignIn;
