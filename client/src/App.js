import React, {useState, useEffect} from 'react';
import {Container} from 'reactstrap';
import {Switch, Route} from 'react-router-dom';
import firebase from './firebase-app';
import Header from './Header';
import FeedingPlanner from './FeedingPlanner';
import BrowseFeedings from './BrowseFeedings';
import SignIn from './SignIn';
import FinishSignIn from './FinishSignIn';

const App = () => {
  const [user, setUser] = useState({authDone: false, isGuest: true, isAdmin: false});
  useEffect(() => firebase.auth().onAuthStateChanged(async authUser => {
    if (authUser === null) {
      setUser({authDone: true, isGuest: true, isAdmin: false});
      return;
    }

    const adminSnapshot = await firebase.firestore().collection('admins').doc(authUser.uid).get();
    setUser({
      authDone: true,
      isGuest: false,
      email: authUser.email,
      uid: authUser.uid,
      isAdmin: adminSnapshot.exists
    });
  }), []);

  return (
    <>
      <Header/>
      <Container>
        <Switch>
          <Route exact path="/" component={BrowseFeedings}/>
          <Route exact path="/add" render={props => <FeedingPlanner user={user} {...props}/>}/>
          <Route exact path="/signin" render={props => <SignIn user={user} {...props}/>}/>
          <Route exact path="/finishsignin" render={props => <FinishSignIn user={user} {...props}/>}/>
        </Switch>
      </Container>
    </>
  );
};

export default App;
