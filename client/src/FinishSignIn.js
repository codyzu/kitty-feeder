import React, {useEffect} from 'react';
import firebase from './firebase-app';

const FinishSignIn = ({user}) => {
  useEffect(() => {
    finishSignIn();
  }, []);

  return user.isGuest === false ? <h1>Signed in as {user.email}</h1> : <h1>Completing Sign In...</h1>;
};

async function finishSignIn() {
  try {
    // Confirm the link is a sign-in with email link.
    if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
      // Additional state parameters can also be passed via URL.
      // This can be used to continue the user's intended action before triggering
      // the sign-in operation.
      // Get the email if available. This should be available if the user completes
      // the flow on the same device where they started it.
      console.log('fetching email');
      let email = window.localStorage.getItem('emailForSignIn');
      console.log('Stored email:', email);
      if (!email) {
        // User opened the link on a different device. To prevent session fixation
        // attacks, ask the user to provide the associated email again. For example:
        email = window.prompt('Please provide your email for confirmation');
      }

      // The client SDK will parse the code from the link for you.
      const result = await firebase.auth().signInWithEmailLink(email, window.location.href);
      // Clear email from storage.
      console.log('deleting email');
      window.localStorage.removeItem('emailForSignIn');
      // You can access the new user via result.user
      // Additional user info profile not available via:
      // result.additionalUserInfo.profile == null
      // You can check if the user is new or existing:
      // result.additionalUserInfo.isNewUser
    }
  } catch (error) {
    console.error(error);
  }
}

export default FinishSignIn;
