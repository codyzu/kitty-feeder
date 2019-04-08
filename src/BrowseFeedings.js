import React, {useEffect, useState} from 'react';
import {Row, Col, Table, Spinner} from 'reactstrap';
import {DateTime} from 'luxon';
import firebase from './firebase-app';

const BrowseFeedings = () => {
  const [feedings, setFeedings] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    loadFeedings(setFeedings, setLoading);
  }, []);

  return (
    <Row>
      <Col>
        <Table striped>
          <thead>
            <tr>
              <th>When</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {feedings.map(feeding => (
              <tr key={feeding.id}>
                <th>{feeding.when}</th>
                <th>{feeding.quantity}</th>
              </tr>
            ))}
          </tbody>
        </Table>
        {loading ? <Spinner style={{width: '3em', height: '3em'}}/> : ''}
      </Col>
    </Row>
  );
};

async function loadFeedings(setFeedings, setLoading) {
  const querySnapshot = await firebase.firestore().collection('feedings').get();
  setFeedings(querySnapshot.docs.map(snapshot => ({
    id: snapshot.id,
    when: DateTime.fromJSDate(snapshot.data().when.toDate()).toLocaleString(DateTime.DATETIME_MED),
    quantity: snapshot.data().quantity
  })));
  setLoading(false);
}

export default BrowseFeedings;
