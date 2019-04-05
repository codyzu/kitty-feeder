import React from 'react';
import {Container} from 'reactstrap';
import Header from './Header';
import FeedingPlanner from './FeedingPlanner';

const App = () => {
  return (
    <>
      <Header/>
      <Container>
        <FeedingPlanner/>
      </Container>
    </>
  );
};

export default App;
