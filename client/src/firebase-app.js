import firebase from 'firebase/app';
import 'firebase/firestore'; // eslint-disable-line import/no-unassigned-import
import 'firebase/auth'; // eslint-disable-line import/no-unassigned-import
import config from './firebase-config';

firebase.initializeApp(config);

export default firebase;
