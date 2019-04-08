import React, {useState, useEffect} from 'react';
import {Row, Col, Card, CardHeader, CardBody, Form, FormGroup, Label, Input, Button, Spinner, Alert} from 'reactstrap';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css'; // eslint-disable-line import/no-unassigned-import
import firebase from './firebase-app';

const FeedingPlanner = ({user}) => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [saving, setSaving] = useState(false);
  const [alert, setAlert] = useState({});
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    console.log('user:', user);
    if (user.isAdmin !== true) {
      setAlert({success: false, text: 'Only admins can add feedings'});
      setShowAlert(true);
    }
  }, [user]);

  function handleClickedDay(day) {
    setSelectedDay(day);
  }

  function handleQuantityChanged(event) {
    setQuantity(event.target.value);
  }

  const disableForm = (user.isAdmin !== true || saving === true);

  async function handleAddClicked(event) {
    event.preventDefault();

    setSaving(true);
    try {
      await firebase.firestore().collection('feedings').doc().set({
        when: selectedDay,
        quantity: Number.parseFloat(quantity)
      });
      setAlert({success: true, text: 'Feeding successfully added'});
    } catch (error) {
      setAlert({success: false, text: 'Error saving feeding'});
      console.error(error);
    } finally {
      setSaving(false);
      setShowAlert(true);
    }
  }

  return (
    <>
      <Row className="mt-4">
        <Col>
          <h1>Schedule a feeding</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <CardHeader tag="h3">Feeding options</CardHeader>
            <CardBody>
              <Alert color={alert.success ? 'success' : 'danger'} isOpen={showAlert} toggle={() => setShowAlert(false)}>
                {alert.text}
              </Alert>
              <Form>
                <FormGroup>
                  <Label for="feed-date">Date</Label>
                  <Input required type="date" id="feed-date" name="feed-date" pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"/>
                </FormGroup>
              </Form>
            </CardBody>
            <CardBody>
              <Form onSubmit={handleAddClicked}>
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
                <FormGroup>
                  <Label for="quantitySelect">Quantity</Label>
                  <Input type="select" name="quantity" id="quantitySelect" onChange={handleQuantityChanged}>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                    <option>10</option>
                  </Input>
                </FormGroup>
                <Button disabled={disableForm}>
                  { saving ? <Spinner/> : '' }
                  { saving ? ' Saving...' : 'Save'}
                </Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default FeedingPlanner;
