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
  const [user, setUser] = useState(null);
  useEffect(() => firebase.auth().onAuthStateChanged(authUser => setUser(authUser)), []);

  return (
    <>
      <Header/>
      <Container>
        <Switch>
          <Route exact path="/" component={BrowseFeedings}/>
          <Route exact path="/add" component={FeedingPlanner}/>
          <Route exact path="/signin" render={props => <SignIn user={user} {...props}/>}/>
          <Route exact path="/finishsignin" render={props => <FinishSignIn user={user} {...props}/>}/>
        </Switch>
      </Container>
    </>
  );
};

export default App;
