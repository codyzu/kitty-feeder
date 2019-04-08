import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import firebase from './firebase-app';

afterAll(() => {
  console.log('Cleaning up...');
  return firebase.app().delete();
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
