import React from 'react';
import {Container, Navbar, NavbarBrand, Row, Col, Card, CardHeader, CardBody, Form, FormGroup, Label, Input} from 'reactstrap';
// Import logo from './logo.svg';
// Import './App.css'; // eslint-disable-line import/no-unassigned-import

const App = () => {
  return (
    <>
      <Container>
        <Navbar>
          <NavbarBrand>Cat Feeder</NavbarBrand>
        </Navbar>
      </Container>
      <Container>
        <Row>
          <Col><h1>Schedule a feeding</h1></Col>
        </Row>
        <Row>
          <Col>
            <Card>
              <CardHeader tag="h3">Feeding options</CardHeader>
              <CardBody>
                <Form>
                  <FormGroup>
                    <Label for="feed-date">Date</Label>
                    <Input required type="date" id="feed-date" name="feed-date" pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"/>
                  </FormGroup>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default App;
