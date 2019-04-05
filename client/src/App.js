import React, {useState} from 'react';
import {Container, Navbar, NavbarBrand, Row, Col, Card, CardHeader, CardBody, Form, FormGroup, Label, Input} from 'reactstrap';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css'; // eslint-disable-line import/no-unassigned-import
// Import logo from './logo.svg';
// Import './App.css'; // eslint-disable-line import/no-unassigned-import

const App = () => {
  const [selectedDay, setSelectedDay] = useState(null);

  function handleClickedDay(day) {
    setSelectedDay(day);
  }

  return (
    <>
      <Container>
        <Navbar light color="light">
          <NavbarBrand>Cat Feeder</NavbarBrand>
        </Navbar>
      </Container>
      <Container>
        <Row className="mt-4">
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
              <CardBody>
                <Form>
                  <FormGroup row>
                    <Label className="col-sm-12" for="feed-date2">Date</Label>
                    <DayPicker
                      disabledDays={[{before: new Date()}]}
                      selectedDays={selectedDay}
                      renderDay={(day, modifiers) => {
                        const color = modifiers.today ? 'text-success' :
                          modifiers.disabled ? 'text-muted' :
                            '';
                        return <span className={color}>{day.getDate()}</span>;
                      }}
                      onDayClick={handleClickedDay}
                    />
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
